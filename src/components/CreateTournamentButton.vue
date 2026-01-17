<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <button @click="router.push('/tournaments/new')">
    ➕ Turnier erstellen
  </button>
</template>
