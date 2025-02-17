export const HORSE_NAMES = [
    "Ada Lovelace", "Grace Hopper", "Margaret Hamilton", "Joan Clarke",
    "Alan Turing", "Nikola Tesla", "Marie Curie", "Galileo Galilei",
    "Isaac Newton", "Leonardo Da Vinci", "Charles Darwin", "Albert Einstein",
    "Katherine Johnson", "Carl Sagan", "Blaise Pascal", "Hypatia",
    "Aristotle", "Pythagoras", "Archimedes", "Socrates"
];

export const HORSE_COLORS = [
    "red", "blue", "green", "yellow", "purple", "orange", "pink", "brown",
    "cyan", "lime", "indigo", "violet", "gold", "teal", "magenta", "silver",
    "navy", "coral", "maroon", "olive"
];

export const HORSE_DISTANCE = [1200, 1400, 1600, 1800, 2000, 2200];

export const STATUS = {
    PENDING: 'pending',
    RUNNING: 'running',
    FINISHED: 'finished'
} as const;

export const DEFAULT_RACE = {
    horses: [],
    originalHorses: [],
    distance: 0,
    status: STATUS.PENDING
};

export const HORSE_SPEED_FACTOR = 5;