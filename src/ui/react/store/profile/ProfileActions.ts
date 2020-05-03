import { ActionType } from '../../actions/ActionType';
import { IAction } from '../../actions/IAction';

export const setUnlockedLevelsAction = (payload: ISetUnlockedLevelsActionPayload): IAction<ISetUnlockedLevelsActionPayload> => ({
    type: ActionType.SET_UNLOCKED_LEVELS,
    payload
});

export type ISetUnlockedLevelsActionPayload = number;