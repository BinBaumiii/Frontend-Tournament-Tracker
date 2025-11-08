<template>
  <div class="player-list">
    <h2>Spielerliste</h2>
    <ul>
      <li v-for="(player, index) in players" :key="index">
        {{ index + 1 }}. {{ player }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PlayerList",
  data() {
    return {
      players: ["Alice", "Bob", "Charlie", "Diana", "Elias", "Fiona", "Gustav", "Hannah"]
    };
  }
};
</script>

<style scoped>
.player-list {
  background-color: #f3f3f3;
  padding: 16px;
  border-radius: 8px;
  width: 300px;
  margin: 0 auto;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
h2 {
  text-align: center;
  color: #42b983;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  background-color: white;
  margin: 6px 0;
  padding: 8px;
  border-radius: 6px;
  text-align: center;
  font-weight: 500;
}
</style>
