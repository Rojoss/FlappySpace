import * as React from 'react';
import Screen from '../Screen';
import { RenderManager } from '../../../game/rendering/RenderManager';

export default class GameScreen extends React.Component<any, any> {

    public componentDidMount(): void {
        RenderManager.Instance.init();
    }

    public componentWillUnmount(): void {
        RenderManager.Instance.destroy();
    }

    public render(): JSX.Element {
        return <Screen name={'game'}>
            <canvas id='game-canvas' className='game-canvas' />
        </Screen>;
    }
}