import { describe, it, expect, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useRaceStore } from '@/store/raceStore';
import RaceResults from '@/components/RaceResults/RaceResults.vue';

describe('RaceResults.vue', () => {
    let store: ReturnType<typeof useRaceStore>;
    let pinia: ReturnType<typeof createPinia>;
    let wrapper: ReturnType<typeof mount>;

    beforeEach(async () => {
        pinia = createPinia();
        setActivePinia(pinia);
        store = useRaceStore();
        store.generateRaces();
        await flushPromises();

        wrapper = mount(RaceResults, {
            global: { plugins: [pinia] }
        });

        await flushPromises();
        await wrapper.vm.$nextTick();
    });

    it('should generate races when "Generate Program" button is clicked', async () => {
        expect(store.races.length).toBe(6);
    });

    it('renders an empty results section when no races exist', async () => {
        store.races = [];

        await flushPromises();
        await wrapper.vm.$nextTick();

        const results = wrapper.findAll('.race-result');
        expect(results.length).toBe(0);
    });
});