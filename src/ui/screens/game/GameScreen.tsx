import * as React from 'react';
import Screen from '../Screen';

export default class GameScreen extends React.Component<any, any> {

    public componentWillMount(): void {

    }

    public render(): JSX.Element {
        return <Screen name={'game'}>
            Game Screen
        </Screen>;
    }
}