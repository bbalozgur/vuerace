export type Horse = {
    id: number;
    name: string;
    condition: number;
    color: string;
    position: number;
}

export type Race = {
    id: number;
    horses: Horse[];
    originalHorses: Horse[];
    distance: number;
    status: 'pending' | 'running' | 'finished';
    winner?: Horse;
}