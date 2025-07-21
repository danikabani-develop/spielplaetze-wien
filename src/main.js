import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 📦 Leaflet einbinden & Icons reparieren
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// 🛠 Marker-Icons manuell setzen, damit sie angezeigt werden
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const app = createApp(App)

app.use(router)

app.mount('#app')
