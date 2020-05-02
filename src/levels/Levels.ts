import { ILevel } from './ILevel';
import { ControllerDifficulty } from './ControllerDifficulty';

export class Levels {

    private static readonly levelList: ILevel[] = [
        {
            name: 'Blue',
            bgTopColor: '#135973',
            bgBottomClr: '#091125',
            planetBlendColor: '#5336a3',
            controllerDifficulty: ControllerDifficulty.EASY,
            minPlanetDistance: 300,
            maxPlanetDistance: 500,
            speedMultiplier: 1,
            planetSeed: 10,
        },
        {
            name: 'Red',
            bgTopColor: '#731337',
            bgBottomClr: '#201725',
            planetBlendColor: '#e3702d',
            controllerDifficulty: ControllerDifficulty.EASY,
            minPlanetDistance: 300,
            maxPlanetDistance: 500,
            speedMultiplier: 1.05,
            planetSeed: 100,
        },
        {
            name: 'Green',
            bgTopColor: '#65cc57',
            bgBottomClr: '#122a23',
            planetBlendColor: '#0fb88b',
            controllerDifficulty: ControllerDifficulty.NORMAL,
            minPlanetDistance: 300,
            maxPlanetDistance: 500,
            speedMultiplier: 1.1,
            planetSeed: 200,
        },
        {
            name: 'Pink',
            bgTopColor: '#a53572',
            bgBottomClr: '#3f1730',
            planetBlendColor: '##d172db',
            controllerDifficulty: ControllerDifficulty.NORMAL,
            minPlanetDistance: 300,
            maxPlanetDistance: 500,
            speedMultiplier: 1.15,
            planetSeed: 300,
        },
        {
            name: 'Orange',
            bgTopColor: '#a85002',
            bgBottomClr: '#3b1403',
            planetBlendColor: '#e8b938',
            controllerDifficulty: ControllerDifficulty.HARD,
            minPlanetDistance: 300,
            maxPlanetDistance: 500,
            speedMultiplier: 1.2,
            planetSeed: 400,
        },
        {
            name: 'Teal',
            bgTopColor: '#0c7856',
            bgBottomClr: '#12272a',
            planetBlendColor: '#7ad6d2',
            controllerDifficulty: ControllerDifficulty.HARD,
            minPlanetDistance: 300,
            maxPlanetDistance: 500,
            speedMultiplier: 1.25,
            planetSeed: 500,
        }
    ];

    public static get(level: number): ILevel {
        return this.levelList[level - 1];
    }

    public static get count(): number {
        return Levels.levelList.length;
    }

}