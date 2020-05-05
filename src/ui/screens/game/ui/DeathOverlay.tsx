import * as React from 'react';
import { Game } from '../../../../game/Game';
import { store, IRootState, GetState } from '../../../react/store/Store';
import { setLevelSelectVisible } from '../../../react/store/game/GameActions';
import { connect } from 'react-redux';
import { ILevelData } from '../../../react/store/profile/IProfile';
import { UIUtils } from '../../../UIUtils';
import { Levels } from '../../../../levels/Levels';
import { UIImage } from '../../../UIImage';
import { SoundManager, Sound } from '../../../../SoundManager';

export interface IProps {
    level: number;
    levelStats: ILevelData;
    resultLevelStats: ILevelData | undefined;
}

const mapStateToProps = (state: IRootState): IProps => ({
    level: state.game.level,
    levelStats: state.game.currentLevelStats,
    resultLevelStats: state.game.resultLevelStats,
});
class DeathOverlay extends React.Component<IProps, any> {

    private totalCrystals: number = 0;
    private highestUnlockedLevel: number = 1;

    public componentWillMount(): void {
        this.nextLevel = this.nextLevel.bind(this);
        this.restart = this.restart.bind(this);
        this.levelSelect = this.levelSelect.bind(this);

        const levelData = GetState().profile.levelData;
        this.totalCrystals = 0;
        for (const key in levelData) {
            if (levelData.hasOwnProperty(key)) {
                this.totalCrystals += levelData[key].crystals;
            }
        }

        for (let i = Levels.count; i >= 1; i--) {
            if (this.totalCrystals >= Levels.get(i).crystalsToUnlock) {
                this.highestUnlockedLevel = i;
                break;
            }
        }
    }

    private nextLevel(event: any): void {
        event && event.preventDefault();
        SoundManager.play(Sound.UI_CLICK);
        Game.Instance.nextLevel();
    }

    private restart(event: any): void {
        event && event.preventDefault();
        SoundManager.play(Sound.UI_CLICK);
        Game.Instance.restart();
    }

    private levelSelect(event: any): void {
        event && event.preventDefault();
        SoundManager.play(Sound.UI_CLICK);
        store.dispatch(setLevelSelectVisible(true));
    }

    public render(): JSX.Element {
        if (!this.props.resultLevelStats) {
            return <React.Fragment />;
        }

        const newCrystalsDiff = this.props.resultLevelStats.crystals - this.props.levelStats.crystals;
        const newCrystals = newCrystalsDiff > 0 ? newCrystalsDiff : 0;
        const newSurvivalTime = this.props.resultLevelStats.survivalTime - this.props.levelStats.survivalTime;

        const newTotalCrystals = this.totalCrystals + newCrystals;

        const currentLevel = Levels.get(this.highestUnlockedLevel);
        const nextLevel = this.highestUnlockedLevel < Levels.count ? Levels.get(this.highestUnlockedLevel + 1) : undefined;

        const crystalsToUnlockNextLvl = nextLevel ? nextLevel.crystalsToUnlock : 0;
        const deltaCrystalsToUnlockNextLvl = crystalsToUnlockNextLvl - currentLevel.crystalsToUnlock;
        const crystalsTowardsNextLvl = newTotalCrystals - currentLevel.crystalsToUnlock;
        const newLevelUnlocked = newTotalCrystals >= crystalsToUnlockNextLvl;

        const visualPercentageCurrentCrystals = Math.min(Math.floor((crystalsTowardsNextLvl - newCrystals) / deltaCrystalsToUnlockNextLvl * 100), 100);
        const visualPercentageNewCrystals = Math.min(Math.floor(newCrystals / deltaCrystalsToUnlockNextLvl * 100), 100 - visualPercentageCurrentCrystals);

        return <div className='death-overlay'>
            <div className='content'>
                <div className='animated-container'>
                    <h2>Your Results</h2>

                    <div className='round-stats'>
                        <div className='stat stat-crystals'>
                            <div className='icon'>
                                <img src={newCrystalsDiff > 0 ? UIImage.crystal : UIImage.crystalOld} />
                            </div>
                            <div className='value'>{this.props.resultLevelStats.crystals}</div>
                            {newCrystalsDiff > 0 && <div className='new'>+ {newCrystalsDiff}</div>}
                        </div>
                        <div className='stat stat-survivaltime'>
                            <div className='icon'>
                                <img src={UIImage.clock} />
                            </div>
                            <div className='value'>{UIUtils.formatDuration(this.props.resultLevelStats.survivalTime)}</div>
                            {newSurvivalTime > 0 && <div className='new'>+ {UIUtils.formatDuration(newSurvivalTime)}</div>}
                        </div>
                    </div>

                    <div className='crystals'>
                        <div className='inner'>
                            <div className='icon'>
                                <img src={UIImage.crystal} />
                            </div>
                            <div className='count'>
                                <div className='prev-value'>{this.totalCrystals}</div>
                                <div className='new'><span className='plus'>+</span> {newCrystals}</div>
                                <div className='value'>{newTotalCrystals}</div>
                            </div>
                        </div>
                    </div>

                    <div className='level-progress'>
                        {this.highestUnlockedLevel < Levels.count && <div className='inner'>
                            <div className='current-level'>
                                <img className='planet' src={UIImage.planet[this.highestUnlockedLevel]} />
                                <div className='planet-name'><span className='name'>{currentLevel.name}</span></div>
                            </div>
                            <div className='progress'>
                                <div className='bar'>
                                    <div className='value'>{crystalsTowardsNextLvl}/{deltaCrystalsToUnlockNextLvl}</div>
                                    <div className='fill' style={{ width: `${visualPercentageCurrentCrystals}%` }}></div>
                                    <div className='fill--new' style={{ width: `${visualPercentageNewCrystals}%` }}></div>
                                </div>
                            </div>
                            <div className={`next-level next-level--${newLevelUnlocked ? 'unlocked' : 'locked'}`}>
                                <img className='planet' src={UIImage.planet[this.highestUnlockedLevel + 1]} />
                                <div className='planet-name'><span className='name'>???</span></div>
                                {newLevelUnlocked && <div className='planet-name--unlocked'><span className='name'>{nextLevel?.name}</span></div>}
                            </div>
                        </div>}
                    </div>

                    <div className='actions'>
                        {newLevelUnlocked && <button className='button button-next' onClick={this.nextLevel}>Next Level</button>}
                        {!newLevelUnlocked && <button className='button button-restart' onClick={this.restart}>Play Again</button>}
                        <button className='button button-levelselect' onClick={this.levelSelect}>Level Select</button>
                    </div>
                </div>
            </div>
        </div>;
    }
}
export default connect(mapStateToProps)(DeathOverlay);