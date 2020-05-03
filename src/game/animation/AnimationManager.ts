import { Animation } from './Animation';
import { Game } from '../Game';
import { IUpdateable } from '../GameLoop';
import { Gamecomponent } from '../GameComponent';

export class AnimationManager extends Gamecomponent implements IUpdateable {

    private animations: Animation[] = [];

    private id: number = 1;
    public updateID: number;

    constructor(game: Game) {
        super(game);
        this.updateID = game.loop.addToUpdate(this);
    }

    public destroy(): void {
        this.game.loop.removeFromUpdate(this.updateID);

        for (let i = this.animations.length - 1; i >= 0; i--) {
            this.animations[i].onUnregistration(false);
            this.animations[i].registered = false;
        }
        this.animations.length = 0;

        delete this.game;
    }

    public registerAnimation(anim: Animation): number {
        this.id++;
        anim.id = this.id;
        anim.registered = true;
        this.animations.push(anim);
        return this.id;
    }

    public unregister(animID: number, fromReset: boolean = false): void {
        const index = this.animations.findIndex((anim) => anim.id === animID);
        if (index !== -1) {
            this.animations[index].onUnregistration(fromReset);
            this.animations[index].registered = false;
            this.animations.splice(index, 1);
        }
    }

    public update(timeElapsed: number): void {
        const now = Date.now();
        for (let i = this.animations.length - 1; i >= 0; i--) {
            const anim = this.animations[i];
            if (!anim) {
                continue;
            }
            anim.step(now);
        }
    }

}