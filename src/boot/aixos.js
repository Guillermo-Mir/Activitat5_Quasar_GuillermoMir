import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Usa tu IP real aquí. No uses 'localhost' porque en Android fallará.
const api = axios.create({ 
  baseURL: 'http://192.168.1.50:3000',
  withCredentials: true // Esto permite que las cookies de Nuxt funcionen
})

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }