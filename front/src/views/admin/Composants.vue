<script setup>
import { ref, onMounted } from 'vue'
import { composants, categories } from '../../api/index.js'

const liste = ref([])
const listeCategories = ref([])
const erreur = ref('')
const succes = ref('')
const afficherFormulaire = ref(false)
const enEdition = ref(null)

const form = ref({
  titre: '',
  marque: '',
  description: '',
  modele: '',
  prixBase: 0,
  categorie: '',
  disponible: true
})

onMounted(async () => {
  await charger()
  const res = await categories.getAll()
  listeCategories.value = res.data.data
})

const charger = async () => {
  try {
    const res = await composants.getAll()
    liste.value = res.data.data
  } catch (e) {
    erreur.value = 'Erreur lors du chargement'
  }
}

const ouvrir = (composant = null) => {
  enEdition.value = composant
  if (composant) {
    form.value = { ...composant, categorie: composant.categorie?._id || composant.categorie }
  } else {
    form.value = { titre: '', marque: '', description: '', modele: '', prixBase: 0, categorie: '', disponible: true }
  }
  afficherFormulaire.value = true
}

const sauvegarder = async () => {
  try {
    erreur.value = ''
    if (enEdition.value) {
      await composants.update(enEdition.value._id, form.value)
      succes.value = 'Composant modifié'
    } else {
      await composants.create(form.value)
      succes.value = 'Composant créé'
    }
    afficherFormulaire.value = false
    await charger()
  } catch (e) {
    erreur.value = e.response?.data?.message || 'Erreur lors de la sauvegarde'
  }
}

const supprimer = async (id) => {
  if (!confirm('Supprimer ce composant ?')) return
  try {
    await composants.delete(id)
    succes.value = 'Composant supprimé'
    await charger()
  } catch (e) {
    erreur.value = 'Erreur lors de la suppression'
  }
}
</script>

<template>
  <div class="container">
    <div class="header">
      <h1>Gestion des composants</h1>
      <button @click="ouvrir()">+ Ajouter</button>
    </div>
    <p v-if="erreur" class="erreur">{{ erreur }}</p>
    <p v-if="succes" class="succes">{{ succes }}</p>

    <div v-if="afficherFormulaire" class="formulaire">
      <h2>{{ enEdition ? 'Modifier' : 'Ajouter' }} un composant</h2>
      <input v-model="form.titre" placeholder="Titre" />
      <input v-model="form.marque" placeholder="Marque" />
      <input v-model="form.modele" placeholder="Modèle" />
      <textarea v-model="form.description" placeholder="Description"></textarea>
      <input v-model="form.prixBase" type="number" placeholder="Prix de base" />
      <select v-model="form.categorie">
        <option value="">Choisir une catégorie</option>
        <option v-for="cat in listeCategories" :key="cat._id" :value="cat._id">{{ cat.nom }}</option>
      </select>
      <label>
        <input type="checkbox" v-model="form.disponible" /> Disponible
      </label>
      <div class="boutons">
        <button @click="sauvegarder">Sauvegarder</button>
        <button class="annuler" @click="afficherFormulaire = false">Annuler</button>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Titre</th>
          <th>Marque</th>
          <th>Prix</th>
          <th>Disponible</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in liste" :key="c._id">
          <td>{{ c.titre }}</td>
          <td>{{ c.marque }}</td>
          <td>{{ c.prixBase }} €</td>
          <td>{{ c.disponible ? 'OUI' : 'NON' }}</td>
          <td>
            <button @click="ouvrir(c)">Modifier</button>
            <button class="supprimer" @click="supprimer(c._id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container { max-width: 1000px; margin: 40px auto; padding: 0 20px; }
.header { display: flex; justify-content: space-between; align-items: center; }
table { width: 100%; border-collapse: collapse; margin-top: 20px; }
th, td { padding: 10px; border: 1px solid #ccc; text-align: left; }
th { background: #f5f5f5; }
.formulaire { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; display: flex; flex-direction: column; gap: 10px; }
input, select, textarea { padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
textarea { min-height: 80px; }
.boutons { display: flex; gap: 10px; }
button { padding: 8px 14px; background: #42b883; color: white; border: none; border-radius: 4px; cursor: pointer; }
.annuler { background: #95a5a6; }
.supprimer { background: #e74c3c; margin-left: 6px; }
.erreur { color: red; }
.succes { color: green; }
</style>