<script setup>
import { ref, onMounted } from 'vue'
import { getTournaments, deleteTournament } from '@/services/TournamentService'

import CreateTournamentButton from '@/components/CreateTournamentButton.vue'
import TournamentEditor from '@/components/TournamentEditor.vue'

const tournaments = ref([])
const showEditor = ref(false)
const selectedTournament = ref(null)
const editorMode = ref('create') // 'view' | 'edit' | 'create'

async function load() {
  tournaments.value = await getTournaments()
}

async function remove(id) {
  if (!confirm('Turnier wirklich löschen?')) return
  await deleteTournament(id)
  await load()
}

function viewTournament(tournament) {
  selectedTournament.value = tournament
  editorMode.value = 'view'
  showEditor.value = true
}

function editTournament(tournament) {
  selectedTournament.value = tournament
  editorMode.value = 'edit'
  showEditor.value = true
}

function createNewTournament() {
  selectedTournament.value = null
  editorMode.value = 'create'
  showEditor.value = true
}

onMounted(load)
</script>

<template>
  <div>
    <h1>🏆 Tournaments</h1>

    <CreateTournamentButton @open="createNewTournament" />

    <TournamentEditor
      v-if="showEditor"
      :tournament="selectedTournament"
      :mode="editorMode"
      @close="showEditor = false"
      @saved="load"
    />

    <ul>
      <li v-for="t in tournaments" :key="t.id">
        {{ t.name }} – Winner: {{ t.winner }}

        <button @click="viewTournament(t)">👁</button>
        <button @click="editTournament(t)">✏️</button>
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
