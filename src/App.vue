<template>
  <main class="container space-xl">
    <header class="text-center space-lg">
      <h1 class="h1">Spielplätze in Wien entdecken</h1>
      <p class="lead text-muted">
        Wähle einen Bezirk und entdecke familienfreundliche Orte mit Marker und Detailkarten
      </p>
    </header>

    <section class="form-group space-md">
      <label for="bezirk" class="label">Bezirk wählen:</label>
      <select v-model="selectedDistrict" id="bezirk" class="form-control">
        <option disabled value="">Bitte wählen</option>
        <option
          v-for="district in districts"
          :key="district"
          :value="district"
        >
          {{ district }}. Bezirk
        </option>
      </select>
    </section>

    <section
      v-if="filteredPlaygrounds.length"
      class="info-box info-box-success space-md"
    >
      <h2 class="h3">
        ✅ Gefundene Spielplätze: {{ filteredPlaygrounds.length }}
      </h2>
      <p class="small text-muted">
        Sie erscheinen als Marker auf der Karte und als Karten weiter unten.
      </p>
    </section>

    <section class="grid-list space-md">
      <div
        v-for="playground in filteredPlaygrounds"
        :key="playground.properties.ANL_NAME"
        class="play-card"
      >
        <div class="play-card-content">
          <h3 class="card-title">{{ playground.properties.ANL_NAME }}</h3>
          <p class="card-text text-muted">
            {{ shorten(playground.properties.SPIELPLATZ_DETAIL) }}
          </p>
        </div>
      </div>
    </section>

    <section class="space-lg">
      <h2 class="h3 text-center">🗺️ Karte</h2>
      <div id="map" class="map-box"></div>
    </section>

    <footer class="space-xl text-center text-muted small">
      <p>
        📍 Datenquelle:
        <a href="https://www.data.gv.at/" target="_blank">data.gv.at</a> | Stadt Wien
      </p>
    </footer>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// ✅ Marker-Bilder setzen, damit sie auf allen Browsern angezeigt werden
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const districts = ref([])
const selectedDistrict = ref('')
const playgrounds = ref([])
let map = null

const filteredPlaygrounds = computed(() => {
  if (!selectedDistrict.value) return []
  return playgrounds.value.filter(
    p => p.properties.BEZIRK?.toString() === selectedDistrict.value
  )
})

function shorten(text) {
  if (!text) return 'Keine Beschreibung verfügbar'
  return text.length > 100 ? text.slice(0, 100) + '…' : text
}

onMounted(async () => {
  try {
    const response = await fetch('/spielplaetze.json')
    const data = await response.json()
    playgrounds.value = data.features

    const uniqueDistricts = [...new Set(
      playgrounds.value.map(p => p.properties.BEZIRK).filter(b => b !== null)
    )].sort((a, b) => a - b)

    districts.value = uniqueDistricts.map(b => b.toString())

    const mapContainer = document.getElementById('map')
    if (mapContainer && !map) {
      map = L.map(mapContainer).setView([48.2082, 16.3738], 12)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap-Mitwirkende'
      }).addTo(map)
    }

    updateMarkers(filteredPlaygrounds.value)
    zoomToDistrict(filteredPlaygrounds.value)
  } catch (error) {
    console.error('Fehler beim Laden der Spielplatzdaten:', error)
  }
})

watch(filteredPlaygrounds, neueDaten => {
  updateMarkers(neueDaten)
  zoomToDistrict(neueDaten)
})

function updateMarkers(data) {
  if (!map) return
  map.eachLayer(layer => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer)
    }
  })

  data.forEach(p => {
    const coords = p.geometry?.coordinates
    if (coords?.length === 2) {
      const [lon, lat] = coords
      L.marker([lat, lon])
        .addTo(map)
        .bindPopup(`<strong>${p.properties.ANL_NAME}</strong><br>${shorten(p.properties.SPIELPLATZ_DETAIL || '')}`)
    }
  })
}

function zoomToDistrict(data) {
  const bounds = []
  data.forEach(p => {
    const coords = p.geometry?.coordinates
    if (coords?.length === 2) {
      const [lon, lat] = coords
      bounds.push([lat, lon])
    }
  })
  if (bounds.length && map) {
    map.fitBounds(bounds, { padding: [30, 30] })
  }
}
</script>

<style scoped>
@import url('https://handbuch.wien.gv.at/pattern-library/v1/css/pattern.min.css');

/* 🌐 Basis-Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #fefefe;
  font-family: 'Segoe UI', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

/* 🧱 Hauptcontainer */
main.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem;
}

/* 🎠 Karten-Layout */
.grid-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.play-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  min-height: 150px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transition: transform 0.2s ease;
}

.play-card:hover {
  transform: scale(1.01);
}

.card-title {
  font-size: 1.1rem;
  color: #b00000;
  margin-bottom: 0.5rem;
}

.card-text {
  font-size: 0.95rem;
  line-height: 1.4;
}

/* 🗺️ Leaflet-Karte */
.map-box {
  width: 100%;
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 2rem;
}

/* 📱 Responsive Anpassung */
@media (max-width: 768px) {
  .grid-list {
    grid-template-columns: 1fr;
  }

  .play-card {
    width: 100%;
  }

  .map-box {
    height: 300px;
  }

  main.container {
    padding: 0 0.5rem;
  }
}

/* 📝 Footer */
footer {
  margin-top: 3rem;
  font-size: 0.85rem;
  text-align: center;
  color: #777;
}
</style>
