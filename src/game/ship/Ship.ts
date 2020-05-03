import * as PIXI from 'pixi.js';
import { Layer } from '../rendering/Layer';
import { GameUtils } from '../utils/GameUtils';
import { Game } from '../Game';
import { IUpdateable } from '../GameLoop';
import { GameState } from '../GameState';

export class Ship extends PIXI.Container implements IUpdateable {

    private static readonly TEXTURE: PIXI.Texture = PIXI.Texture.from('/assets/sprites/ship.png');
    private static readonly TEXTURE_DEAD: PIXI.Texture = PIXI.Texture.from('/assets/sprites/ship_dead.png');

    private static readonly GRAVITY: number = 1.3;
    private static readonly FFRICTION: number = 0.98;
    private static readonly JUMP_FORCE: number = 40;
    private static readonly MAX_UPWARDS_VELOCITY: number = 40;
    private static readonly X_POS: number = 300;
    private static readonly DEFAULT_SPEED: number = 6;

    private game: Game;
    public updateID: number;

    private shipSprite!: PIXI.Sprite;

    public collisionOffsetY: number = 15;
    public collisionSize: number = 60;

    private velocity: number = Ship.GRAVITY;
    public speed: number = 0;
    private targetSpeed: number = 0;
    private targetAngle: number = 0;

    public alive: boolean = false;
    public distance: number = 0;

    private brokenShips: PIXI.Sprite[] = [];

    constructor(game: Game) {
        super();
        this.game = game;

        this.x = Ship.X_POS;
        this.y = game.height / 2;

        this.initArt();

        game.stage.addToScene(Layer.SHIP, this);
        this.updateID = game.loop.addToUpdate(this);
    }

    public destroy(): void {
        this.game.loop.removeFromUpdate(this.updateID);
        delete this.game;
        super.destroy();
    }

    private initArt(): void {
        this.shipSprite = new PIXI.Sprite(Ship.TEXTURE);
        this.shipSprite.anchor.set(0.5);
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

    public jump(multiplier: number = 1): void {
        if (!this.alive) {
            return;
        }
        this.velocity = Math.max(this.velocity - (Ship.JUMP_FORCE * multiplier), -Ship.MAX_UPWARDS_VELOCITY);
    }

    public onStateChange(prevState: GameState, state: GameState): void {
        if (state === GameState.PRE_GAME) {
            this.game.renderManager.flashEffect.flash(0x000000, 0, 1000, 1);

            this.x = Ship.X_POS;
            this.y = this.game.height / 2;
            this.shipSprite.alpha = 1;
            this.distance = 0;
            this.speed = 0;
            this.targetSpeed = 0;

            if (this.brokenShips.length > 0) {
                this.brokenShips[this.brokenShips.length - 1].tint = 0x000000;
                this.brokenShips[this.brokenShips.length - 1].alpha = 0.2;
            }
        }
        if (state === GameState.PLAYING && !this.alive) {
            this.alive = true;
            this.jump(0.5);
            this.targetSpeed = Ship.DEFAULT_SPEED;
        }
    }

    public crash(planet: boolean = true): void {
        if (!this.alive) {
            return;
        }
        this.velocity = 0;
        this.speed = 0;
        this.targetSpeed = 0;
        this.alive = false;
        this.shipSprite.alpha = 0;
        this.game.renderManager.shakeEffect.shake(0.85, 60, 40);
        this.game.renderManager.flashEffect.flash(parseInt(this.game.level.bgTopColor, 16), 20, 250, 0.3);
        this.game.setState(GameState.DEAD);

        if (planet) {
            const crashedShip = new PIXI.Sprite(Ship.TEXTURE_DEAD);
            crashedShip.anchor.set(0.5);
            crashedShip.tint = 0x666666;
            crashedShip.alpha = 0.8;
            crashedShip.x = this.distance;
            crashedShip.y = this.y;
            crashedShip.angle = this.angle;
            this.brokenShips.push(crashedShip);
            this.game.stage.addToScene(Layer.BROKEN_SHIPS, crashedShip);
        }
    }

    public update(dt: number): void {
        if (this.alive) {
            this.velocity += Ship.GRAVITY;
            this.velocity *= Ship.FFRICTION;
            this.y += this.velocity;
        }

        this.targetAngle = GameUtils.lerp(0, 30, GameUtils.clamp01(this.velocity / 40));
        this.angle = GameUtils.lerp(this.angle, this.targetAngle, 0.1);

        // this.targetSpeed = 5 + GameUtils.lerp(8, 0, GameUtils.clamp01((this.velocity + 25) / 40));
        this.speed = GameUtils.lerp(this.speed, this.targetSpeed * this.game.level.speedMultiplier, 0.1);
        this.distance += this.speed;

        this.game.stage.getLayerContainer(Layer.BROKEN_SHIPS).x = 300 - this.distance;

        if (this.y > this.game.height + this.height || this.y < -this.height) {
            this.crash(false);
        }
    }

}