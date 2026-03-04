<script setup>
import { ref, onMounted } from 'vue'
import { marchands } from '../../api/index.js'

const liste = ref([])
const erreur = ref('')
const succes = ref('')
const afficherFormulaire = ref(false)
const enEdition = ref(null)

const form = ref({ nom: '', url: '', logo: '', actif: true })

onMounted(async () => { await charger() })

const charger = async () => {
  try {
    const res = await marchands.getAll()
    liste.value = res.data.data
  } catch (e) {
    erreur.value = 'Erreur lors du chargement'
  }
}

const ouvrir = (marchand = null) => {
  enEdition.value = marchand
  form.value = marchand ? { ...marchand } : { nom: '', url: '', logo: '', actif: true }
  afficherFormulaire.value = true
}

const sauvegarder = async () => {
  try {
    erreur.value = ''
    if (enEdition.value) {
      await marchands.update(enEdition.value._id, form.value)
      succes.value = 'Marchand modifié'
    } else {
      await marchands.create(form.value)
      succes.value = 'Marchand créé'
    }
    afficherFormulaire.value = false
    await charger()
  } catch (e) {
    erreur.value = e.response?.data?.message || 'Erreur lors de la sauvegarde'
  }
}

const supprimer = async (id) => {
  if (!confirm('Supprimer ce marchand ?')) return
  try {
    await marchands.delete(id)
    succes.value = 'Marchand supprimé'
    await charger()
  } catch (e) {
    erreur.value = 'Erreur lors de la suppression'
  }
}
</script>

<template>
  <div class="container">
    <div class="header">
      <h1>Gestion des marchands</h1>
      <button @click="ouvrir()">+ Ajouter</button>
    </div>
    <p v-if="erreur" class="erreur">{{ erreur }}</p>
    <p v-if="succes" class="succes">{{ succes }}</p>

    <div v-if="afficherFormulaire" class="formulaire">
      <h2>{{ enEdition ? 'Modifier' : 'Ajouter' }} un marchand</h2>
      <input v-model="form.nom" placeholder="Nom" />
      <input v-model="form.url" placeholder="URL du site" />
      <input v-model="form.logo" placeholder="URL du logo" />
      <label>
        <input type="checkbox" v-model="form.actif" /> Actif
      </label>
      <div class="boutons">
        <button @click="sauvegarder">Sauvegarder</button>
        <button class="annuler" @click="afficherFormulaire = false">Annuler</button>
      </div>
    </div>

    <table>
      <thead>
        <tr><th>Nom</th><th>URL</th><th>Actif</th><th>Actions</th></tr>
      </thead>
      <tbody>
        <tr v-for="m in liste" :key="m._id">
          <td>{{ m.nom }}</td>
          <td><a :href="m.url" target="_blank">{{ m.url }}</a></td>
          <td>{{ m.actif ? '✅' : '❌' }}</td>
          <td>
            <button @click="ouvrir(m)">Modifier</button>
            <button class="supprimer" @click="supprimer(m._id)">Supprimer</button>
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
input { padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
.boutons { display: flex; gap: 10px; }
button { padding: 8px 14px; background: #42b883; color: white; border: none; border-radius: 4px; cursor: pointer; }
.annuler { background: #95a5a6; }
.supprimer { background: #e74c3c; margin-left: 6px; }
.erreur { color: red; }
.succes { color: green; }
</style>