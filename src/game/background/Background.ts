import * as PIXI from 'pixi.js';
import { GameStage } from '../rendering/GameStage';

export class Background extends PIXI.Sprite {

    constructor(stage: GameStage, colorTop: string, colorBottom: string) {
        const gradientTexture = Background.generateGradientTexture(colorTop, colorBottom);
        gradientTexture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        super(gradientTexture);
    }

    private static generateGradientTexture(colorTop: string, colorBottom: string): PIXI.Texture {
        const c = document.createElement('canvas');
        c.width = 1000;
        c.height = 1000;
        const ctx = c.getContext('2d');
        if (!ctx) {
            return PIXI.Texture.WHITE;
        }
        const gradient = ctx.createLinearGradient(500, 0, 500, 1000);
        gradient.addColorStop(0, colorTop);
        gradient.addColorStop(1, colorBottom);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1000, 1000);
        return PIXI.Texture.from(c);
    }

    public onStageResize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }

}