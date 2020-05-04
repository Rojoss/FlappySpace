import { ActionType } from '../../actions/ActionType';
import { IAction } from '../../actions/IAction';
import { ILevelData, IProfile } from './IProfile';

export const setProfile = (payload: IProfile): IAction<IProfile> => ({
    type: ActionType.SET_PROFILE,
    payload
});


export const updateLevelDataAction = (payload: IUpdateLevelDataAction): IAction<IUpdateLevelDataAction> => ({
    type: ActionType.UPDATE_LEVEL_DATA,
    payload
});

export interface IUpdateLevelDataAction {
    level: number;
    data: ILevelData;
}