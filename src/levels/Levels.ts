import { ILevel } from './ILevel';
import { ControllerDifficulty } from './ControllerDifficulty';
import { Sound } from '../SoundManager';

export class Levels {

    private static readonly levelList: ILevel[] = [
        {
            name: 'Mars', // Red
            crystalsToUnlock: 0,
            bgTopColor: '#731337',
            bgBottomClr: '#201725',
            planetBlendColor: '#e3702d',
            controllerDifficulty: ControllerDifficulty.EASY,
            minPlanetDistance: 280,
            maxPlanetDistance: 500,
            speedMultiplier: 1.3,
            planetSeed: 100,
            ambientSound: Sound.AMBIENT_2,
        },
        {
            name: 'Neptune', // Blue
            crystalsToUnlock: 10,
            bgTopColor: '#135973',
            bgBottomClr: '#091125',
            planetBlendColor: '#5336a3',
            controllerDifficulty: ControllerDifficulty.EASY,
            minPlanetDistance: 270,
            maxPlanetDistance: 475,
            speedMultiplier: 1.4,
            planetSeed: 10,
            ambientSound: Sound.AMBIENT_1,
        },
        {
            name: 'Uranus', // Green
            crystalsToUnlock: 30,
            bgTopColor: '#65cc57',
            bgBottomClr: '#122a23',
            planetBlendColor: '#0fb88b',
            controllerDifficulty: ControllerDifficulty.NORMAL,
            minPlanetDistance: 260,
            maxPlanetDistance: 450,
            speedMultiplier: 1.5,
            planetSeed: 200,
            ambientSound: Sound.AMBIENT_5,
        },
        {
            name: 'Pluto', // Pink
            crystalsToUnlock: 60,
            bgTopColor: '#a53572',
            bgBottomClr: '#3f1730',
            planetBlendColor: '##d172db',
            controllerDifficulty: ControllerDifficulty.NORMAL,
            minPlanetDistance: 250,
            maxPlanetDistance: 425,
            speedMultiplier: 1.6,
            planetSeed: 300,
            ambientSound: Sound.AMBIENT_6,
        },
        {
            name: 'Venus', // Orange
            crystalsToUnlock: 100,
            bgTopColor: '#a85002',
            bgBottomClr: '#3b1403',
            planetBlendColor: '#e8b938',
            controllerDifficulty: ControllerDifficulty.HARD,
            minPlanetDistance: 240,
            maxPlanetDistance: 400,
            speedMultiplier: 1.8,
            planetSeed: 400,
            ambientSound: Sound.AMBIENT_3,
        },
        {
            name: 'Mercury', //  Teal
            crystalsToUnlock: 150,
            bgTopColor: '#0c7856',
            bgBottomClr: '#12272a',
            planetBlendColor: '#7ad6d2',
            controllerDifficulty: ControllerDifficulty.HARD,
            minPlanetDistance: 230,
            maxPlanetDistance: 375,
            speedMultiplier: 2,
            planetSeed: 500,
            ambientSound: Sound.AMBIENT_4,
        }
    ];

    public static get(level: number): ILevel {
        return this.levelList[level - 1];
    }

    public static get count(): number {
        return Levels.levelList.length;
    }

}