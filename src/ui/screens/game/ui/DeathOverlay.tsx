import * as React from 'react';
import { Game } from '../../../../game/Game';
import { store } from '../../../react/store/Store';
import { setLevelSelectVisible } from '../../../react/store/game/GameActions';

export default class DeathOverlay extends React.Component<any, any> {

    public componentWillMount(): void {
        this.nextLevel = this.nextLevel.bind(this);
        this.restart = this.restart.bind(this);
        this.levelSelect = this.levelSelect.bind(this);
    }

    private nextLevel(event: any): void {
        event && event.preventDefault();
        Game.Instance.nextLevel();
    }

    private restart(event: any): void {
        event && event.preventDefault();
        Game.Instance.restart();
    }

    private levelSelect(event: any): void {
        event && event.preventDefault();
        store.dispatch(setLevelSelectVisible(true));
    }

    public render(): JSX.Element {
        return <div className='death-overlay'>
            <div className='content'>
                <div className='animated-container'>
                    <h2>You Crashed</h2>

                    <div className='score'>
                        <div>Crystals: WIP<div className='record'>NEW RECORD</div></div>
                        <div>Time: WIP</div>
                    </div>

                    {/* <div className='new-level'>
                        <div>You have unlocked a new level!</div>
                    </div> */}

                    <div className='actions'>
                        {/* <button className='button button-next' onClick={this.nextLevel}>Next Level</button> */}
                        <button className='button button-restart' onClick={this.restart}>Restart</button>
                        <button className='button button-levelselect' onClick={this.levelSelect}>Level Select</button>
                    </div>
                </div>
            </div>
        </div>;
    }
}