<script setup>
import { ref, onMounted } from 'vue'
import { getTournaments } from '@/services/TournamentService'

const tournaments = ref([])

onMounted(async () => {
  tournaments.value = await getTournaments()
})
</script>

<template>
  <div>
    <h1>🏆 Tournaments</h1>

    <ul>
      <li v-for="t in tournaments" :key="t.id">
        {{ t.name }} – Winner: {{ t.winner }}
      </li>
    </ul>
  </div>
</template>
