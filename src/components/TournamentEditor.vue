<script setup>
import { reactive, watch } from 'vue'
import { createTournament, updateTournament } from '@/services/TournamentService'

const props = defineProps({
  tournament: Object,
  mode: {
    type: String,
    default: 'create'
  }
})

const emit = defineEmits(['close', 'saved'])

const tournament = reactive({
  name: '',
  players: Array(14).fill(''), // 8 Viertelfinale + 4 Halbfinale + 2 Finale
  matches: {
    qf: Array(4).fill(null).map(() => ({ a: '', b: '', result: '' })),
    sf: Array(2).fill(null).map(() => ({ a: '', b: '', result: '' })),
    final: { a: '', b: '', result: '' }
  },
  winner: ''
})

watch(() => props.tournament, (t) => {
  if (!t) return

  tournament.name = t.name
  tournament.winner = t.winner || ''
  // Load all 14 players
  tournament.players = Array.from({ length: 14 }, (_, i) => t.players[i + 1] || '')

  const results = t.results || {}
  let matchId = 1

  // Viertelfinale
  tournament.matches.qf.forEach((m, i) => {
    m.a = tournament.players[i * 2] || ''
    m.b = tournament.players[i * 2 + 1] || ''
    m.result = results[matchId++] || ''
  })

  // Halbfinale
  tournament.matches.sf.forEach((m, i) => {
    m.a = tournament.players[8 + i * 2] || ''
    m.b = tournament.players[8 + i * 2 + 1] || ''
    m.result = results[matchId++] || ''
  })

  // Finale
  tournament.matches.final.a = tournament.players[12] || ''
  tournament.matches.final.b = tournament.players[13] || ''
  tournament.matches.final.result = results[matchId] || ''
}, { immediate: true })

function buildResults() {
  const results = {}
  let matchId = 1
  tournament.matches.qf.forEach(m => results[matchId++] = m.result)
  tournament.matches.sf.forEach(m => results[matchId++] = m.result)
  results[matchId] = tournament.matches.final.result
  return results
}

function collectPlayers() {
  const allPlayers = []

  tournament.matches.qf.forEach(m => { allPlayers.push(m.a, m.b) })
  tournament.matches.sf.forEach(m => { allPlayers.push(m.a, m.b) })
  allPlayers.push(tournament.matches.final.a, tournament.matches.final.b)

  return Object.fromEntries(allPlayers.map((p, i) => [i + 1, p]))
}

function buildScoreboard() {
  const scoreboard = {}
  tournament.players.forEach(p => { if (p) scoreboard[p] = 0 })
  if (tournament.winner) {
    scoreboard[tournament.winner] = (scoreboard[tournament.winner] || 0) + 1
  }
  return scoreboard
}

async function save() {
  const results = buildResults()
  const scoreboard = buildScoreboard()

  const payload = {
    name: tournament.name,
    winner: tournament.winner,
    players: collectPlayers(), // <-- jetzt 14 Spieler
    results,
    scoreboard
  }

  if (props.tournament?.id && props.mode === 'edit') {
    await updateTournament(props.tournament.id, payload)
  } else {
    await createTournament(payload)
  }

  emit('saved')
  emit('close')
}
</script>

<template>
  <div class="overlay">
    <div class="editor">
      <h2 v-if="props.mode === 'create'">🏆 Neues Turnier</h2>
      <h2 v-else-if="props.mode === 'edit'">🏆 Turnier bearbeiten</h2>
      <!-- Bei view kein Titel -->

      <input v-model="tournament.name" placeholder="Turniername" :disabled="props.mode === 'view'" />

      <div class="bracket">
        <div class="round">
          <h3>Viertelfinale</h3>
          <div v-for="(m, i) in tournament.matches.qf" :key="i" class="match">
            <input v-model="m.a" placeholder="Spieler A" :disabled="props.mode === 'view'" />
            <input v-model="m.b" placeholder="Spieler B" :disabled="props.mode === 'view'" />
            <input v-model="m.result" placeholder="Ergebnis z.B. 3:1" :disabled="props.mode === 'view'" />
          </div>
        </div>

        <div class="round">
          <h3>Halbfinale</h3>
          <div v-for="(m, i) in tournament.matches.sf" :key="i" class="match">
            <input v-model="m.a" placeholder="Spieler A" :disabled="props.mode === 'view'" />
            <input v-model="m.b" placeholder="Spieler B" :disabled="props.mode === 'view'" />
            <input v-model="m.result" placeholder="Ergebnis z.B. 2:1" :disabled="props.mode === 'view'" />
          </div>
        </div>

        <div class="round">
          <h3>Finale</h3>
          <div class="match">
            <input v-model="tournament.matches.final.a" placeholder="Spieler A" :disabled="props.mode === 'view'" />
            <input v-model="tournament.matches.final.b" placeholder="Spieler B" :disabled="props.mode === 'view'" />
            <input v-model="tournament.matches.final.result" placeholder="Ergebnis z.B. 2:3" :disabled="props.mode === 'view'" />
          </div>
        </div>
      </div>

      <input v-model="tournament.winner" placeholder="Gewinner" :disabled="props.mode === 'view'" />

      <button v-if="props.mode !== 'view'" @click="save">💾 Speichern</button>
      <button @click="emit('close')">❌ Schließen</button>
    </div>
  </div>
</template>

<style scoped>
.bracket {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}
.round {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.round:nth-child(2) { margin-top: 3.5rem; }
.round:nth-child(3) { margin-top: 7rem; }
.match {
  border: 1px solid #ccc;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>

