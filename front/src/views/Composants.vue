<script setup>
import { ref, onMounted } from 'vue'
import { composants } from '../api/index.js'

const liste = ref([])
const erreur = ref('')

onMounted(async () => {
  try {
    const res = await composants.getAll()
    liste.value = res.data.data
  } catch (e) {
    erreur.value = 'Erreur lors du chargement des composants'
  }
})
</script>

<template>
  <div class="container">
    <h1>Composants disponibles</h1>
    <p v-if="erreur" class="erreur">{{ erreur }}</p>
    <div class="grille">
      <div v-for="c in liste" :key="c._id" class="carte">
        <h3>{{ c.titre }}</h3>
        <p>{{ c.description }}</p>
        <p class="prix">{{ c.prixBase }} €</p>
      </div>
    </div>
    <p v-if="liste.length === 0 && !erreur">Aucun composant trouvé.</p>
  </div>
</template>

<style scoped>
.container { max-width: 900px; margin: 40px auto; padding: 0 20px; }
.grille { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px; margin-top: 20px; }
.carte { border: 1px solid #ccc; border-radius: 8px; padding: 16px; }
.prix { font-weight: bold; color: #42b883; }
.erreur { color: red; }
</style>