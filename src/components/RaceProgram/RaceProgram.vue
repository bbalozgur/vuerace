<script setup lang="ts">
import { useRaceStore } from '@/store/raceStore';

const store = useRaceStore();
</script>

<template>
  <div class="race-program">
    <h3>Program</h3>

    <div v-for="(race, i) in store.races" :key="i" class="race-item">
      <h4>{{ i + 1 }}ST Lap - {{ race.distance }}m</h4>

      <table>
        <thead>
        <tr>
          <th>Position</th>
          <th>Name</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(horse, index) in race.originalHorses" :key="horse.id">
          <td>{{ index + 1 }}</td>
          <td :style="{ color: horse.color }">{{ horse.name }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.race-program {
  text-align: center;
}
.race-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
h4 {
  background: blue;
  color: white;
  padding: 5px;
  margin: 0;
  border-radius: 3px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 5px;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
th {
  background-color: #f4f4f4;
}
</style>