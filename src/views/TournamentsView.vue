<script setup>
import { ref, onMounted } from 'vue'
import { getTournaments, deleteTournament } from '@/services/TournamentService'

import CreateTournamentButton from '@/components/CreateTournamentButton.vue'
import TournamentEditor from '@/components/TournamentEditor.vue'

const tournaments = ref([])
const showEditor = ref(false)
const selectedTournament = ref(null) // 👈 NEU

async function load() {
  tournaments.value = await getTournaments()
}

async function remove(id) {
  if (!confirm('Turnier wirklich löschen?')) return
  await deleteTournament(id)
  await load()
}

// 👁 Turnier anschauen
function viewTournament(tournament) {
  selectedTournament.value = tournament
  showEditor.value = true
}

// ✏️ Turnier bearbeiten
function editTournament(tournament) {
  selectedTournament.value = tournament
  showEditor.value = true
}

// ➕ Neues Turnier
function createNewTournament() {
  selectedTournament.value = null
  showEditor.value = true
}

onMounted(load)
</script>

<template>
  <div>
    <h1>🏆 Tournaments</h1>

    <!-- Neuer Turnier Button -->
    <CreateTournamentButton @open="createNewTournament" />

    <!-- Editor (neu + anschauen + bearbeiten) -->
    <TournamentEditor
      v-if="showEditor"
      :tournament="selectedTournament"
    @close="showEditor = false"
    @saved="load"
    />

    <ul>
      <li v-for="t in tournaments" :key="t.id">
        {{ t.name }} – Winner: {{ t.winner }}

        <!-- 👁 Anschauen -->
        <button @click="viewTournament(t)">👁</button>

        <!-- ✏️ Bearbeiten -->
        <button @click="editTournament(t)">✏️</button>

        <!-- 🗑 Löschen -->
        <button @click="remove(t.id)">🗑</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
}
</style>
