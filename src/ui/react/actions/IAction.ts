import { ActionType } from './ActionType';

export interface IAction<T> {
    type: ActionType;
    payload: T;
}