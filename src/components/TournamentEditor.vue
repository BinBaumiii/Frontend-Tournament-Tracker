<template>
  <div class="editor-page">
    <TournamentBracket />

    <div class="actions">
      <button @click="$emit('saved')">💾 Speichern</button>
      <button @click="$emit('close')">❌ Abbrechen</button>
    </div>
  </div>
</template>

<script setup>
import TournamentBracket from './TournamentBracket.vue'
</script>

<style scoped>
.editor-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.actions {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
}
</style>
