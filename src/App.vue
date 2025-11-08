<template>
  <div id="app">
    <h1>Tournament Tracker</h1>
    <br>
    <PlayerList />
  </div>
</template>

<script>
import PlayerList from './components/PlayerList.vue';

export default {
  name: 'App',
  components: {
    PlayerList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #333;
  margin-top: 40px;
}
</style>
