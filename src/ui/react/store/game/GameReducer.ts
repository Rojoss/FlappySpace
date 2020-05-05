import * as mutator from './GameMutators';
import { ActionType } from '../../actions/ActionType';
import { IAction } from '../../actions/IAction';
import { GameState } from '../../../../game/GameState';
import { ILevelData } from '../profile/IProfile';

export interface IGameState {
    state: GameState;
    level: number;
    crystals: number;
    currentLevelStats: ILevelData;
    resultLevelStats: ILevelData | undefined;
    startTime: number | undefined;

    levelSelectVisible: boolean;
}

export function getInitialState(): IGameState {
    return {
        state: GameState.PRE_GAME,
        level: 1,
        crystals: 0,
        startTime: undefined,
        currentLevelStats: {
            crystals: 0,
            survivalTime: 0
        },
        resultLevelStats: undefined,

        levelSelectVisible: false
    };
}

const handlers: { [index: number]: any } = {
    [ActionType.SET_GAME_STATE]: mutator._setGameState,
    [ActionType.SET_GAME_LEVEL]: mutator._setGameLevel,
    [ActionType.SET_CRYSTALS]: mutator._setCrystals,
    [ActionType.ADD_CRYSTAL]: mutator._addCrystal,
    [ActionType.SET_CURRENT_LEVEL_STATS]: mutator._setCurrentLevelStats,
    [ActionType.SET_RESULT_LEVEL_STATS]: mutator._setResultLevelStats,
    [ActionType.SET_GAME_START_TIME]: mutator._setGameStartTime,
    [ActionType.SET_LEVEL_SELECT_VISIBLE]: mutator._setLevelSelectVisible,
};

export function gameReducer(state: IGameState = getInitialState(), action: IAction<any>): IGameState {
    if (handlers[action.type]) {
        return handlers[action.type](state, action.payload);
    }
    return state;
}