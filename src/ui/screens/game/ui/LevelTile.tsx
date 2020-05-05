import * as React from 'react';
import { ILevelData } from '../../../react/store/profile/IProfile';
import { Levels } from '../../../../levels/Levels';
import { UIUtils } from '../../../UIUtils';
import { Game } from '../../../../game/Game';
import { store } from '../../../react/store/Store';
import { setLevelSelectVisible } from '../../../react/store/game/GameActions';
import { UIImage } from '../../../UIImage';
import { SoundManager, Sound } from '../../../../SoundManager';

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
        const configData = Levels.get(this.props.level);
        const unlocked = this.props.crystalCount >= configData.crystalsToUnlock;
        if (!unlocked) {
            SoundManager.play(Sound.UI_DENY);
            return;
        }
        SoundManager.play(Sound.UI_CLICK);
        store.dispatch(setLevelSelectVisible(false));
        Game.Instance.loadLevel(this.props.level);
    }

    public render(): JSX.Element {
        const configData = Levels.get(this.props.level);
        const unlocked = this.props.crystalCount >= configData.crystalsToUnlock;

        return <div onClick={this.selectLevel} className={`level level--${this.props.level} level--${unlocked ? 'unlocked' : 'locked'}`}>
            <div className='inner'>
                <img className='planet' src={UIImage.planet[this.props.level]} />
                {unlocked && <div className='name'>{configData.name}</div>}
                {unlocked && <div className='crystals iconvalue'>
                    <img className='icon' src={UIImage.crystal} />
                    <span className='value'>{this.props.data ? this.props.data.crystals : 0}</span>
                </div>}

                {!unlocked && <div className='requirement iconvalue'>
                    <img className='icon' src={UIImage.crystal} />
                    <span className='value'>{configData.crystalsToUnlock}</span>
                </div>}
                {!unlocked && <img className='lock' src={UIImage.lock} />}
            </div>
            <div className='outer'>
                {unlocked && <div className='survivaltime iconvalue'>
                    <img className='icon' src={UIImage.clock} />
                    <span className='value'>{UIUtils.formatDuration(this.props.data ? this.props.data.survivalTime : 0)}</span>
                </div>}
            </div>
        </div>;
    }
}