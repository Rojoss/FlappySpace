import * as PIXI from 'pixi.js';
import { GameStage } from '../rendering/GameStage';
import { Layer } from '../rendering/Layer';
import { RenderManager } from '../rendering/RenderManager';
import { EaseMode } from '../animation/Ease';
import { Animation } from '../animation/Animation';
import { GameUtils } from '../utils/GameUtils';

export class Crystals extends PIXI.Container {

    private static readonly TEXTURE: PIXI.Texture = PIXI.Texture.from('/assets/sprites/crystal.png');

    private updateID: number;

    private crystals: PIXI.Sprite[] = [];
    private pooledCrystals: PIXI.Sprite[] = [];

    constructor(stage: GameStage) {
        super();
        this.updateID = stage.addToUpdate(this.update.bind(this));

        stage.addToScene(Layer.CRYSTALS, this);
    }

    public destroy(): void {
        super.destroy();
        RenderManager.Instance.stage.removeFromUpdate(this.updateID);
    }

    public restart(): void {
        for (let i = this.crystals.length - 1; i >= 0; i--) {
            this.removeCrystal(this.crystals[i], i);
        }
    }

    private update(): void {
        const ship = RenderManager.Instance.ship;

        for (let i = this.crystals.length - 1; i >= 0; i--) {
            const crystal = this.crystals[i];

            const speed = ship.speed;
            crystal.x -= speed;

            const distance = (ship.x - crystal.x) * (ship.x - crystal.x) + (ship.y + ship.collisionOffsetY - crystal.y) * (ship.y + ship.collisionOffsetY - crystal.y);
            const planetRadius = crystal.height / 2;
            const shipRadius = ship.collisionSize / 2;
            if ((crystal as any)['active'] && distance < (shipRadius + planetRadius) * (shipRadius + planetRadius)) {
                this.pickupCrystal(crystal, i);
            }

            if (crystal.x + crystal.width < 0) {
                this.missedCrystal(crystal, i);
            }
        }
    }

    public createCrystal(x: number, y: number): void {
        let crystal: PIXI.Sprite;
        if (this.pooledCrystals.length > 0) {
            crystal = this.pooledCrystals[this.pooledCrystals.length - 1];
            this.pooledCrystals.splice(this.pooledCrystals.length - 1, 1);
        } else {
            crystal = new PIXI.Sprite(Crystals.TEXTURE);
        }
        (crystal as any)['active'] = false;
        crystal.x = x;
        crystal.y = y;
        (crystal as any)['baseY'] = y;
        crystal.alpha = 0;
        crystal.scale.set(0);
        crystal.visible = true;
        crystal.anchor.set(0.5);
        this.addChild(crystal);
        this.crystals.push(crystal);

        const anim = new Animation(EaseMode.OUT_ELASTIC, 1000, 0, 0.75);
        anim.onStep = (time: number, progress: number, value: number) => {
            crystal.scale.set(progress);
            crystal.alpha = value;
        };
        anim.onReset = () => {
            crystal.scale.set(1);
            crystal.alpha = 0.75;
            (crystal as any)['active'] = true;
        };
        anim.start();

        const bounceAnim = new Animation(EaseMode.IN_OUT_SINE, 1000, 0, 50);
        bounceAnim.onStep = (time: number, progress: number, value: number) => {
            crystal.y = (crystal as any)['baseY'] + value;
        };
        bounceAnim.onComplete = () => {
            bounceAnim.start(0, true);
            return false;
        };
        bounceAnim.start(Math.random() * 500);

    }

    public pickupCrystal(crystal: PIXI.Sprite, index: number): void {
        (crystal as any)['active'] = false;
        const anim = new Animation(EaseMode.IN_BACK, 250, 1, 0);
        anim.onStep = (time: number, progress: number, value: number) => {
            crystal.scale.set(value);
            crystal.alpha = GameUtils.lerp(0.75, 0, progress);
        };
        anim.onReset = () => {
            if (!(crystal as any)['active'] && crystal.visible) {
                this.removeCrystal(crystal);
            }
        };
        anim.start();
    }

    public missedCrystal(crystal: PIXI.Sprite, index: number): void {
        this.removeCrystal(crystal, index);
    }

    private removeCrystal(crystal: PIXI.Sprite, index?: number): void {
        crystal.visible = false;
        this.crystals.splice(index !== undefined ? index : this.crystals.indexOf(crystal), 1);
        this.pooledCrystals.push(crystal);
    }

}