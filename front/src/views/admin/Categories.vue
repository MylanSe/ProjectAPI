<script setup>
import { ref, onMounted } from 'vue'
import { categories } from '../../api/index.js'

const liste = ref([])
const erreur = ref('')
const succes = ref('')
const afficherFormulaire = ref(false)
const enEdition = ref(null)

const form = ref({ nom: '', description: '' })

onMounted(async () => { await charger() })

const charger = async () => {
  try {
    const res = await categories.getAll()
    liste.value = res.data.data
  } catch (e) {
    erreur.value = 'Erreur lors du chargement'
  }
}

const ouvrir = (categorie = null) => {
  enEdition.value = categorie
  form.value = categorie ? { ...categorie } : { nom: '', description: '' }
  afficherFormulaire.value = true
}

const sauvegarder = async () => {
  try {
    erreur.value = ''
    if (enEdition.value) {
      await categories.update(enEdition.value._id, form.value)
      succes.value = 'Catégorie modifiée'
    } else {
      await categories.create(form.value)
      succes.value = 'Catégorie créée'
    }
    afficherFormulaire.value = false
    await charger()
  } catch (e) {
    erreur.value = e.response?.data?.message || 'Erreur lors de la sauvegarde'
  }
}

const supprimer = async (id) => {
  if (!confirm('Supprimer cette catégorie ?')) return
  try {
    await categories.delete(id)
    succes.value = 'Catégorie supprimée'
    await charger()
  } catch (e) {
    erreur.value = 'Erreur lors de la suppression'
  }
}
</script>

<template>
  <div class="container">
    <div class="header">
      <h1>Gestion des catégories</h1>
      <button @click="ouvrir()">+ Ajouter</button>
    </div>
    <p v-if="erreur" class="erreur">{{ erreur }}</p>
    <p v-if="succes" class="succes">{{ succes }}</p>

    <div v-if="afficherFormulaire" class="formulaire">
      <h2>{{ enEdition ? 'Modifier' : 'Ajouter' }} une catégorie</h2>
      <input v-model="form.nom" placeholder="Nom" />
      <textarea v-model="form.description" placeholder="Description"></textarea>
      <div class="boutons">
        <button @click="sauvegarder">Sauvegarder</button>
        <button class="annuler" @click="afficherFormulaire = false">Annuler</button>
      </div>
    </div>

    <table>
      <thead>
        <tr><th>Nom</th><th>Description</th><th>Actions</th></tr>
      </thead>
      <tbody>
        <tr v-for="c in liste" :key="c._id">
          <td>{{ c.nom }}</td>
          <td>{{ c.description }}</td>
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
.container { max-width: 900px; margin: 40px auto; padding: 0 20px; }
.header { display: flex; justify-content: space-between; align-items: center; }
table { width: 100%; border-collapse: collapse; margin-top: 20px; }
th, td { padding: 10px; border: 1px solid #ccc; text-align: left; }
th { background: #f5f5f5; }
.formulaire { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; display: flex; flex-direction: column; gap: 10px; }
input, textarea { padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
textarea { min-height: 80px; }
.boutons { display: flex; gap: 10px; }
button { padding: 8px 14px; background: #42b883; color: white; border: none; border-radius: 4px; cursor: pointer; }
.annuler { background: #95a5a6; }
.supprimer { background: #e74c3c; margin-left: 6px; }
.erreur { color: red; }
.succes { color: green; }
</style>