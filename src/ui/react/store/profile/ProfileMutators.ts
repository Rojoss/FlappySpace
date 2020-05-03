import { IProfileState } from './ProfileReducer';
import { ISetUnlockedLevelsActionPayload } from './ProfileActions';

export const _setUnlockedLevels = (state: IProfileState, payload: ISetUnlockedLevelsActionPayload): IProfileState => {
    return {
        ...state,
        unlockedLevels: payload
    };
};