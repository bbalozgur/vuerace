import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useRaceStore } from '@/store/raceStore';
import RaceControls from '@/components/RaceControls/RaceControls.vue';

describe('RaceControls.vue', () => {
    let store: ReturnType<typeof useRaceStore>;

    beforeEach(() => {
        setActivePinia(createPinia());
        store = useRaceStore();
    });

    it('should disable "Start Race" button when no races exist', async () => {
        const wrapper = mount(RaceControls, {
            global: { plugins: [createPinia()] }
        });

        const startButton = wrapper.find('button:last-of-type');
        expect(startButton.attributes('disabled')).toBeDefined();
    });


    it('should finish all races and stop the race', async () => {
        store.generateRaces();
        vi.useFakeTimers();

        while (store.currentRaceIndex < store.races.length) {
            store.finishRace();
        }

        expect(store.isRunning).toBe(false);
        expect(store.currentRaceIndex).toBe(6);
    });
});