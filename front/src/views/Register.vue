<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../api/index.js'

const router = useRouter()
const nom = ref('')
const prenom = ref('')
const email = ref('')
const password = ref('')
const erreur = ref('')

const register = async () => {
  try {
    erreur.value = ''
    const res = await auth.register({ nom: nom.value, prenom: prenom.value, email: email.value, password: password.value })
    localStorage.setItem('token', res.data.data.token)
    router.push('/composants')
  } catch (e) {
    erreur.value = e.response?.data?.message || 'Erreur lors de l\'inscription'
  }
}
</script>

<template>
  <div class="container">
    <h1>Inscription</h1>
    <p v-if="erreur" class="erreur">{{ erreur }}</p>
    <input v-model="nom" type="text" placeholder="Nom" />
    <input v-model="prenom" type="text" placeholder="Prénom" />
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Mot de passe" />
    <button @click="register">S'inscrire</button>
    <p>Déjà un compte ? <a href="/login">Se connecter</a></p>
  </div>
</template>

<style scoped>
.container { max-width: 400px; margin: 100px auto; display: flex; flex-direction: column; gap: 12px; }
input { padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
button { padding: 10px; background: #42b883; color: white; border: none; border-radius: 6px; cursor: pointer; }
.erreur { color: red; }
</style>