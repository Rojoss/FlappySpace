import * as PIXI from 'pixi.js';
import { GameStage } from '../rendering/GameStage';
import { RenderManager } from '../rendering/RenderManager';
import { GameUtils } from '../utils/GameUtils';
import { Layer } from '../rendering/Layer';

export class Stars extends PIXI.Container {

    private static readonly MIN_SIZE: number = 0.5;
    private static readonly MAX_SIZE: number = 7;
    private static readonly STARS_PER_1000PX: number = 50;
    private static readonly STAR_TEXTURE: PIXI.Texture = PIXI.Texture.from('/assets/sprites/star.png');
    private static readonly STAR_OPACITY_MIN: number = 0.3;
    private static readonly STAR_OPACITY_MAX: number = 0.5;

    private updateID: number;

    private stars: PIXI.Sprite[] = [];

    constructor(stage: GameStage) {
        super();

        this.updateID = stage.addToUpdate(this.update.bind(this));
        stage.addToScene(Layer.BACKGROUND_AMBIENT, this);
    }

    public destroy(): void {
        RenderManager.Instance.stage.removeFromUpdate(this.updateID);
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

    private update(dt: number): void {
        const ship = RenderManager.Instance.ship;

        for (let i = this.stars.length - 1; i >= 0; i--) {
            const star = this.stars[i];

            const sizeSpeedMultiplier = star.height / Stars.MAX_SIZE;
            const speed = (ship.speed * 0.2) + (2 * sizeSpeedMultiplier) + (2 * star.alpha);
            star.x -= speed;

            if (star.x + star.width < 0) {
                this.setRandomStarSize(star);
                star.x = RenderManager.Instance.stageWidth + star.width;
            }
        }
    }

    private createStar(initial: boolean): void {
        const star = new PIXI.Sprite(Stars.STAR_TEXTURE);
        this.setRandomStarSize(star);
        star.x = initial ? Math.random() * RenderManager.Instance.stageWidth : RenderManager.Instance.stageWidth;
        star.y = Math.random() * RenderManager.Instance.stageHeight;
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