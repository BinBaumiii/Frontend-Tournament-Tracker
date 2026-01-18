<script setup>
import { ref, onMounted } from 'vue'
import { getTournaments } from '@/services/TournamentService'

const topPlayers = ref([])

async function loadScoreboard() {
  const tournaments = await getTournaments()
  const pointsMap = {}

  // Alle Turniere durchgehen und Punkte summieren
  tournaments.forEach(t => {
    const scoreboard = t.scoreboard || {}
    Object.entries(scoreboard).forEach(([player, pts]) => {
      pointsMap[player] = (pointsMap[player] || 0) + pts
    })
  })

  // In Array umwandeln, sortieren und Top 10 nehmen
  topPlayers.value = Object.entries(pointsMap)
    .map(([player, points]) => ({ player, points }))
    .sort((a, b) => b.points - a.points)
    .slice(0, 10)
}

onMounted(loadScoreboard)
</script>

<template>
  <div class="scoreboard">
    <h2>🏆 Top 10 Spieler</h2>
    <ol>
      <li v-for="p in topPlayers" :key="p.player">
        {{ p.player }} – {{ p.points }} Punkte
      </li>
    </ol>
  </div>
</template>

<style scoped>
.scoreboard {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
}

.scoreboard h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.scoreboard ol {
  padding-left: 1.5rem;
}

.scoreboard li {
  margin-bottom: 0.5rem;
}
</style>
