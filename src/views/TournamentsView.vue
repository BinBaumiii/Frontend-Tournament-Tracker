<script setup>
import { ref, onMounted } from 'vue'
import { getTournaments, deleteTournament } from '@/services/TournamentService'

import CreateTournamentButton from '@/components/CreateTournamentButton.vue'
import TournamentEditor from '@/components/TournamentEditor.vue'
import Scoreboard from '@/components/Scoreboard.vue'

const tournaments = ref([])
const showEditor = ref(false)
const selectedTournament = ref(null)
const editorMode = ref('create') // 'view' | 'edit' | 'create'

// Turniere laden
async function load() {
  tournaments.value = await getTournaments()
}

// Turnier löschen
async function remove(id) {
  if (!confirm('Turnier wirklich löschen?')) return
  await deleteTournament(id)
  await load()
}

// Turnier anschauen
function viewTournament(tournament) {
  selectedTournament.value = tournament
  editorMode.value = 'view'
  showEditor.value = true
}

// Turnier bearbeiten
function editTournament(tournament) {
  selectedTournament.value = tournament
  editorMode.value = 'edit'
  showEditor.value = true
}

// Neues Turnier erstellen
function createNewTournament() {
  selectedTournament.value = null
  editorMode.value = 'create'
  showEditor.value = true
}

onMounted(load)
</script>

<template>
  <div class="homepage">
    <!-- Linke Spalte: Turnierliste -->
    <div class="left-column">
      <h1>🏆 Turniere</h1>
      <CreateTournamentButton @open="createNewTournament" />

      <!-- Editor -->
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
          <button @click="viewTournament(t)">anschauen</button>
          <button @click="editTournament(t)">bearbeiten</button>
          <button @click="remove(t.id)">löschen</button>
        </li>
      </ul>
    </div>

    <!-- Rechte Spalte: Scoreboard -->
    <div class="right-column">
      <Scoreboard />
    </div>
  </div>
</template>

<style scoped>
.homepage {
  display: flex;
  gap: 2rem;          /* Abstand zwischen Turniere und Scoreboard */
  padding: 1rem;
  justify-content: flex-start; /* alles links ausrichten */
}

/* Linke Spalte – Turnierliste und Editor */
.left-column {
  flex: 3;            /* mehr Platz für die Turniere */
  min-width: 400px;
}

/* Rechte Spalte – Scoreboard */
.right-column {
  flex: 1;            /* weniger Platz für Scoreboard */
  min-width: 300px;
  margin-left: 20rem;  /* etwas Abstand vom Turnierbereich */
}

/* Style für Turnierliste */
ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

li button {
  margin-left: auto;
}
</style>
