import * as React from 'react';
import Screen from '../Screen';

export default class SplashScreen extends React.Component<any, any> {

    public componentWillMount(): void {

    }

    public render(): JSX.Element {
        return <Screen name={'splash'}>
            <h1>Flappy Space</h1>
            Loading...
        </Screen>;
    }
}