import { Game } from './Game';
import { GameState } from './GameState';
import { ILevel } from '../levels/ILevel';

export abstract class Gamecomponent {

    protected game: Game;

    constructor(game: Game) {
        this.game = game;
    }

    public abstract destroy(): void;

    public onResize(width: number, height: number): void { }
    public onStateChange(prevState: GameState, state: GameState): void { }
    public onLevelLoad(levelID: number, level: ILevel): void { }

}