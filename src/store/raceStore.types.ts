import { STATUS } from '@/constants';

export type StatusType = typeof STATUS[keyof typeof STATUS];

export interface THorse {
    id: number;
    name: string;
    condition: number;
    color: string;
    position: number;
}

export interface TRace {
    id: number;
    horses: THorse[];
    originalHorses: THorse[];
    distance: number;
    status: StatusType;
    winner?: THorse;
}