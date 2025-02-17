<template>
  <div class="results">
    <h3>Race Results</h3>

    <div v-for="(race, i) in sortedResults" :key="i" class="race-result">
      <h4>{{ i + 1 }}ST Lap - {{ race.distance }}m</h4>

      <table>
        <thead>
        <tr>
          <th>Position</th>
          <th>Name</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(horse, index) in race.horses" :key="horse.id">
          <td>{{ index + 1 }}</td>
          <td :style="{ color: horse.color }">{{ horse.name }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import { useRaceStore } from '@/store/raceStore';

const store = useRaceStore();
const sortedResults = ref([]);

watch(
    () => store.currentRaceIndex,
    () => {
      sortedResults.value = JSON.parse(JSON.stringify(store.races)).map(race => ({
        ...race,
        horses: [...race.horses].sort((a, b) => b.position - a.position)
      }));
    },
    { deep: true }
);
</script>

<style scoped>
.results {
  text-align: center;
  padding: 10px;
  background: white;
  border-radius: 5px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: 500px;
}

.race-result {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

h4 {
  background: #c0392b;
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