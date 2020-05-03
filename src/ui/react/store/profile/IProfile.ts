export interface IProfile {
    readonly levelData: IProfileLevelData;
}

export interface IProfileLevelData {
    [level: number]: ILevelData;
}

export interface ILevelData {
    survivalTime: number;
    crystals: number;
}