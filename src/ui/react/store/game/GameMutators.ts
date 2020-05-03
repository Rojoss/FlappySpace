import { IGameState } from './GameReducer';
import { ISetCrystalsActionPayload, ISetGameStateActionPayload, ISetGameLevelActionPayload, ISetCrystalHighscoreActionPayload, ISetGameStartTimeActionPayload } from './GameActions';

export const _setGameState = (state: IGameState, payload: ISetGameStateActionPayload): IGameState => {
    return {
        ...state,
        state: payload
    };
};

export const _setGameLevel = (state: IGameState, payload: ISetGameLevelActionPayload): IGameState => {
    return {
        ...state,
        level: payload
    };
};

export const _setCrystals = (state: IGameState, payload: ISetCrystalsActionPayload): IGameState => {
    return {
        ...state,
        crystals: payload
    };
};

export const _setCrystalHighscore = (state: IGameState, payload: ISetCrystalHighscoreActionPayload): IGameState => {
    return {
        ...state,
        highscoreCrystals: payload
    };
};

export const _addCrystal = (state: IGameState, payload: undefined): IGameState => {
    return {
        ...state,
        crystals: state.crystals + 1,
        highscoreCrystals: state.crystals + 1 > state.highscoreCrystals ? state.crystals + 1 : state.highscoreCrystals
    };
};

export const _setGameStartTime = (state: IGameState, payload: ISetGameStartTimeActionPayload): IGameState => {
    return {
        ...state,
        startTime: payload
    };
};