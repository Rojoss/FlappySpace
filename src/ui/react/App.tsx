import * as React from 'react';
import '../style/main';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { store } from './store/Store';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Router } from 'react-router-dom';
import { history } from './History';
import SplashScreen from '../screens/splash/SplashScreen';
import GameScreen from '../screens/game/GameScreen';

export default class App extends React.Component<any, any> {
    public render(): JSX.Element {
        return <ConnectedRouter history={history} store={store}>
            <AppContainer>
                <Provider store={store}>
                    <Router history={history}>
                        <Route exact path={Routes.SPLASH} component={SplashScreen} />
                        <Route exact path={Routes.GAME} component={GameScreen} />
                    </Router>
                </Provider>
            </AppContainer>
        </ConnectedRouter >;
    }
}

export enum Routes {
    SPLASH = '/splash',
    GAME = '/',
}