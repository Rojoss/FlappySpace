import * as React from 'react';
import Screen from '../Screen';
import { Game } from '../../../game/Game';
import GameUI from './GameUI';

export default class GameScreen extends React.Component<any, any> {

    public componentDidMount(): void {
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