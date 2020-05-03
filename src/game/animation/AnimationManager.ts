import { Animation } from './Animation';
import { GameStage } from '../rendering/GameStage';
import { RenderManager } from '../rendering/RenderManager';

export class AnimationManager {

    private animations: Animation[] = [];

    private id: number = 1;
    private updateID: number;

    constructor(stage: GameStage) {
        this.updateID = stage.addToUpdate(this.update.bind(this));
    }

    public destroy(): void {
        RenderManager.Instance.stage.removeFromUpdate(this.updateID);
        for (let i = this.animations.length - 1; i >= 0; i--) {
            this.animations[i].onUnregistration();
            this.animations[i].registered = false;
        }
        this.animations.length = 0;
    }

    public registerAnimation(anim: Animation): number {
        this.id++;
        anim.id = this.id;
        anim.registered = true;
        this.animations.push(anim);
        return this.id;
    }

    public unregister(animID: number): void {
        const index = this.animations.findIndex((anim) => anim.id === animID);
        if (index !== -1) {
            this.animations[index].onUnregistration();
            this.animations[index].registered = false;
            this.animations.splice(index, 1);
        }
    }

    private update(): void {
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