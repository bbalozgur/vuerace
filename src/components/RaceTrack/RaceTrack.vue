<template>
  <div class="race-track">
    <div class="track-lines">
      <div v-for="horse in currentRace.horses" :key="horse.id" class="track-line">
        <div
            :id="'horse-' + horse.id"
            class="horse"
            :style="{ color: horse.color }"
        >
          🏇 {{ horse.name }}
        </div>
      </div>
    </div>
    <div class="finish-line">🏁</div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, nextTick } from "vue";
import { useRaceStore } from "@/store/raceStore";
import { moveHorse } from "@/utils/helper";
import gsap from "gsap";
import { DEFAULT_RACE, STATUS } from "@/constants";

const store = useRaceStore();
const currentRace = computed(() => store.races[store.currentRaceIndex] || DEFAULT_RACE);

const animateRace = async () => {
  if (!store.isRunning || currentRace.value.status !== STATUS.RUNNING) return;

  await nextTick();

  currentRace.value.horses.forEach(horse => {
    moveHorse(horse, currentRace.value.distance);
  });

  const allHorsesFinished = currentRace.value.horses.every(
      (horse) => horse.position >= currentRace.value.distance
  );

  if (allHorsesFinished) {
    store.finishRace();
    setTimeout(() => {
      if (store.currentRaceIndex < store.races.length) {
        resetHorsesPosition();
        store.startRace();
        requestAnimationFrame(animateRace);
      }
    }, 200);
  } else {
    requestAnimationFrame(animateRace);
  }
};

const resetHorsesPosition = () => {
  currentRace.value.horses.forEach((horse) => {
    horse.position = 0;
    gsap.set(`#horse-${horse.id}`, { x: 0 });
  });
};

watch(
    () => store.isRunning,
    (running) => {
      if (running) {
        resetHorsesPosition();
        animateRace();
      }
    }
);
</script>

<style scoped>
.race-track {
  position: relative;
  width: 90vw;
  max-width: 1200px;
  height: 250px;
  background: green;
  border: 5px solid black;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
}

.track-lines {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.track-line {
  position: relative;
  width: 100%;
  height: 30px;
  border-bottom: 2px dashed white;
}

.horse {
  position: absolute;
  left: 0;
  font-size: 18px;
  font-weight: bold;
  transition: transform 0.5s linear;
  white-space: nowrap;
}

.finish-line {
  position: absolute;
  right: 20px;
  top: 0;
  bottom: 0;
  width: 10px;
  background: red;
  border-left: 3px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
}
</style>