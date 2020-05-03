import * as PIXI from 'pixi.js';
import { Animation } from '../animation/Animation';
import { EaseMode } from '../animation/Ease';
import { Layer } from '../rendering/Layer';
import { Game } from '../Game';

export class ScreenFlash extends PIXI.Sprite {

    private game: Game;
    private animation: Animation;
    private outDuration: number = 0;

    public constructor(game: Game) {
        super(PIXI.Texture.WHITE);
        this.game = game;

        this.alpha = 0;
        this.tint = 0x000000;

        this.animation = new Animation(EaseMode.IN_SINE, 100, 0, 1);
        this.animation.onStep = (time: number, progress: number, value: number) => {
            this.alpha = value;
        };
        this.animation.onReset = () => {
            this.alpha = 0;
        };
        this.animation.onComplete = () => {
            if (this.animation.playCount === 1) {
                this.animation.setDuration(this.outDuration);
                this.animation.start(0, true);
                return false;
            }
            return true;
        };

        game.stage.addToScene(Layer.TOP, this);
    }

    public destroy(): void {
        delete this.game;
    }

    public flash(color: number = 0x000000, inDuration: number = 50, outDuration: number = 700, intensity: number = 1): void {
        this.tint = color;
        this.alpha = 0;
        this.outDuration = outDuration;
        this.animation.endValue = intensity;
        this.animation.setDuration(inDuration);
        this.animation.start();
    }

    public onStageResize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }
}