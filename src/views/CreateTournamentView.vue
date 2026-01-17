<script setup>
import { useRouter } from 'vue-router'
import TournamentEditor from '@/components/TournamentEditor.vue'

const router = useRouter()

function onSaved() {
  router.push('/tournaments')
}

function onCancel() {
  router.push('/tournaments')
}
</script>

<template>
  <div class="create-page">
    <TournamentEditor
      @saved="onSaved"
      @close="onCancel"
    />
  </div>
</template>

<style scoped>
.create-page {
  display: flex;
  justify-content: center;
  padding-top: 2rem;
}
</style>
