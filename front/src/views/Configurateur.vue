<script setup>
import { ref, onMounted } from 'vue'
import { composants, configurations } from '../api/index.js'

const liste = ref([])
const selection = ref([])
const nom = ref('')
const erreur = ref('')
const succes = ref('')

onMounted(async () => {
  try {
    const res = await composants.getAll()
    liste.value = res.data.data
  } catch (e) {
    erreur.value = 'Erreur lors du chargement des composants'
  }
})

const toggleSelection = (composant) => {
  const index = selection.value.findIndex(c => c._id === composant._id)
  if (index === -1) {
    selection.value.push(composant)
  } else {
    selection.value.splice(index, 1)
  }
}

const estSelectionne = (composant) => {
  return selection.value.some(c => c._id === composant._id)
}

const totalPrix = () => {
  return selection.value.reduce((total, c) => total + c.prixBase, 0)
}

const sauvegarder = async () => {
  try {
    erreur.value = ''
    succes.value = ''
    if (!nom.value) return erreur.value = 'Donnez un nom à votre configuration'
    if (selection.value.length === 0) return erreur.value = 'Sélectionnez au moins un composant'
    await configurations.create({
      nom: nom.value,
      composants: selection.value.map(c => ({
        composant: c._id,
        quantite: 1,
        prixUnitaire: c.prixBase
}))
    })
    succes.value = 'Configuration sauvegardée !'
    nom.value = ''
    selection.value = []
  } catch (e) {
    erreur.value = e.response?.data?.message || 'Erreur lors de la sauvegarde'
  }
}
</script>

<template>
  <div class="container">
    <h1>Configurateur PC</h1>
    <p v-if="erreur" class="erreur">{{ erreur }}</p>
    <p v-if="succes" class="succes">{{ succes }}</p>

    <div class="grille">
      <div
        v-for="c in liste"
        :key="c._id"
        class="carte"
        :class="{ selectionne: estSelectionne(c) }"
        @click="toggleSelection(c)"
      >
        <h3>{{ c.titre }}</h3>
        <p>{{ c.description }}</p>
        <p class="prix">{{ c.prixBase }} €</p>
      </div>
    </div>

    <div class="resume" v-if="selection.length > 0">
      <h2>Ma configuration</h2>
      <ul>
        <li v-for="c in selection" :key="c._id">{{ c.titre }} — {{ c.prixBase }} €</li>
      </ul>
      <p class="total">Total : {{ totalPrix() }} €</p>
      <input v-model="nom" type="text" placeholder="Nom de la configuration" />
      <button @click="sauvegarder">Sauvegarder</button>
    </div>
  </div>
</template>

<style scoped>
.container { max-width: 900px; margin: 40px auto; padding: 0 20px; }
.grille { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px; margin-top: 20px; }
.carte { border: 1px solid #ccc; border-radius: 8px; padding: 16px; cursor: pointer; }
.carte.selectionne { border-color: #42b883; background: #f0fff8; }
.prix { font-weight: bold; color: #42b883; }
.resume { margin-top: 40px; border-top: 2px solid #42b883; padding-top: 20px; display: flex; flex-direction: column; gap: 10px; }
.total { font-weight: bold; font-size: 1.2em; }
input { padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
button { padding: 10px; background: #42b883; color: white; border: none; border-radius: 6px; cursor: pointer; }
.erreur { color: red; }
.succes { color: green; }
</style>