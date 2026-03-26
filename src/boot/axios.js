import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({ 
  // Usa la IP de tu PC en la red local
  baseURL: 'http://172.23.7.113:3000' 
})

// INTERCEPTOR: Se ejecuta justo antes de enviar cualquier petición
api.interceptors.request.use((config) => {
  // Buscamos si tenemos un token guardado
  const token = localStorage.getItem('auth_token')
  
  if (token) {
    // Si hay token, lo ponemos en la cabecera Authorization
    config.headers.Authorization = `Bearer ${token}`
  }
  
  return config
})

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }