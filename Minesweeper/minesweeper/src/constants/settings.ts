type GameLevel = 'NORMAL' | 'HARD' | 'HARDCORE';

interface LevelSettings {
    BOARD_SIZE: number;
    BOMB_COUNT: number;
    FLAG_COUNT: number;
}

export const LEVELS: Record<GameLevel, LevelSettings> = {
    NORMAL: {
        BOARD_SIZE: 10,
        BOMB_COUNT: 10,
        FLAG_COUNT: 10
    },
    HARD: {
        BOARD_SIZE: 20,
        BOMB_COUNT: 20,
        FLAG_COUNT: 20
    },
    HARDCORE: {
        BOARD_SIZE: 40,
        BOMB_COUNT: 30,
        FLAG_COUNT: 30
    }
};

export type { GameLevel };
export default LEVELS;