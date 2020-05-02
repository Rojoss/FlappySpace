import * as mutator from './ProfileMutators';
import { ActionType } from '../../actions/ActionType';
import { IAction } from '../../actions/IAction';
import { IProfile } from './IProfile';

export interface IProfileState extends IProfile { }

export function getInitialState(): IProfileState {
    return {
        level: 1
    };
}

const handlers: { [index: number]: any } = {
    [ActionType.SET_LEVEL]: mutator._setLevel,
};

export function profileReducer(state: IProfileState = getInitialState(), action: IAction<any>): IProfileState {
    if (handlers[action.type]) {
        return handlers[action.type](state, action.payload);
    }
    return state;
}