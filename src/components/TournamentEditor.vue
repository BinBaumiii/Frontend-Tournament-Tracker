<script setup>
import { reactive } from 'vue'
import { createTournament } from '@/services/TournamentService'

const emit = defineEmits(['close', 'saved'])

const tournament = reactive({
  name: '',
  players: Array(8).fill(''),
  matches: {
    qf: Array(4).fill({ a: '', b: '', result: '' }),
    sf: Array(2).fill({ a: '', b: '', result: '' }),
    final: { a: '', b: '', result: '' }
  },
  winner: ''
})

async function save() {
  await createTournament({
    name: tournament.name,
    winner: tournament.winner,
    players: Object.fromEntries(tournament.players.map((p, i) => [i + 1, p])),
    results: {},
    scoreboard: {}
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
          <div v-for="i in 4" :key="i" class="match">
            <input v-model="tournament.players[(i-1)*2]" placeholder="Spieler A" />
            <input v-model="tournament.players[(i-1)*2+1]" placeholder="Spieler B" />
            <input placeholder="Ergebnis" />
          </div>
        </div>

        <!-- Halbfinale -->
        <div class="round">
          <h3>Halbfinale</h3>
          <div v-for="i in 2" :key="i" class="match">
            <input placeholder="Spieler A" />
            <input placeholder="Spieler B" />
            <input placeholder="Ergebnis" />
          </div>
        </div>

        <!-- Finale -->
        <div class="round">
          <h3>Finale</h3>
          <input placeholder="Spieler A" />
          <input placeholder="Spieler B" />
          <input placeholder="Ergebnis" />
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
}

.round {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.match {
  border: 1px solid #ccc;
  padding: 0.5rem;
}
</style>
