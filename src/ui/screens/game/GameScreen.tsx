import * as React from 'react';
import Screen from '../Screen';
import { Game } from '../../../game/Game';
import GameUI from './GameUI';
import { GetState } from '../../react/store/Store';
import { Levels } from '../../../levels/Levels';

export default class GameScreen extends React.Component<any, any> {

    public componentDidMount(): void {
        const levelData = GetState().profile.levelData;
        let totalCrystals: number = 0;
        for (const key in levelData) {
            if (levelData.hasOwnProperty(key)) {
                totalCrystals += levelData[key].crystals;
            }
        }

        for (let i = Levels.count; i >= 1; i--) {
            if (totalCrystals >= Levels.get(i).crystalsToUnlock) {
                Game.createGame(i);
                return;
            }
        }

        Game.createGame(1);
    }

    public componentWillUnmount(): void {
        Game.destroyGame();
    }

    public render(): JSX.Element {
        return <Screen name={'game'}>
            <GameUI />
            <canvas id='game-canvas' className='game-canvas' />
        </Screen>;
    }
}