import * as PIXI from 'pixi.js';
import { GameStage } from '../rendering/GameStage';
import { Layer } from '../rendering/Layer';
import { RenderManager } from '../rendering/RenderManager';

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
            if (distance < (shipRadius + planetRadius) * (shipRadius + planetRadius)) {
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
        crystal.x = x;
        crystal.y = y;
        crystal.alpha = 0.75;
        crystal.visible = true;
        crystal.anchor.set(0.5);
        this.addChild(crystal);
        this.crystals.push(crystal);
    }

    public pickupCrystal(crystal: PIXI.Sprite, index: number): void {
        this.removeCrystal(crystal, index);
    }

    public missedCrystal(crystal: PIXI.Sprite, index: number): void {
        this.removeCrystal(crystal, index);
    }

    private removeCrystal(crystal: PIXI.Sprite, index: number): void {
        crystal.visible = false;
        this.crystals.splice(index, 1);
        this.pooledCrystals.push(crystal);
    }

}