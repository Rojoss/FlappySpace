import { ActionType } from '../../actions/ActionType';
import { IAction } from '../../actions/IAction';

export const setLevelAction = (payload: ISetLevelActionPayload): IAction<ISetLevelActionPayload> => ({
    type: ActionType.SET_LEVEL,
    payload
});

export type ISetLevelActionPayload = number;