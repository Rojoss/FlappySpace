import { GameStage } from './GameStage';
import { Ship } from '../ship/Ship';
import { GameConstants } from '../GameConstants';
import { Levels } from '../../levels/Levels';
import { ILevel } from '../../levels/ILevel';
import { Planets } from '../planets/Planets';
import { Stars } from '../background/Stars';
import { Crystals } from '../crystals/Crystals';
import { AnimationManager } from '../animation/AnimationManager';

export class RenderManager {

    private static INSTANCE: RenderManager | undefined;

    public initialized: boolean = false;
    public stage!: GameStage;
    public stageWidth: number = window.innerWidth;
    public stageHeight: number = GameConstants.STAGE_HEIGHT;

    public level!: ILevel;

    public animManager!: AnimationManager;

    public crystals!: Crystals;
    public planets!: Planets;
    public ship!: Ship;
    public stars!: Stars;

    public static get Instance(): RenderManager {
        if (RenderManager.INSTANCE === undefined) {
            RenderManager.INSTANCE = new RenderManager();
        }
        return RenderManager.INSTANCE;
    }

    public init(): void {
        this.level = Levels.get(1 + Math.floor(Math.random() * Levels.count));

        this.stage = new GameStage(this);

        this.animManager = new AnimationManager(this.stage);
        this.crystals = new Crystals(this.stage);
        this.planets = new Planets(this.stage);
        this.ship = new Ship(this.stage);
        this.stars = new Stars(this.stage);

        this.initialized = true;
    }

    public destroy(): void {
        if (!this.initialized) {
            return;
        }
        this.stars.destroy();
        this.ship.destroy();
        this.planets.destroy();
        this.crystals.destroy();
        this.animManager.destroy();

        this.initialized = false;
    }

    public setStageSize(width: number, height: number): void {
        this.stageWidth = width;
        this.stageHeight = height;

        if (!this.initialized) {
            return;
        }

        this.stage.setStageSize(width, height);
        this.stars.onStageResize(width, height);
    }

}