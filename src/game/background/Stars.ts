import * as PIXI from 'pixi.js';
import { GameUtils } from '../utils/GameUtils';
import { Layer } from '../rendering/Layer';
import { Game } from '../Game';
import { IUpdateable } from '../GameLoop';
import { AssetLoader } from '../../AssetLoader';
import { SpriteID } from '../../Sprite';

export class Stars extends PIXI.Container implements IUpdateable {

    private static readonly MIN_SIZE: number = 0.5;
    private static readonly MAX_SIZE: number = 7;
    private static readonly STARS_PER_1000PX: number = 50;
    private static readonly STAR_OPACITY_MIN: number = 0.1;
    private static readonly STAR_OPACITY_MAX: number = 0.4;

    private game: Game;
    public updateID: number;

    private stars: PIXI.Sprite[] = [];

    constructor(game: Game) {
        super();
        this.game = game;

        this.updateID = game.loop.addToUpdate(this);
        game.stage.addToScene(Layer.BACKGROUND_AMBIENT, this);
    }

    public destroy(): void {
        this.game.loop.removeFromUpdate(this.updateID);
        delete this.game;
        super.destroy();
    }

    public onStageResize(width: number, height: number): void {
        const targetStarCount = Math.round(width / 1000 * Stars.STARS_PER_1000PX);

        if (this.stars.length > targetStarCount) {
            for (let i = this.stars.length - 1; i >= targetStarCount; i--) {
                this.stars[i].destroy();
                this.stars.splice(i, 1);
            }
        } else if (this.stars.length < targetStarCount) {
            for (let i = this.stars.length; i <= targetStarCount; i++) {
                this.createStar(true);
            }
        }
    }

    public update(dt: number): void {
        const ship = this.game.renderManager.ship;

        for (let i = this.stars.length - 1; i >= 0; i--) {
            const star = this.stars[i];

            const sizeSpeedMultiplier = star.height / Stars.MAX_SIZE;
            const speed = (ship.speed * 0.3) + (0.5 * sizeSpeedMultiplier);
            star.x -= speed;

            if (star.x + star.width < 0) {
                this.setRandomStarSize(star);
                star.x = this.game.width + star.width;
            }
        }
    }

    private createStar(initial: boolean): void {
        const star = new PIXI.Sprite(AssetLoader.getTexture(SpriteID.STAR));
        this.setRandomStarSize(star);
        star.x = initial ? Math.random() * this.game.width : this.game.width;
        star.y = Math.random() * this.game.height;
        this.stars.push(star);
        this.addChild(star);
    }

    private setRandomStarSize(star: PIXI.Sprite): void {
        const size = GameUtils.lerp(Stars.MIN_SIZE, Stars.MAX_SIZE, Math.random());
        star.width = size;
        star.height = size;
        star.alpha = GameUtils.lerp(Stars.STAR_OPACITY_MIN, Stars.STAR_OPACITY_MAX, Math.random());
    }
}