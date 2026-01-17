<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TournamentEditor from '@/components/TournamentEditor.vue'

const route = useRoute()
const router = useRouter()

const tournament = ref(null)

onMounted(async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/tournaments/${route.params.id}`
  )
  tournament.value = await res.json()
})

function onSaved() {
  router.push('/')
}
</script>

<template>
  <TournamentEditor
    v-if="tournament"
    :modelValue="tournament"
    @saved="onSaved"
    @close="onSaved"
  />
</template>
