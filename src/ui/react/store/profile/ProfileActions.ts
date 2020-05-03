import { ActionType } from '../../actions/ActionType';
import { IAction } from '../../actions/IAction';
import { ILevelData } from './IProfile';

export const updateLevelDataAction = (payload: IUpdateLevelDataAction): IAction<IUpdateLevelDataAction> => ({
    type: ActionType.UPDATE_LEVEL_DATA,
    payload
});

export interface IUpdateLevelDataAction {
    level: number;
    data: ILevelData;
}