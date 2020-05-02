import { IAction } from './IAction';
import { ActionType } from './ActionType';

export type IActionNOOP = IAction<undefined>;
export const ActionNOOP: IActionNOOP = {
    type: ActionType.NOOP,
    payload: undefined
};