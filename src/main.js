import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// === Font Awesome Setup ===
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Tambahkan ikon yang akan digunakan ke library
library.add(faTrash)
const app = createApp(App)

// Daftarkan komponen font-awesome-icon secara global
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
