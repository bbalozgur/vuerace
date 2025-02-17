import { describe, it, expect, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useRaceStore } from '@/store/raceStore';
import HorseList from '@/components/HorseList/HorseList.vue';

describe('HorseList.vue', () => {
    let store: ReturnType<typeof useRaceStore>;
    let pinia: ReturnType<typeof createPinia>;

    beforeEach(() => {
        pinia = createPinia();
        setActivePinia(pinia);
        store = useRaceStore();
    });

    it('renders a list of horses', async () => {
        store.horses = [
            { id: 1, name: "Ada Lovelace", condition: 90, color: "red", position: 12 },
            { id: 2, name: "Grace Hopper", condition: 85, color: "blue", position: 22 }
        ];

        const wrapper = mount(HorseList, {
            global: { plugins: [pinia] }
        });

        await flushPromises();
        await wrapper.vm.$nextTick();

        const rows = wrapper.findAll('tbody tr');
        expect(rows.length).toBe(2);
    });

    it('applies horse colors correctly', async () => {
        store.horses = [
            { id: 1, name: "Ada Lovelace", condition: 90, color: "red", position: 12 },
            { id: 2, name: "Grace Hopper", condition: 85, color: "blue", position: 22 }
        ];

        const wrapper = mount(HorseList, {
            global: { plugins: [pinia] }
        });

        await flushPromises();
        await wrapper.vm.$nextTick();

        const nameCells = wrapper.findAll('tbody tr td:nth-child(2)');

        expect(nameCells.length).toBe(2);
        expect(nameCells[0].attributes('style')).toContain("color: red");
        expect(nameCells[1].attributes('style')).toContain("color: blue");
    });

    it('renders an empty list when no horses are available', async () => {
        store.horses = [];

        const wrapper = mount(HorseList, {
            global: { plugins: [pinia] }
        });

        await flushPromises();
        await wrapper.vm.$nextTick();

        expect(wrapper.findAll('tbody tr').length).toBe(0);
    });
});