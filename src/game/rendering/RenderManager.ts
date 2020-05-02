import { GameStage } from './GameStage';

export class RenderManager {

    private static INSTANCE: RenderManager | undefined;

    public stage: GameStage | undefined;

    public static get Instance(): RenderManager {
        if (RenderManager.INSTANCE === undefined) {
            RenderManager.INSTANCE = new RenderManager();
        }
        return RenderManager.INSTANCE;
    }

    public init(): void {
        this.stage = new GameStage();
    }

    public destroy(): void {

    }

}