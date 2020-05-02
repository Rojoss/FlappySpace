import * as PIXI from 'pixi.js';
import { Layer } from '../rendering/Layer';
import { GameStage } from '../rendering/GameStage';
import { RenderManager } from '../rendering/RenderManager';
import { GameUtils } from '../utils/GameUtils';

export class Ship extends PIXI.Container {

    private static readonly VELOCITY: number = 1.3;
    private static readonly FFRICTION: number = 0.98;
    private static readonly JUMP_FORCE: number = 40;
    private static readonly MAX_UPWARDS_VELOCITY: number = 40;

    private jumpEvent: () => void;
    private updateID: number;

    private shipSprite!: PIXI.Sprite;

    private velocity: number = Ship.VELOCITY;
    public speed: number = 0;
    public targetSpeed: number = 0;
    private targetAngle: number = 0;

    constructor(stage: GameStage) {
        super();

        this.x = 300;
        this.y = RenderManager.Instance.stageHeight / 2;

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
        this.shipSprite.scale.set(1);
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

        this.targetAngle = GameUtils.lerp(30, 0, GameUtils.clamp01((this.velocity + 25) / 40));
        this.angle = GameUtils.lerp(this.angle, this.targetAngle, 0.1);

        this.targetSpeed = 5 + GameUtils.lerp(8, 0, GameUtils.clamp01((this.velocity + 25) / 40));
        this.speed = GameUtils.lerp(this.speed, this.targetSpeed, 0.1);
        this.x += this.speed;
        // TODO: Remove this, Easier to just move the background

        if (this.y > RenderManager.Instance.stageHeight + this.height || this.y < -this.height) {
            this.x = 300;
            this.y = RenderManager.Instance.stageHeight / 2;
        }
    }

}