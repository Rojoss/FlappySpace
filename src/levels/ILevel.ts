export interface ILevel {
    name: string;
    bgTopColor: string;
    bgBottomClr: string;

    controllerDifficulty: number;
    speedMultiplier: number;

    minPlanetDistance: number;
    maxPlanetDistance: number;

    planetSeed: number;
}