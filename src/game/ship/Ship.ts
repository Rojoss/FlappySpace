import * as PIXI from 'pixi.js';
import { Layer } from '../rendering/Layer';
import { GameStage } from '../rendering/GameStage';
import { RenderManager } from '../rendering/RenderManager';
import { GameUtils } from '../utils/GameUtils';
import { ScreenShake } from '../effects/ScreenShake';

export class Ship extends PIXI.Container {

    private static readonly GRAVITY: number = 1.3;
    private static readonly FFRICTION: number = 0.98;
    private static readonly JUMP_FORCE: number = 40;
    private static readonly MAX_UPWARDS_VELOCITY: number = 40;

    private jumpEvent: () => void;
    private updateID: number;

    private shipSprite!: PIXI.Sprite;

    public collisionOffsetY: number = 15;
    public collisionSize: number = 60;

    private velocity: number = Ship.GRAVITY;
    public speed: number = 0;
    private targetSpeed: number = 6;
    private targetAngle: number = 0;

    public alive: boolean = true;
    public distance: number = 0;

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

        // const collisionDebug = new PIXI.Sprite(PIXI.Texture.from('/assets/sprites/planet_1.png'));
        // collisionDebug.anchor.set(0.5);
        // collisionDebug.y = this.collisionOffsetY;
        // collisionDebug.width = this.collisionSize;
        // collisionDebug.height = this.collisionSize;
        // collisionDebug.tint = 0xff0000;
        // collisionDebug.alpha = 0.2;
        // this.addChild(collisionDebug);
    }

    private jump(): void {
        if (!this.alive) {
            this.y = RenderManager.Instance.stageHeight / 2;
            this.x = 300;
            this.distance = 0;
            this.alive = true;
            this.targetSpeed = 6;
            RenderManager.Instance.planets.restart();
            return;
        }
        this.velocity = Math.max(this.velocity - Ship.JUMP_FORCE, -Ship.MAX_UPWARDS_VELOCITY);
    }

    public crash(): void {
        if (!this.alive) {
            return;
        }
        this.velocity = 0;
        this.speed = 0;
        this.targetSpeed = 0;
        this.alive = false;
        ScreenShake.shake(0.85, 60, 40);
    }

    public update(dt: number): void {
        if (this.alive) {
            this.velocity += Ship.GRAVITY;
        }
        this.velocity *= Ship.FFRICTION;
        this.y += this.velocity;

        this.targetAngle = GameUtils.lerp(30, 0, GameUtils.clamp01((this.velocity + 25) / 40));
        this.angle = GameUtils.lerp(this.angle, this.targetAngle, 0.1);

        // this.targetSpeed = 5 + GameUtils.lerp(8, 0, GameUtils.clamp01((this.velocity + 25) / 40));
        this.speed = GameUtils.lerp(this.speed, this.targetSpeed * RenderManager.Instance.level.speedMultiplier, 0.1);
        this.distance += this.speed;

        if (this.y > RenderManager.Instance.stageHeight + this.height || this.y < -this.height) {
            this.crash();
        }
    }

}