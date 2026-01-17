<script setup>
import { ref } from 'vue'
import { createTournament } from '@/services/TournamentService'

const emit = defineEmits(['created'])

const name = ref('')
const winner = ref('')

async function submit() {
  if (!name.value) return

  await createTournament({
    name: name.value,
    winner: winner.value,
    owner: '',
    players: {},
    results: {},
    scoreboard: {}
  })

  name.value = ''
  winner.value = ''

  emit('created') // Eltern-Komponente informieren
}
</script>

<template>
  <form @submit.prevent="submit">
    <h3>➕ Neues Turnier</h3>

    <input v-model="name" placeholder="Turniername" />
    <input v-model="winner" placeholder="Gewinner" />

    <button>Erstellen</button>
  </form>
</template>
