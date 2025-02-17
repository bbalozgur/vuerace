import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useRaceStore } from '@/store/raceStore';
import { STATUS } from '@/constants';

describe('Race Store', () => {
    let store: ReturnType<typeof useRaceStore>;

    beforeEach(() => {
        store = useRaceStore();
        store.generateRaces();
    });

    it('should generate 20 horses', () => {
        store.generateHorses();
        expect(store.horses.length).toBe(20);
        expect(store.horses[0]).toHaveProperty('id');
        expect(store.horses[0]).toHaveProperty('name');
        expect(store.horses[0]).toHaveProperty('condition');
        expect(store.horses[0]).toHaveProperty('color');
        expect(store.horses[0]).toHaveProperty('position');
    });

    it('should generate 6 races with 10 horses each', () => {
        expect(store.races.length).toBe(6);
        store.races.forEach(race => {
            expect(race.horses.length).toBe(10);
            expect(race.distance).toBeGreaterThan(0);
            expect(race.status).toBe(STATUS.PENDING);
        });
    });

    it('should start a race and set status to running', () => {
        store.startRace();
        expect(store.isRunning).toBe(true);
        expect(store.races[store.currentRaceIndex].status).toBe(STATUS.RUNNING);
    });

    it('should finish a race and determine the winner correctly', () => {
        store.startRace();

        const winningHorse = store.races[store.currentRaceIndex].horses[0];
        winningHorse.position = store.races[store.currentRaceIndex].distance;

        store.races[store.currentRaceIndex].horses.slice(1).forEach(horse => {
            horse.position = store.races[store.currentRaceIndex].distance - 10;
        });

        store.finishRace();

        expect(store.races[store.currentRaceIndex - 1].winner).toBe(winningHorse);
        expect(store.races[store.currentRaceIndex - 1].status).toBe(STATUS.FINISHED);
    });

    it('should complete all races and stop the game', () => {
        vi.useFakeTimers();

        store.startRace();

        while (store.currentRaceIndex < store.races.length) {
            store.races[store.currentRaceIndex].horses.forEach(horse => {
                horse.position = store.races[store.currentRaceIndex].distance;
            });
            store.finishRace();
        }

        expect(store.isRunning).toBe(false);
        expect(store.currentRaceIndex).toBe(6);
    });

    it('should correctly log the winners of each race', () => {
        store.startRace();
        let winners: string[] = [];

        while (store.currentRaceIndex < store.races.length) {
            store.races[store.currentRaceIndex].horses.forEach(horse => {
                horse.position = store.races[store.currentRaceIndex].distance;
            });
            store.finishRace();
            winners.push(store.races[store.currentRaceIndex - 1].winner!.name);
        }

        expect(winners.length).toBe(6);
    });
});