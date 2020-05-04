export interface ILevel {
    name: string;

    crystalsToUnlock: number;

    bgTopColor: string;
    bgBottomClr: string;
    planetBlendColor: string;

    controllerDifficulty: number;
    speedMultiplier: number;

    minPlanetDistance: number;
    maxPlanetDistance: number;

    planetSeed: number;
}