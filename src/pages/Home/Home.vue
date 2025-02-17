<script setup lang="ts">
import { RaceTrack, RaceResults, RaceControls, HorseList, RaceProgram } from '@/components';

</script>

<template>
  <div class="container">
    <h1>Horse Racing Game</h1>
    <RaceControls />
    <div class="grid">
      <HorseList class="horse-list" />
      <div class="tables">
        <RaceProgram class="program" />
        <RaceResults class="results" />
      </div>
    </div>
    <RaceTrack class="race-track" />
  </div>
</template>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f0f0f0;
  padding: 10px;
}

h1 {
  margin-bottom: 10px;
}

.grid {
  display: flex;
  width: 90vw;
  max-width: 1200px;
  height: 60vh;
  gap: 10px;
}

.horse-list {
  flex: 0.3;
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: 100%;
  border: 3px solid purple;
}

.tables {
  flex: 1;
  display: flex;
}

.program {
  flex: 1;
  border: 3px solid blue;
  margin-right: 5px;
  background: white;
  padding: 15px;
  border-radius: 8px;
  overflow-y: auto;
  max-height: 100%;
}

.results {
  flex: 1;
  border: 3px solid green;
  background: white;
  padding: 15px;
  border-radius: 8px;
  overflow-y: auto;
  max-height: 100%;
}

.race-track {
  width: 90vw;
  max-width: 1200px;
  height: 25vh;
  background: lightgray;
  border: 3px solid black;
  border-radius: 8px;
  overflow-x: auto;
  white-space: nowrap;
}
</style>