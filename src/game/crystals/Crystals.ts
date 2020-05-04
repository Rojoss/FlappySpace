import * as PIXI from 'pixi.js';
import { Layer } from '../rendering/Layer';
import { EaseMode } from '../animation/Ease';
import { Animation } from '../animation/Animation';
import { GameUtils } from '../utils/GameUtils';
import { Game } from '../Game';
import { IUpdateable } from '../GameLoop';
import { store } from '../../ui/react/store/Store';
import { addCrystal } from '../../ui/react/store/game/GameActions';
import { GameState } from '../GameState';
import { SoundManager, Sound } from '../../SoundManager';

export class Crystals extends PIXI.Container implements IUpdateable {

    private static readonly TEXTURE: PIXI.Texture = PIXI.Texture.from('/assets/sprites/crystal.png');
    private static readonly TEXTURE_OLD: PIXI.Texture = PIXI.Texture.from('/assets/sprites/crystal_old.png');

    private game: Game;
    public updateID: number;

    public collectedCrystalCount: number = 0;

    private crystals: PIXI.Sprite[] = [];
    private pooledCrystals: PIXI.Sprite[] = [];

    private newRecord: boolean = false;

    constructor(game: Game) {
        super();
        this.game = game;

        this.newRecord = game.levelStats === undefined || game.levelStats.crystals === 0;

        this.updateID = game.loop.addToUpdate(this);
        game.stage.addToScene(Layer.CRYSTALS, this);
    }

    public destroy(): void {
        this.game.loop.removeFromUpdate(this.updateID);
        delete this.game;
        super.destroy();
    }

    public onStateChange(prevState: GameState, state: GameState): void {
        if (state === GameState.PRE_GAME) {
            this.collectedCrystalCount = 0;
            this.restart();
        }
    }

    public restart(): void {
        for (let i = this.crystals.length - 1; i >= 0; i--) {
            this.removeCrystal(this.crystals[i], i);
        }
    }

    public update(dt: number): void {
        const ship = this.game.renderManager.ship;

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

    private checkForNewRecord(): void {
        const newRecord = this.game.levelStats === undefined || this.collectedCrystalCount >= this.game.levelStats.crystals;
        if (this.newRecord !== newRecord) {
            for (const crystal of this.crystals) {
                crystal.texture = newRecord ? Crystals.TEXTURE : Crystals.TEXTURE_OLD;
            }
            this.newRecord = newRecord;
            if (this.collectedCrystalCount > 0 && newRecord === true) {
                SoundManager.play(Sound.GEM_CHANGE);
            }
        }
    }

    public createCrystal(x: number, y: number): void {
        let crystal: PIXI.Sprite;
        if (this.pooledCrystals.length > 0) {
            crystal = this.pooledCrystals[this.pooledCrystals.length - 1];
            this.pooledCrystals.splice(this.pooledCrystals.length - 1, 1);
            crystal.texture = this.newRecord ? Crystals.TEXTURE : Crystals.TEXTURE_OLD;
        } else {
            crystal = new PIXI.Sprite(this.newRecord ? Crystals.TEXTURE : Crystals.TEXTURE_OLD);
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
        (crystal as any)['bounceAnim'] = bounceAnim;

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

        this.collectedCrystalCount++;
        store.dispatch(addCrystal());
        if (this.newRecord) {
            SoundManager.playWithRandomPitch(Sound.GEM_PICKUP);
        } else {
            SoundManager.playWithRandomPitch(Sound.GEM_OLD_PICKUP);
        }
    }

    public missedCrystal(crystal: PIXI.Sprite, index: number): void {
        this.removeCrystal(crystal, index);
    }

    private removeCrystal(crystal: PIXI.Sprite, index?: number): void {
        crystal.visible = false;
        this.crystals.splice(index !== undefined ? index : this.crystals.indexOf(crystal), 1);
        this.pooledCrystals.push(crystal);
        (crystal as any)['bounceAnim'].stop();
        (crystal as any)['bounceAnim'] = undefined;

        this.checkForNewRecord();
    }

}