<template>
  <div class="horse-list">
    <h3>Available Horses</h3>

    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Condition</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(horse, index) in store.horses" :key="horse.id">
        <td>{{ index + 1 }}</td>
        <td :style="{ color: horse.color }">{{ horse.name }}</td>
        <td>{{ horse.condition }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useRaceStore } from '@/store/raceStore';

const store = useRaceStore();
</script>

<style scoped>
.horse-list {
  text-align: center;
  border: 3px solid purple;
  border-radius: 8px;
  background: white;
  padding: 15px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: 100%;
}

h3 {
  background: purple;
  color: white;
  padding: 8px;
  margin: 0;
  border-radius: 5px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
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