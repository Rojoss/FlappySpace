import * as React from 'react';
import { IProfileLevelData } from '../../../react/store/profile/IProfile';
import { IRootState, store } from '../../../react/store/Store';
import { Levels } from '../../../../levels/Levels';
import LevelTile from './LevelTile';
import { connect } from 'react-redux';
import { setLevelSelectVisible } from '../../../react/store/game/GameActions';

interface IProps {
    levelData: IProfileLevelData;
}

const mapStateToProps = (state: IRootState): IProps => ({
    levelData: state.profile.levelData,
});

class LevelSelect extends React.Component<IProps, any> {

    public componentWillMount(): void {
        this.close = this.close.bind(this);
    }

    private close(event: any): void {
        event && event.preventDefault();
        store.dispatch(setLevelSelectVisible(false));
    }

    public render(): JSX.Element {

        let totalCrystals: number = 0;
        for (let i = 1; i <= Levels.count; i++) {
            totalCrystals += this.props.levelData[i] ? this.props.levelData[i].crystals : 0;
        }

        const levelTiles: JSX.Element[] = [];
        for (let i = 1; i <= Levels.count; i++) {
            levelTiles.push(<LevelTile key={i} level={i} data={this.props.levelData[i]} crystalCount={totalCrystals} />);
        }

        return <div className='level-select'>
            <div className='content'>
                <div className='animated-container'>
                    <div className='crystal-count'>
                        <img className='crystal' src='/assets/sprites/crystal.png' />
                        <span className='total'><span className='value'>{totalCrystals}</span> crystals collected</span>
                    </div>
                    <div className='levels'>
                        {levelTiles}
                    </div>

                    <div className='actions'>
                        <button className='button button-close' onClick={this.close}>Close</button>
                    </div>
                </div>
            </div>
        </div>;
    }
}
export default connect(mapStateToProps)(LevelSelect);