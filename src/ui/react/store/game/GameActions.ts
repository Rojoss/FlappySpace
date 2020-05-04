import { ActionType } from '../../actions/ActionType';
import { IAction } from '../../actions/IAction';
import { GameState } from '../../../../game/GameState';
import { ILevelData } from '../profile/IProfile';

export const setGameLevelAction = (payload: ISetGameLevelActionPayload): IAction<ISetGameLevelActionPayload> => ({
    type: ActionType.SET_GAME_LEVEL,
    payload
});
export type ISetGameLevelActionPayload = number;

export const setCrystals = (payload: ISetCrystalsActionPayload): IAction<ISetCrystalsActionPayload> => ({
    type: ActionType.SET_CRYSTALS,
    payload
});
export type ISetCrystalsActionPayload = number;

export const addCrystal = (): IAction<undefined> => ({
    type: ActionType.ADD_CRYSTAL,
    payload: undefined
});

export const setCurrentLevelStats = (payload: ISetLevelStatsPayload): IAction<ISetLevelStatsPayload> => ({
    type: ActionType.SET_CURRENT_LEVEL_STATS,
    payload
});
export type ISetLevelStatsPayload = ILevelData;

export const setGameState = (payload: ISetGameStateActionPayload): IAction<ISetGameStateActionPayload> => ({
    type: ActionType.SET_GAME_STATE,
    payload
});
export type ISetGameStateActionPayload = GameState;

export const setGameStartTime = (payload: ISetGameStartTimeActionPayload): IAction<ISetGameStartTimeActionPayload> => ({
    type: ActionType.SET_GAME_START_TIME,
    payload
});
export type ISetGameStartTimeActionPayload = number | undefined;

export const setLevelSelectVisible = (payload: ISetLevelSelectVisibleActionPayload): IAction<ISetLevelSelectVisibleActionPayload> => ({
    type: ActionType.SET_LEVEL_SELECT_VISIBLE,
    payload
});
export type ISetLevelSelectVisibleActionPayload = boolean;