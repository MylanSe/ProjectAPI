<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { auth } from './api/index.js'

const router = useRouter()
const isAdmin = ref(false)

onMounted(async () => {
  try {
    const res = await auth.me()
    isAdmin.value = res.data.data.role === 'admin'
  } catch (e) {}
})

const deconnexion = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<template>
  <nav>
    <a href="/composants">Composants</a>
    <a href="/configurateur">Configurateur</a>
    <a href="/mes-configurations">Mes configurations</a>
    <a v-if="isAdmin" href="/admin">Admin</a>
    <button @click="deconnexion">Se déconnecter</button>
  </nav>
  <RouterView />
</template>

<style scoped>
nav { display: flex; gap: 16px; align-items: center; padding: 12px 24px; background: #2c3e50; }
nav a { color: white; text-decoration: none; }
nav button { margin-left: auto; padding: 6px 12px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer; }
</style>