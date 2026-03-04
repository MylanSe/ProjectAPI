<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../api/index.js'

const router = useRouter()
const email = ref('')
const password = ref('')
const erreur = ref('')

const login = async () => {
  try {
    erreur.value = ''
    const res = await auth.login({ email: email.value, password: password.value })
    localStorage.setItem('token', res.data.data.token)
    const role = res.data.data.user.role
    if (role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/composants')
    }
  } catch (e) {
    erreur.value = e.response?.data?.message || 'Erreur de connexion'
  }
}
</script>

<template>
  <div class="container">
    <h1>Connexion</h1>
    <p v-if="erreur" class="erreur">{{ erreur }}</p>
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Mot de passe" />
    <button @click="login">Se connecter</button>
    <p>Pas de compte ? <a href="/register">S'inscrire</a></p>
  </div>
</template>

<style scoped>
.container { max-width: 400px; margin: 100px auto; display: flex; flex-direction: column; gap: 12px; }
input { padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
button { padding: 10px; background: #42b883; color: white; border: none; border-radius: 6px; cursor: pointer; }
.erreur { color: red; }
</style>