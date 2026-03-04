<script setup>
import { ref, onMounted } from 'vue'
import { configurations } from '../api/index.js'

const liste = ref([])
const erreur = ref('')
const succes = ref('')

onMounted(async () => {
  await charger()
})

const charger = async () => {
  try {
    const res = await configurations.getAll()
    liste.value = res.data.data
  } catch (e) {
    erreur.value = 'Erreur lors du chargement des configurations'
  }
}

const supprimer = async (id) => {
  if (!confirm('Supprimer cette configuration ?')) return
  try {
    await configurations.delete(id)
    succes.value = 'Configuration supprimée'
    await charger()
  } catch (e) {
    erreur.value = 'Erreur lors de la suppression'
  }
}
</script>

<template>
  <div class="container">
    <h1>Mes configurations</h1>
    <p v-if="erreur" class="erreur">{{ erreur }}</p>
    <p v-if="succes" class="succes">{{ succes }}</p>
    <p v-if="liste.length === 0 && !erreur">Aucune configuration sauvegardée.</p>
    <div class="grille">
      <div v-for="config in liste" :key="config._id" class="carte">
        <h3>{{ config.nom }}</h3>
        <p>Total : <strong>{{ config.coutTotal }} €</strong></p>
        <ul>
          <li v-for="item in config.composants" :key="item._id">
            {{ item.composant?.titre || 'Composant' }} x{{ item.quantite }} — {{ item.prixUnitaire }} €
          </li>
        </ul>
        <button class="supprimer" @click="supprimer(config._id)">Supprimer</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container { max-width: 900px; margin: 40px auto; padding: 0 20px; }
.grille { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; margin-top: 20px; }
.carte { border: 1px solid #ccc; border-radius: 8px; padding: 16px; }
.carte h3 { margin-bottom: 8px; }
.carte ul { padding-left: 16px; margin: 8px 0; font-size: 0.9em; color: #555; }
.supprimer { padding: 6px 12px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 8px; }
.erreur { color: red; }
.succes { color: green; }
</style>