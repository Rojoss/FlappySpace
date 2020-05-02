import { composeWithDevTools } from 'redux-devtools-extension';
import { ActionType } from '../actions/ActionType';
import { routerMiddleware, routerReducer, RouterState } from 'react-router-redux';
import { applyMiddleware, combineReducers, createStore, Reducer } from 'redux';
import thunk from 'redux-thunk';
import { history } from '../History';
import { profileReducer, IProfileState } from './profile/ProfileReducer';

const actionTypeEnumToString = (action: any): any => typeof action.type === 'number' && ActionType[action.type] ? ({
    type: ActionType[action.type],
    payload: action.payload,
}) : action;
const composeEnhancers = composeWithDevTools({ actionSanitizer: actionTypeEnumToString });

export const store = createStore(
    combineReducers({
        router: routerReducer,
        profile: profileReducer,
    }),
    composeEnhancers(
        applyMiddleware(
            thunk,
            routerMiddleware(history)
        ),
    ),
);

export interface IRootState {
    router: Reducer<RouterState>;
    profile: IProfileState;
}

export function GetState(): IRootState {
    return (store.getState() as any) as IRootState;
}