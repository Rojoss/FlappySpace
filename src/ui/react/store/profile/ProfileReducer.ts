import * as mutator from './ProfileMutators';
import { ActionType } from '../../actions/ActionType';
import { IAction } from '../../actions/IAction';
import { IProfile } from './IProfile';

export interface IProfileState extends IProfile { }

export function getInitialState(): IProfileState {
    return {
        levelData: {}
    };
}

const handlers: { [index: number]: any } = {
    [ActionType.SET_PROFILE]: mutator._setProfile,
    [ActionType.UPDATE_LEVEL_DATA]: mutator._updateLevelData,
};

export function profileReducer(state: IProfileState = getInitialState(), action: IAction<any>): IProfileState {
    if (handlers[action.type]) {
        return handlers[action.type](state, action.payload);
    }
    return state;
}