import { describe, it, expect, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useRaceStore } from '@/store/raceStore';
import RaceProgram from '@/components/RaceProgram/RaceProgram.vue';
import { STATUS } from '@/constants';
import type { TRace, THorse } from '@/store/raceStore.types';

describe('RaceProgram.vue', () => {
    let store: ReturnType<typeof useRaceStore>;
    let pinia: ReturnType<typeof createPinia>;

    beforeEach(() => {
        pinia = createPinia();
        setActivePinia(pinia);
        store = useRaceStore();
    });

    it('renders the correct number of race laps', async () => {
        store.races = [
            { id: 1, horses: [], originalHorses: [], distance: 1200, status: STATUS.PENDING },
            { id: 2, horses: [], originalHorses: [], distance: 1400, status: STATUS.PENDING }
        ] as TRace[];

        const wrapper = mount(RaceProgram, {
            global: { plugins: [pinia] }
        });

        await flushPromises();
        await wrapper.vm.$nextTick();

        const laps = wrapper.findAll('.race-item');
        expect(laps.length).toBe(2);

        expect(laps[0].text()).toContain("1ST Lap - 1200m");
        expect(laps[1].text()).toContain("2ST Lap - 1400m");
    });

    it('renders horses in each race correctly', async () => {
        const testHorses: THorse[] = [
            { id: 1, name: "Ada Lovelace", condition: 90, color: "red", position: 0 },
            { id: 2, name: "Grace Hopper", condition: 85, color: "blue", position: 0 }
        ];

        store.races = [
            {
                id: 1,
                horses: testHorses,
                originalHorses: testHorses,
                distance: 1200,
                status: STATUS.PENDING
            }
        ] as TRace[];

        const wrapper = mount(RaceProgram, {
            global: { plugins: [pinia] }
        });

        await flushPromises();
        await wrapper.vm.$nextTick();

        const rows = wrapper.findAll('tbody tr');
        expect(rows.length).toBe(2);

        expect(rows[0].text()).toContain("1");
        expect(rows[0].text()).toContain("Ada Lovelace");

        expect(rows[1].text()).toContain("2");
        expect(rows[1].text()).toContain("Grace Hopper");
    });

    it('renders an empty race program when no races exist', async () => {
        store.races = [];

        const wrapper = mount(RaceProgram, {
            global: { plugins: [pinia] }
        });

        await flushPromises();
        await wrapper.vm.$nextTick();

        expect(wrapper.findAll('.race-item').length).toBe(0);
    });
});