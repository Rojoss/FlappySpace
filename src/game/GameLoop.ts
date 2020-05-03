import { Game } from './Game';
import { Gamecomponent } from './GameComponent';

export class GameLoop extends Gamecomponent {

    private static readonly FPS: number = 60;
    private static readonly MSPF: number = 1000 / GameLoop.FPS;

    private updateID: number = 1;
    private updateList: IUpdateable[] = [];

    private running: boolean = false;

    private lastUpdateTime: number = 0;
    private timeElapsed: number = 0;
    private timeToRender: number = 0;

    constructor(game: Game) {
        super(game);
        this.update = this.update.bind(this);
        this.start();
    }

    public destroy(): void {
        this.running = false;
        this.updateList.length = 0;
        delete this.game;
    }

    public start(): void {
        this.running = true;

        this.lastUpdateTime = Date.now();
        window.requestAnimationFrame(this.update);
    }

    public stop(): void {
        this.running = false;
    }

    public addToUpdate(updateable: IUpdateable): number {
        updateable.updateID = this.updateID++;
        this.updateList.push(updateable);
        return updateable.updateID;
    }

    public removeFromUpdate(updateID: number): boolean {
        const index = this.updateList.findIndex((u) => u.updateID === updateID);
        if (index !== -1) {
            this.updateList.splice(index, 1);
            return true;
        }
        return false;
    }

    private update(): void {
        if (!this.running) {
            return;
        }
        const time = Date.now();
        const dt = time - this.lastUpdateTime;
        this.lastUpdateTime = time;

        this.timeElapsed += dt;
        this.timeToRender += dt;

        while (this.timeToRender >= GameLoop.MSPF) {
            for (const updateable of this.updateList) {
                updateable.update(this.timeElapsed);
            }
            this.timeToRender -= GameLoop.MSPF;
        }

        this.game.stage.renderStage();

        window.requestAnimationFrame(this.update);
    }

}

export type UpdateFunction = (timeElapsed: number) => void;

export interface IUpdateable {
    updateID: number;
    update: UpdateFunction;
}