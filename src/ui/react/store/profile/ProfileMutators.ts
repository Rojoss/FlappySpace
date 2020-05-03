import { IProfileState } from './ProfileReducer';
import { IUpdateLevelDataAction } from './ProfileActions';

export const _updateLevelData = (state: IProfileState, payload: IUpdateLevelDataAction): IProfileState => {
    if (state.levelData[payload.level] && state.levelData[payload.level].crystals >= payload.data.crystals && state.levelData[payload.level].survivalTime >= payload.data.survivalTime) {
        return state;
    }

    const levelData = { ...state.levelData };
    if (levelData[payload.level]) {
        levelData[payload.level] = {
            ...levelData[payload.level],
            crystals: Math.max(levelData[payload.level].crystals, payload.data.crystals),
            survivalTime: Math.max(levelData[payload.level].survivalTime, payload.data.survivalTime),
        };
    } else {
        levelData[payload.level] = { ...payload.data };
    }

    try {
        localStorage.setItem('profile.leveldata', JSON.stringify(levelData));
    } catch (e) {
        console.error(`Local storage not available or blocked, unable to keep progress throughout sessions.`);
    }
    return {
        ...state,
        levelData
    };
};