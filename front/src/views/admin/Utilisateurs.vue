<script setup>
import { ref, onMounted } from 'vue'
import { auth } from '../../api/index.js'

const liste = ref([])
const erreur = ref('')

onMounted(async () => {
  try {
    const res = await auth.getUsers()
    liste.value = res.data.data
  } catch (e) {
    erreur.value = 'Erreur lors du chargement des utilisateurs'
  }
})
</script>

<template>
  <div class="container">
    <h1>Utilisateurs</h1>
    <p v-if="erreur" class="erreur">{{ erreur }}</p>
    <table>
      <thead>
        <tr><th>Nom</th><th>Prénom</th><th>Email</th><th>Rôle</th><th>Configurations</th></tr>
      </thead>
      <tbody>
        <tr v-for="u in liste" :key="u._id">
          <td>{{ u.nom }}</td>
          <td>{{ u.prenom }}</td>
          <td>{{ u.email }}</td>
          <td>{{ u.role }}</td>
          <td>{{ u.configurations?.length || 0 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container { max-width: 900px; margin: 40px auto; padding: 0 20px; }
table { width: 100%; border-collapse: collapse; margin-top: 20px; }
th, td { padding: 10px; border: 1px solid #ccc; text-align: left; }
th { background: #f5f5f5; }
.erreur { color: red; }
</style>