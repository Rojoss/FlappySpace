import { IGameState } from './GameReducer';
import { ISetCrystalsActionPayload, ISetGameStateActionPayload, ISetGameLevelActionPayload, ISetLevelStatsPayload, ISetGameStartTimeActionPayload, ISetLevelSelectVisibleActionPayload } from './GameActions';

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

export const _setCurrentLevelStats = (state: IGameState, payload: ISetLevelStatsPayload): IGameState => {
    return {
        ...state,
        currentLevelStats: payload
    };
};

export const _addCrystal = (state: IGameState, payload: undefined): IGameState => {
    return {
        ...state,
        crystals: state.crystals + 1
    };
};

export const _setGameStartTime = (state: IGameState, payload: ISetGameStartTimeActionPayload): IGameState => {
    return {
        ...state,
        startTime: payload
    };
};

export const _setLevelSelectVisible = (state: IGameState, payload: ISetLevelSelectVisibleActionPayload): IGameState => {
    return {
        ...state,
        levelSelectVisible: payload
    };
};