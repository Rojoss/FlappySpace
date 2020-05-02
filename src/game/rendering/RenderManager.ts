import { GameStage } from './GameStage';
import { Ship } from '../ship/Ship';
import { GameConstants } from '../GameConstants';
import { Background } from '../background/Background';

export class RenderManager {

    private static INSTANCE: RenderManager | undefined;

    public initialized: boolean = false;
    public stage!: GameStage;
    public stageWidth: number = window.innerWidth;
    public stageHeight: number = GameConstants.STAGE_HEIGHT;

    private background!: Background;
    public ship!: Ship;

    public static get Instance(): RenderManager {
        if (RenderManager.INSTANCE === undefined) {
            RenderManager.INSTANCE = new RenderManager();
        }
        return RenderManager.INSTANCE;
    }

    public init(): void {
        this.stage = new GameStage();

        this.background = new Background(this.stage, '#731337', '#201725');
        this.ship = new Ship(this.stage);

        this.initialized = true;
    }

    public destroy(): void {
        if (!this.initialized) {
            return;
        }
        this.ship.destroy();
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