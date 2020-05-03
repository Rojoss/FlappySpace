import * as mutator from './GameMutators';
import { ActionType } from '../../actions/ActionType';
import { IAction } from '../../actions/IAction';
import { GameState } from '../../../../game/GameState';

export interface IGameState {
    state: GameState;
    level: number;
    crystals: number;
    highscoreCrystals: number;
    startTime: number | undefined;
}

export function getInitialState(): IGameState {
    return {
        state: GameState.PRE_GAME,
        level: 1,
        crystals: 0,
        highscoreCrystals: 0,
        startTime: undefined
    };
}

const handlers: { [index: number]: any } = {
    [ActionType.SET_GAME_STATE]: mutator._setGameState,
    [ActionType.SET_GAME_LEVEL]: mutator._setGameLevel,
    [ActionType.SET_CRYSTALS]: mutator._setCrystals,
    [ActionType.ADD_CRYSTAL]: mutator._addCrystal,
    [ActionType.SET_CRYSTAL_HIGHSCORE]: mutator._setCrystalHighscore,
    [ActionType.SET_GAME_START_TIME]: mutator._setGameStartTime,
};

export function gameReducer(state: IGameState = getInitialState(), action: IAction<any>): IGameState {
    if (handlers[action.type]) {
        return handlers[action.type](state, action.payload);
    }
    return state;
}