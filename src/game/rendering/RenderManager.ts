import { GameStage } from './GameStage';
import { Ship } from '../ship/Ship';

export class RenderManager {

    private static INSTANCE: RenderManager | undefined;

    public stage!: GameStage;

    private ship!: Ship;

    public static get Instance(): RenderManager {
        if (RenderManager.INSTANCE === undefined) {
            RenderManager.INSTANCE = new RenderManager();
        }
        return RenderManager.INSTANCE;
    }

    public init(): void {
        this.stage = new GameStage();

        this.ship = new Ship(this.stage);
    }

    public destroy(): void {
        this.ship.destroy();
    }

}