import * as React from 'react';
import HUD from './ui/HUD';
import DeathOverlay from './ui/DeathOverlay';
import { IRootState } from '../../react/store/Store';
import { connect } from 'react-redux';
import { GameState } from '../../../game/GameState';
import LevelSelect from './ui/LevelSelect';

export interface IGAmeUIProps {
    state: GameState;
    levelSelectVisible: boolean;
}

const mapStateToProps = (state: IRootState): IGAmeUIProps => ({
    state: state.game.state,
    levelSelectVisible: state.game.levelSelectVisible
});

class GameUI extends React.Component<IGAmeUIProps, any> {

    public render(): JSX.Element {
        return <div className='game-ui'>
            <HUD />
            {this.props.levelSelectVisible && this.props.state !== GameState.PLAYING && <LevelSelect />}
            {!this.props.levelSelectVisible && this.props.state === GameState.DEAD && <DeathOverlay />}
        </div>;
    }
}
export default connect(mapStateToProps)(GameUI);