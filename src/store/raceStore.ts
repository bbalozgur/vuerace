import { defineStore } from 'pinia';
import { THorse, TRace } from './raceStore.types';
import { HORSE_NAMES, HORSE_COLORS, HORSE_DISTANCE, STATUS } from "@/constants";

export const useRaceStore = defineStore('raceStore', {
    state: () => ({
        horses: [] as THorse[],
        races: [] as TRace[],
        currentRaceIndex: 0,
        isRunning: false,
    }),

    actions: {
        generateHorses() {
            this.horses = HORSE_NAMES.map((name, i) => ({
                id: i + 1,
                name,
                condition: Math.floor(Math.random() * 100) + 1,
                color: HORSE_COLORS[i],
                position: 0
            }));
        },

        generateRaces() {
            this.generateHorses();
            this.races = HORSE_DISTANCE.map((distance, i) => ({
                id: i + 1,
                horses: [...this.horses].sort(() => Math.random() - 0.5).slice(0, 10),
                originalHorses: [...this.horses],
                distance,
                status: STATUS.PENDING
            }));
            this.currentRaceIndex = 0;
        },

        startRace() {
            if (this.currentRaceIndex < this.races.length) {
                this.isRunning = true;
                this.races[this.currentRaceIndex].status = STATUS.RUNNING;
            }
        },

        finishRace() {
            const race = this.races[this.currentRaceIndex];
            race.status = STATUS.FINISHED;
            race.winner = race.horses.reduce((best, horse) =>
                horse.position > best.position ? horse : best, race.horses[0]
            );

            this.currentRaceIndex++;

            if (this.currentRaceIndex < this.races.length) {
                setTimeout(() => {
                    this.startRace();
                }, 200);
            } else {
                this.isRunning = false;
            }
        }
    }
});