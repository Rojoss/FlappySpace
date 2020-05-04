import * as React from 'react';
import Screen from '../Screen';

export default class SplashScreen extends React.Component<any, any> {

    public componentWillMount(): void {

    }

    public render(): JSX.Element {
        return <Screen name={'splash'}>
            <div className='logo'>
                <img className='logo-img' src='/assets/sprites/ship.png' />
            </div>
            <h1 className='title'>Flappy Space</h1>
            <span className='content'>Loading assets...</span>
        </Screen>;
    }
}