import * as React from 'react';
import { Game } from '../../../../game/Game';

export default class DeathOverlay extends React.Component<any, any> {

    public componentWillMount(): void {
        this.restart = this.restart.bind(this);
        this.menu = this.menu.bind(this);
    }

    private restart(event: any): void {
        event && event.preventDefault();
        Game.Instance.restart();
    }

    private nextLevel(event: any): void {
        event && event.preventDefault();
        Game.Instance.nextLevel();
    }

    private menu(event: any): void {
        event && event.preventDefault();
    }

    public render(): JSX.Element {
        return <div className='death-overlay'>
            <div className='content'>
                <h2>You Crashed :(</h2>

                <div className='score'>
                    <div>Crystals: ...<div className='record'>NEW RECORD</div></div>
                    <div>Time: ....</div>
                </div>

                <div className='new-level'>
                    <div>You have unlocked a new level!</div>
                </div>

                <div className='actions'>
                    <button className='button button-next' onClick={this.nextLevel}>Next Level</button>
                    <button className='button button-restart' onClick={this.restart}>Restart</button>
                    <button className='button button-back' onClick={this.menu}>Back To Menu</button>
                </div>
            </div>
        </div>;
    }
}