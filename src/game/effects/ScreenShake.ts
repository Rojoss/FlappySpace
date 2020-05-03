import { GameUtils } from '../utils/GameUtils';
import { Game } from '../Game';
import { IUpdateable } from '../GameLoop';

export class ScreenShake implements IUpdateable {

    private game: Game;
    public updateID!: number;

    private strength: number = 0;
    private shakeX: number = 0;
    private shakeY: number = 0;

    public constructor(game: Game) {
        this.game = game;
    }

    public destroy(): void {
        this.reset();
        delete this.game;
    }

    public shake(strength: number = 0.9, shakeX: number = 100, shakeY: number = shakeX): void {
        if (this.updateID) {
            return;
        }
        this.updateID = this.game.loop.addToUpdate(this);
        this.strength = GameUtils.clamp01(strength);
        this.shakeX = shakeX;
        this.shakeY = shakeY;
    }

    private reset(): void {
        this.game.loop.removeFromUpdate(this.updateID);
        this.game.stage.scene.x = 0;
        this.game.stage.scene.y = 0;
        delete this.updateID;
    }

    public update(dt: number): void {
        if (!this.updateID) {
            return;
        }

        this.game.stage.scene.x = -(this.shakeX / 2) + (Math.random() * this.shakeX);
        this.game.stage.scene.y = -(this.shakeY / 2) + (Math.random() * this.shakeY);
        this.shakeX *= this.strength;
        this.shakeY *= this.strength;

        if (this.shakeX < 0.5 && this.shakeY < 0.5) {
            this.reset();
        }
    }

}