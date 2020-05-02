import * as PIXI from 'pixi.js';
import { Layer } from '../rendering/Layer';
import { GameStage } from '../rendering/GameStage';
import { RenderManager } from '../rendering/RenderManager';
import { GameUtils } from '../utils/GameUtils';

export class Ship extends PIXI.Container {

    private static readonly VELOCITY: number = 0.9;
    private static readonly FFRICTION: number = 0.97;
    private static readonly JUMP_FORCE: number = 25;
    private static readonly MAX_UPWARDS_VELOCITY: number = 25;

    private jumpEvent: () => void;
    private updateID: number;

    private shipSprite!: PIXI.Sprite;

    private velocity: number = Ship.VELOCITY;
    private targetAngle: number = 0;

    constructor(stage: GameStage) {
        super();

        this.x = 200;
        this.y = stage.app.renderer.height / 2;

        this.initArt();

        stage.addToScene(Layer.SHIP, this);
        this.updateID = stage.addToUpdate(this.update.bind(this));

        this.jumpEvent = this.jump.bind(this);
        window.addEventListener('mousedown', this.jumpEvent);
    }

    public destroy(): void {
        RenderManager.Instance.stage.removeFromUpdate(this.updateID);
        window.removeEventListener('mousedown', this.jumpEvent);
        super.destroy();
    }

    private initArt(): void {
        this.shipSprite = new PIXI.Sprite(PIXI.Texture.from('/assets/sprites/ship.png'));
        this.shipSprite.anchor.set(0.5);
        this.shipSprite.scale.set(0.5);
        this.addChild(this.shipSprite);
    }

    private jump(): void {
        this.velocity = Math.max(this.velocity - Ship.JUMP_FORCE, -Ship.MAX_UPWARDS_VELOCITY);
    }

    public update(dt: number): void {
        this.velocity += Ship.VELOCITY;
        console.log(this.velocity);
        this.velocity *= Ship.FFRICTION;
        this.y += this.velocity;

        // -25 = -5 & 20 = 45
        this.targetAngle = GameUtils.lerp(45, 0, GameUtils.clamp01((this.velocity + 25) / 40));
        this.angle = GameUtils.lerp(this.angle, this.targetAngle, 0.1);

        const stageHeight = RenderManager.Instance.stage.app.renderer.height;
        if (this.y > stageHeight + this.height || this.y < -this.height) {
            this.y = stageHeight / 2;
        }
    }

}