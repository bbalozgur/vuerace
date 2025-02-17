import { beforeEach, afterEach } from 'vitest';
import { cleanup } from '@testing-library/vue';
import { setActivePinia, createPinia } from 'pinia';

beforeEach(() => {
    setActivePinia(createPinia());
});

afterEach(() => {
    cleanup();
});