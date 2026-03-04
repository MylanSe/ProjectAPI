import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const auth = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  me: () => api.get('/auth/me'),
  getUsers: () => api.get('/auth/users')
}

export const composants = {
  getAll: () => api.get('/components'),
  getById: (id) => api.get(`/components/${id}`),
  create: (data) => api.post('/components', data),
  update: (id, data) => api.put(`/components/${id}`, data),
  delete: (id) => api.delete(`/components/${id}`)
}

export const categories = {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`)
}

export const marchands = {
  getAll: () => api.get('/merchants'),
  getById: (id) => api.get(`/merchants/${id}`),
  create: (data) => api.post('/merchants', data),
  update: (id, data) => api.put(`/merchants/${id}`, data),
  delete: (id) => api.delete(`/merchants/${id}`)
}

export const configurations = {
  getAll: () => api.get('/configurations'),
  create: (data) => api.post('/configurations', data),
  delete: (id) => api.delete(`/configurations/${id}`)
}

export default api