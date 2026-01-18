<script setup>
import { reactive } from 'vue'
import { createTournament } from '@/services/TournamentService'

const emit = defineEmits(['close', 'saved'])

const tournament = reactive({
  name: '',
  players: Array(8).fill(''),
  matches: {
    qf: Array(4).fill(null).map(() => ({ a: '', b: '', result: '' })), // Viertelfinale
    sf: Array(2).fill(null).map(() => ({ a: '', b: '', result: '' })), // Halbfinale
    final: { a: '', b: '', result: '' }
  },
  winner: ''
})

// Ergebnisse für die Entity vorbereiten
function buildResults() {
  const results = {}
  let matchId = 1

  tournament.matches.qf.forEach((m) => results[matchId++] = m.result)
  tournament.matches.sf.forEach((m) => results[matchId++] = m.result)
  results[matchId] = tournament.matches.final.result

  return results
}

// Scoreboard: Gewinner bekommt 1 Punkt
function buildScoreboard() {
  const scoreboard = {}

  // Spieler initialisieren
  tournament.players.forEach(p => {
    if (p) scoreboard[p] = 0
  })

  // Gewinner bekommt einen Punkt
  if (tournament.winner) {
    scoreboard[tournament.winner] = (scoreboard[tournament.winner] || 0) + 1
  }

  return scoreboard
}

async function save() {
  const results = buildResults()
  const scoreboard = buildScoreboard()

  await createTournament({
    name: tournament.name,
    winner: tournament.winner,
    players: Object.fromEntries(tournament.players.map((p, i) => [i + 1, p])),
    results,
    scoreboard
  })

  emit('saved')
  emit('close')
}
</script>

<template>
  <div class="overlay">
    <div class="editor">
      <h2>🏆 Neues Turnier</h2>
      <input v-model="tournament.name" placeholder="Turniername" />

      <div class="bracket">
        <!-- Viertelfinale -->
        <div class="round">
          <h3>Viertelfinale</h3>
          <div v-for="(m, i) in tournament.matches.qf" :key="i" class="match">
            <input v-model="m.a" placeholder="Spieler A" />
            <input v-model="m.b" placeholder="Spieler B" />
            <input v-model="m.result" placeholder="Ergebnis z.B. 3:1" />
          </div>
        </div>

        <!-- Halbfinale -->
        <div class="round">
          <h3>Halbfinale</h3>
          <div v-for="(m, i) in tournament.matches.sf" :key="i" class="match">
            <input v-model="m.a" placeholder="Spieler A" />
            <input v-model="m.b" placeholder="Spieler B" />
            <input v-model="m.result" placeholder="Ergebnis z.B. 2:1" />
          </div>
        </div>

        <!-- Finale -->
        <div class="round">
          <h3>Finale</h3>
          <div class="match">
            <input v-model="tournament.matches.final.a" placeholder="Spieler A" />
            <input v-model="tournament.matches.final.b" placeholder="Spieler B" />
            <input v-model="tournament.matches.final.result" placeholder="Ergebnis z.B. 2:3" />
          </div>
        </div>
      </div>

      <input v-model="tournament.winner" placeholder="Gewinner" />
      <button @click="save">💾 Speichern</button>
      <button @click="emit('close')">❌ Abbrechen</button>
    </div>
  </div>
</template>

<style scoped>
.bracket {
  display: flex;
  gap: 2rem;
  align-items: flex-start; /* Viertelfinale oben */
}

/* Jede Runde column */
.round {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Viertelfinale bleibt oben, Halbfinale zentrieren */
.round:nth-child(2) { /* Halbfinale */
  margin-top: 3.5rem; /* genau halb so viele Matches wie im Viertelfinale */
}

/* Finale zentrieren */
.round:nth-child(3) { /* Finale */
  margin-top: 7rem; /* genau in der Mitte der Halbfinale-Container */
}

.match {
  border: 1px solid #ccc;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
