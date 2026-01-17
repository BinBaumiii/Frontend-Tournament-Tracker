<template>
  <div class="bracket">
    <!-- Runde 1 -->
    <div class="round">
      <div class="match" v-for="i in 4" :key="i">
        <input placeholder="Spieler A" />
        <input placeholder="Spieler B" />
        <input placeholder="Ergebnis" />
      </div>
    </div>

    <!-- Runde 2 -->
    <div class="round">
      <div class="match" v-for="i in 2" :key="i">
        <input placeholder="Spieler A" />
        <input placeholder="Spieler B" />
        <input placeholder="Ergebnis" />
      </div>
    </div>

    <!-- Finale -->
    <div class="round">
      <div class="match">
        <input placeholder="Spieler A" />
        <input placeholder="Spieler B" />
        <input placeholder="Ergebnis" />
      </div>
    </div>

    <div class="round">
      <div class="match">
        <input placeholder="🏆 Gewinner" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.bracket {
  display: flex;
  gap: 3rem;
}

.round {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 1.5rem;
}

.match {
  border: 1px solid #ccc;
  padding: 0.75rem;
  width: 180px;
  background: white;
  border-radius: 6px;
}

.match input {
  width: 100%;
  margin-bottom: 0.4rem;
}
</style>
<script setup lang="ts">
</script>
