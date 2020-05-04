import * as React from 'react';
import { IRootState } from '../../../react/store/Store';
import { GameState } from '../../../../game/GameState';
import { connect } from 'react-redux';
import { Levels } from '../../../../levels/Levels';
import { UIUtils } from '../../../UIUtils';
import { ILevelData } from '../../../react/store/profile/IProfile';

export interface IHUDProps {
    state: GameState;
    level: number;
    crystals: number;
    levelStats: ILevelData;
    startTime: number | undefined;
}

interface IState {
    timeAlive: number;
}

const mapStateToProps = (state: IRootState): IHUDProps => ({
    state: state.game.state,
    level: state.game.level,
    crystals: state.game.crystals,
    levelStats: state.game.currentLevelStats,
    startTime: state.game.startTime
});

class HUD extends React.Component<IHUDProps, IState> {

    private timeoutID: number | undefined = undefined;

    constructor(props: IHUDProps) {
        super(props);

        this.state = {
            timeAlive: 0
        };
    }

    public componentWillMount(): void {
        this.update = this.update.bind(this);
    }

    public componentWillReceiveProps(nextProps: IHUDProps): void {
        if (nextProps.state === GameState.PLAYING && this.props.state !== GameState.PLAYING) {
            this.startUpdateLoop();
        }
        if (nextProps.startTime === undefined && this.state.timeAlive !== 0) {
            this.stopUpdateLoop();
            this.setState({
                timeAlive: 0
            });
        }
    }

    private startUpdateLoop(): void {
        if (this.timeoutID !== undefined) {
            return;
        }
        this.update();
        this.timeoutID = window.setTimeout(this.update, 100);
    }

    private stopUpdateLoop(): void {
        window.clearTimeout(this.timeoutID);
        this.timeoutID = undefined;
    }

    private update(): void {
        if (this.props.state !== GameState.PLAYING || !this.props.startTime) {
            this.stopUpdateLoop();
            return;
        }
        this.setState({
            timeAlive: Date.now() - this.props.startTime
        });
        this.timeoutID = window.setTimeout(this.update, 1000);
    }

    public render(): JSX.Element {
        const pastRecord = this.props.crystals > this.props.levelStats.crystals;
        return <div className='hud'>
            <div className='level'>{Levels.get(this.props.level).name}</div>
            <div className='crystals'>
                <img className='crystal' src={pastRecord ? `/assets/sprites/crystal.png` : '/assets/sprites/crystal_old.png'} />
                <div className='value'>
                    <span className='current'>{this.props.crystals}</span>
                    {pastRecord ?
                        <span className='new'> +{this.props.crystals - this.props.levelStats.crystals}</span>
                        :
                        <span className='record'> / {this.props.levelStats.crystals}</span>
                    }
                </div>
            </div>
            <div className='time'>
                {UIUtils.formatDuration(this.state.timeAlive)}
            </div>
            {this.props.state === GameState.PRE_GAME && <div className='tutorial-message'>
                Tap to start!
            </div>}
        </div>;
    }
}

export default connect(mapStateToProps)(HUD);