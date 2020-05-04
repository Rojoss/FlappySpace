import { GameConstants } from '../GameConstants';
import { Game } from '../Game';

export class AutoScaler {

    private game: Game;

    private timeoutHandler!: number;
    private boundDebouncedResizeHandler: any;

    constructor(game: Game) {
        this.game = game;

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

        delete this.game;
    }

    public onResize(): void {
        this.scale();
        window.scrollTo(0, 0);
    }

    private scale(): void {
        const canvas = this.game.stage.getCanvas();
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
        this.game.stage.renderer.resize(width, height);
        this.game.stage.scene.scale.set(scale);

        this.game.onResize(width / scale, GameConstants.STAGE_HEIGHT);
    }
}
