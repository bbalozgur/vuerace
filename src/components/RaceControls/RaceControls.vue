<template>
  <div class="controls">
    <button @click="store.generateRaces">Generate Program</button>
    <button @click="startRace" :disabled="isStartDisabled">Start Race</button>
  </div>
</template>

<script setup lang="ts">
import { useRaceStore } from '@/store/raceStore';
import { computed } from 'vue';

const store = useRaceStore();

const startRace = () => {
  if (!store.isRunning && store.currentRaceIndex < store.races.length) {
    store.startRace();
  }
};

const isStartDisabled = computed(() => store.isRunning || store.currentRaceIndex >= store.races.length);
</script>

<style scoped>
.controls {
  display: flex;
  gap: 10px;
  justify-content: center;
}
button {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>