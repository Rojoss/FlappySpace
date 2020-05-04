import * as React from 'react';
import { ILevelData } from '../../../react/store/profile/IProfile';
import { Levels } from '../../../../levels/Levels';
import { UIUtils } from '../../../UIUtils';
import { Game } from '../../../../game/Game';
import { store } from '../../../react/store/Store';
import { setLevelSelectVisible } from '../../../react/store/game/GameActions';

interface IProps {
    crystalCount: number;
    level: number;
    data: ILevelData | undefined;
}

export default class LevelTile extends React.Component<IProps, any> {

    public componentWillMount(): void {
        this.selectLevel = this.selectLevel.bind(this);
    }

    public selectLevel(): void {
        store.dispatch(setLevelSelectVisible(false));
        Game.Instance.loadLevel(this.props.level);
    }

    public render(): JSX.Element {
        const configData = Levels.get(this.props.level);
        const unlocked = this.props.crystalCount >= configData.crystalsToUnlock;

        return <div onClick={this.selectLevel} className={`level level--${this.props.level} level--${unlocked ? 'unlocked' : 'locked'}`}>
            <div className='inner' style={{ backgroundImage: `url(/assets/planets/${configData.name.toLowerCase()}.png)` }}>
                {unlocked && <div className='name'>{configData.name}</div>}
                {unlocked && <div className='crystals iconvalue'>
                    <img className='icon' src='/assets/sprites/crystal.png' />
                    <span className='value'>{this.props.data ? this.props.data.crystals : 0}</span>
                </div>}

                {!unlocked && <div className='requirement iconvalue'>
                    <img className='icon' src='/assets/sprites/crystal.png' />
                    <span className='value'>{configData.crystalsToUnlock}</span>
                </div>}
                {!unlocked && <img className='lock' src='/assets/sprites/lock.png' />}
            </div>
            <div className='outer'>
                {unlocked && <div className='survivaltime iconvalue'>
                    <img className='icon' src='/assets/sprites/clock.png' />
                    <span className='value'>{UIUtils.formatDuration(this.props.data ? this.props.data.survivalTime : 0)}</span>
                </div>}
            </div>
        </div>;
    }
}