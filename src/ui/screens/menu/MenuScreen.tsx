import * as React from 'react';
import Screen from '../Screen';

export default class MenuScreen extends React.Component<any, any> {

    public componentWillMount(): void {

    }

    public render(): JSX.Element {
        return <Screen name={'menu'}>
            Menu Screen
        </Screen>;
    }
}