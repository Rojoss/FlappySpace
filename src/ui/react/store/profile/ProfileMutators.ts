import { IProfileState } from './ProfileReducer';
import { ISetLevelActionPayload } from './ProfileActions';

export const _setLevel = (state: IProfileState, payload: ISetLevelActionPayload): IProfileState => {
    return {
        ...state,
        level: payload
    };
};