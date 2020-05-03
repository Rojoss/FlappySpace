import { ILevel } from './ILevel';
import { ControllerDifficulty } from './ControllerDifficulty';

export class Levels {

    private static readonly levelList: ILevel[] = [
        {
            name: 'Mars', // Red
            bgTopColor: '#731337',
            bgBottomClr: '#201725',
            planetBlendColor: '#e3702d',
            controllerDifficulty: ControllerDifficulty.EASY,
            minPlanetDistance: 300,
            maxPlanetDistance: 500,
            speedMultiplier: 1.0,
            planetSeed: 100,
        },
        {
            name: 'Neptune', // Blue
            bgTopColor: '#135973',
            bgBottomClr: '#091125',
            planetBlendColor: '#5336a3',
            controllerDifficulty: ControllerDifficulty.EASY,
            minPlanetDistance: 290,
            maxPlanetDistance: 490,
            speedMultiplier: 1.1,
            planetSeed: 10,
        },
        {
            name: 'Uranus', // Green
            bgTopColor: '#65cc57',
            bgBottomClr: '#122a23',
            planetBlendColor: '#0fb88b',
            controllerDifficulty: ControllerDifficulty.NORMAL,
            minPlanetDistance: 280,
            maxPlanetDistance: 480,
            speedMultiplier: 1.2,
            planetSeed: 200,
        },
        {
            name: 'Pluto', // Pink
            bgTopColor: '#a53572',
            bgBottomClr: '#3f1730',
            planetBlendColor: '##d172db',
            controllerDifficulty: ControllerDifficulty.NORMAL,
            minPlanetDistance: 270,
            maxPlanetDistance: 470,
            speedMultiplier: 1.3,
            planetSeed: 300,
        },
        {
            name: 'Venus', // Orange
            bgTopColor: '#a85002',
            bgBottomClr: '#3b1403',
            planetBlendColor: '#e8b938',
            controllerDifficulty: ControllerDifficulty.HARD,
            minPlanetDistance: 260,
            maxPlanetDistance: 460,
            speedMultiplier: 1.4,
            planetSeed: 400,
        },
        {
            name: 'Mercury', //  Teal
            bgTopColor: '#0c7856',
            bgBottomClr: '#12272a',
            planetBlendColor: '#7ad6d2',
            controllerDifficulty: ControllerDifficulty.HARD,
            minPlanetDistance: 250,
            maxPlanetDistance: 450,
            speedMultiplier: 1.5,
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