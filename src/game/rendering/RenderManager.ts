import { Ship } from '../ship/Ship';
import { Planets } from '../planets/Planets';
import { Stars } from '../background/Stars';
import { Crystals } from '../crystals/Crystals';
import { ScreenFlash } from '../effects/ScreenFlash';
import { Game } from '../Game';
import { ScreenShake } from '../effects/ScreenShake';
import { Gamecomponent } from '../GameComponent';
import { GameState } from '../GameState';
import { ILevel } from '../../levels/ILevel';

export class RenderManager extends Gamecomponent {

    public crystals!: Crystals;
    public planets!: Planets;
    public ship!: Ship;
    public stars!: Stars;

    public flashEffect!: ScreenFlash;
    public shakeEffect!: ScreenShake;

    public constructor(game: Game) {
        super(game);

        this.crystals = new Crystals(game);
        this.planets = new Planets(game);
        this.ship = new Ship(game);
        this.stars = new Stars(game);

        this.flashEffect = new ScreenFlash(game);
        this.shakeEffect = new ScreenShake(game);
    }

    public destroy(): void {
        this.stars.destroy();
        this.ship.destroy();
        this.planets.destroy();
        this.crystals.destroy();
        this.flashEffect.destroy();
        this.shakeEffect.destroy();

        delete this.game;
    }

    public onResize(width: number, height: number): void {
        this.stars.onStageResize(width, height);
        this.flashEffect.onStageResize(width, height);
    }

    public onStateChange(prevState: GameState, state: GameState): void {
        this.crystals.onStateChange(prevState, state);
        this.planets.onStateChange(prevState, state);
        this.ship.onStateChange(prevState, state);
    }

    public onLevelLoad(levelID: number, level: ILevel): void {
        this.ship.onLevelLoad(levelID, level);
    }

}