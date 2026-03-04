import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Composants from '../views/Composants.vue'
import Configurateur from '../views/Configurateur.vue'
import MesConfigurations from '../views/MesConfigurations.vue'
import AdminDashboard from '../views/admin/Dashboard.vue'
import AdminComposants from '../views/admin/Composants.vue'
import AdminCategories from '../views/admin/Categories.vue'
import AdminMarchands from '../views/admin/Marchands.vue'
import AdminUtilisateurs from '../views/admin/Utilisateurs.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/composants', component: Composants, meta: { requiresAuth: true } },
  { path: '/configurateur', component: Configurateur, meta: { requiresAuth: true } },
  { path: '/mes-configurations', component: MesConfigurations, meta: { requiresAuth: true } },
  { path: '/admin', component: AdminDashboard, meta: { requiresAuth: true } },
  { path: '/admin/composants', component: AdminComposants, meta: { requiresAuth: true } },
  { path: '/admin/categories', component: AdminCategories, meta: { requiresAuth: true } },
  { path: '/admin/marchands', component: AdminMarchands, meta: { requiresAuth: true } },
  { path: '/admin/utilisateurs', component: AdminUtilisateurs, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router