import { Game } from './Game';
import { Gamecomponent } from './GameComponent';
import { GameState } from './GameState';

export class InputManager extends Gamecomponent {

    constructor(game: Game) {
        super(game);

        const useTouch = 'ontouchstart' in document.documentElement;
        if (useTouch) {
            this.touchStartEvent = this.touchStartEvent.bind(this);
            window.addEventListener('touchstart', this.touchStartEvent);
        } else {
            this.mouseDownEvent = this.mouseDownEvent.bind(this);
            window.addEventListener('mousedown', this.mouseDownEvent);
        }
        this.keyDownEvent = this.keyDownEvent.bind(this);
        window.addEventListener('keydown', this.keyDownEvent);
    }

    public destroy(): void {
        window.removeEventListener('mousedown', this.mouseDownEvent);
        window.removeEventListener('keydown', this.keyDownEvent);

        delete this.game;
    }

    private mouseDownEvent(): void {
        this.handleMainAction();
    }

    private touchStartEvent(): void {
        this.handleMainAction();
    }

    private keyDownEvent(event: KeyboardEvent): void {
        if (event.keyCode === 32) {
            this.handleMainAction();
        }
    }

    private handleMainAction(): void {
        if (this.game.state === GameState.PRE_GAME) {
            this.game.setState(GameState.PLAYING);
        } else if (this.game.state === GameState.PLAYING) {
            this.game.renderManager.ship.jump();
        }
    }
}