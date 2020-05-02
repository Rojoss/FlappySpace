import { GameStage } from './GameStage';
import { Ship } from '../ship/Ship';
import { GameConstants } from '../GameConstants';
import { Background } from '../background/Background';
import { Levels } from '../../levels/Levels';
import { ILevel } from '../../levels/ILevel';
import { Planets } from '../planets/Planets';

export class RenderManager {

    private static INSTANCE: RenderManager | undefined;

    public initialized: boolean = false;
    public stage!: GameStage;
    public stageWidth: number = window.innerWidth;
    public stageHeight: number = GameConstants.STAGE_HEIGHT;

    public level!: ILevel;

    private background!: Background;
    public planets!: Planets;
    public ship!: Ship;

    public static get Instance(): RenderManager {
        if (RenderManager.INSTANCE === undefined) {
            RenderManager.INSTANCE = new RenderManager();
        }
        return RenderManager.INSTANCE;
    }

    public init(): void {
        this.stage = new GameStage();

        this.level = Levels.get(1 + Math.floor(Math.random() * Levels.count));

        this.background = new Background(this.stage, this.level.bgTopColor, this.level.bgBottomClr);
        this.planets = new Planets(this.stage);
        this.ship = new Ship(this.stage);

        this.initialized = true;
    }

    public destroy(): void {
        if (!this.initialized) {
            return;
        }
        this.ship.destroy();
        this.planets.destroy();
        this.background.destroy();

        this.initialized = false;
    }

    public setStageSize(width: number, height: number): void {
        this.stageWidth = width;
        this.stageHeight = height;

        if (!this.initialized) {
            return;
        }
        this.background.onStageResize(width, height);
    }

}