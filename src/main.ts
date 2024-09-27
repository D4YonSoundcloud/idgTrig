import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { setupLessons } from './setup/lessonSetup'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Setup lessons after pinia is installed
setupLessons()

app.mount('#app')