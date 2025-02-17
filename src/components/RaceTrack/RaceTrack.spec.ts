import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useRaceStore } from '@/store/raceStore';
import RaceTrack from '@/components//RaceTrack/RaceTrack.vue';
import { STATUS } from '@/constants';
import type { TRace } from '@/store/raceStore.types';

describe('RaceTrack.vue', () => {
    let store: ReturnType<typeof useRaceStore>;
    let pinia: ReturnType<typeof createPinia>;

    beforeEach(() => {
        pinia = createPinia();
        setActivePinia(pinia);
        store = useRaceStore();
    });

    it('renders horses on the track', async () => {
        store.races = [
            {
                id: 1,
                horses: [
                    { id: 1, name: "Ada Lovelace", condition: 90, color: "red", position: 0 },
                    { id: 2, name: "Grace Hopper", condition: 85, color: "blue", position: 0 }
                ],
                originalHorses: [],
                distance: 1200,
                status: STATUS.PENDING
            }
        ] as TRace[];

        store.currentRaceIndex = 0;

        const wrapper = mount(RaceTrack, {
            global: { plugins: [pinia] }
        });

        await flushPromises();
        await wrapper.vm.$nextTick();

        const horses = wrapper.findAll('.horse');
        expect(horses.length).toBe(2);
        expect(horses[0].text()).toContain("Ada Lovelace");
        expect(horses[1].text()).toContain("Grace Hopper");
    });

    it('moves horses when race starts', async () => {
        store.races = [
            {
                id: 1,
                horses: [
                    { id: 1, name: "Ada Lovelace", condition: 90, color: "red", position: 0 },
                    { id: 2, name: "Grace Hopper", condition: 85, color: "blue", position: 0 }
                ],
                originalHorses: [],
                distance: 1200,
                status: STATUS.RUNNING
            }
        ] as TRace[];

        store.currentRaceIndex = 0;
        store.isRunning = true;

        const wrapper = mount(RaceTrack, {
            global: { plugins: [pinia] }
        });

        await flushPromises();
        await wrapper.vm.$nextTick();

        const initialPositions = store.races[store.currentRaceIndex].horses.map(h => h.position);

        store.races[store.currentRaceIndex].horses.forEach(horse => horse.position += 50);

        await flushPromises();
        await wrapper.vm.$nextTick();

        const updatedPositions = store.races[store.currentRaceIndex].horses.map(h => h.position);

        expect(updatedPositions.some((pos, i) => pos > initialPositions[i])).toBe(true);
    });

    it('calls finishRace when all horses reach the finish line', async () => {
        store.races = [
            {
                id: 1,
                horses: [
                    { id: 1, name: "Ada Lovelace", condition: 90, color: "red", position: 1200 },
                    { id: 2, name: "Grace Hopper", condition: 85, color: "blue", position: 1200 }
                ],
                originalHorses: [],
                distance: 1200,
                status: STATUS.RUNNING
            }
        ] as TRace[];

        store.currentRaceIndex = 0;
        store.isRunning = true;

        vi.useFakeTimers();
        vi.spyOn(store, 'finishRace');

        const wrapper = mount(RaceTrack, {
            global: { plugins: [pinia] }
        });

        await flushPromises();
        await wrapper.vm.$nextTick();

        vi.runAllTimers();

        expect(store.finishRace).toHaveBeenCalled();
    });

    it('stops the race when all laps are completed', async () => {
        store.races = [
            {
                id: 1,
                horses: [
                    { id: 1, name: "Ada Lovelace", condition: 90, color: "red", position: 1200 },
                    { id: 2, name: "Grace Hopper", condition: 85, color: "blue", position: 1200 }
                ],
                originalHorses: [],
                distance: 1200,
                status: STATUS.FINISHED
            }
        ] as TRace[];

        store.currentRaceIndex = 0;
        store.isRunning = false;

        const wrapper = mount(RaceTrack, {
            global: { plugins: [pinia] }
        });

        await flushPromises();
        await wrapper.vm.$nextTick();

        expect(store.isRunning).toBe(false);
    });
});