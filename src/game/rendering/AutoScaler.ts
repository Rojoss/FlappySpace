import { GameStage } from './GameStage';
import { GameConstants } from '../GameConstants';
import { RenderManager } from './RenderManager';

export class AutoScaler {

    private stage: GameStage;

    private timeoutHandler!: number;
    private boundDebouncedResizeHandler: any;

    constructor(stage: GameStage) {
        this.stage = stage;

        this.onResize();
        window.setTimeout(() => {
            this.onResize();
        }, 1);

        this.boundDebouncedResizeHandler = this.debouncedResizeHandler.bind(this);
        window.addEventListener('resize', this.boundDebouncedResizeHandler);
    }

    public debouncedResizeHandler(): void {
        clearTimeout(this.timeoutHandler);
        this.timeoutHandler = window.setTimeout(() => {
            this.onResize();
        }, 100);
    }

    public destroy(): void {
        window.removeEventListener('resize', this.boundDebouncedResizeHandler);
        window.clearTimeout(this.timeoutHandler);
    }

    public onResize(): void {
        this.scale();
        window.scrollTo(0, 0);
    }

    private scale(): void {
        const canvas = this.stage.getCanvas();
        if (!canvas) {
            console.warn('Unable to scale the game because there is no canvas..');
            return;
        }

        const windowHeight = window.innerHeight;
        const desiredHeight = GameConstants.STAGE_HEIGHT;
        const scale = windowHeight / desiredHeight;

        const width = window.innerWidth;
        const height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;
        this.stage.app.renderer.resize(width, height);
        this.stage.scene.scale.set(scale);

        RenderManager.Instance.setStageSize(width / scale, GameConstants.STAGE_HEIGHT);
    }
}
