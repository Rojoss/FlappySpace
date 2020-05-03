import * as PIXI from 'pixi.js';
import { RenderManager } from '../rendering/RenderManager';
import { EaseMode, Ease } from './Ease';
import { GameUtils } from '../utils/GameUtils';

export type AnimationTarget = PIXI.Sprite | PIXI.Graphics;

export class Animation {

    public id?: number;
    public registered: boolean = false;

    public startTime: number | undefined;

    public duration: number = 1000;
    protected baseDuration: number = 1000;
    protected speed: number = 1;
    public reversed: boolean = false;

    public easeMode: EaseMode = EaseMode.LINEAR;
    public startValue: number = 0;
    public endValue: number = 1;

    public playCount: number = 0;

    /** Called when the animation is started with #start() */
    public onStarted?: (time: number) => void;
    /** Called when the animation is stopped with #stop() or destroyed */
    public onStopped?: (time: number) => void;
    /** Called when the animation is completed, if it returns false the animation is not reset and can be started again. */
    public onComplete?: (time: number) => boolean;
    /** Called when the animation is reset, which is after #onStopped() and #onComplete() is called */
    public onReset?: (time: number) => void;
    /** Called when the animation is running */
    public onStep?: (time: number, progress: number, value: number) => void;

    constructor(easeMode: EaseMode, duration: number, startValue: number = 0, endValue: number = 1) {

        this.easeMode = easeMode;
        this.startValue = startValue;
        this.endValue = endValue;
        this.setDuration(duration);
    }

    public onUnregistration(): void {
        this.startTime = undefined;
        this.onStopped && this.onStopped(Date.now());
        this.onReset && this.onReset(Date.now());
    }

    // ---

    public start(delay: number = 0, changeDirection: boolean = false): Animation {
        if (!this.id) {
            this.id = RenderManager.Instance.animManager.registerAnimation(this);
            this.registered = true;
        }

        this.playCount++;
        this.reversed = changeDirection ? !this.reversed : this.reversed;
        this.startTime = Date.now() + delay;
        if (delay === 0) {
            this.step(Date.now());
        }
        return this;
    }

    public stop(): void {
        this.startTime = undefined;
        this.onStopped && this.onStopped(Date.now());
        this.onReset && this.onReset(Date.now());
        this.id && RenderManager.Instance.animManager.unregister(this.id);
    }

    public complete(): void {
        this.startTime = undefined;

        let reset: boolean = true;
        if (this.onComplete && this.onComplete(Date.now()) === false) {
            reset = false;
        }
        if (reset) {
            this.onReset && this.onReset(Date.now());
            this.id && RenderManager.Instance.animManager.unregister(this.id);
        }
    }

    public step(time: number): void {
        if (this.startTime === undefined) {
            return;
        }

        if (!this.isPlaying(time) && time >= this.startTime && time <= this.startTime + this.duration) {
            this.onStarted && this.onStarted(this.startTime);
        }

        if (this.startTime > time) {
            return;
        }

        const timePassed = this.getTimePassed(time);
        const progress = this.getProgress(timePassed);
        const easedProgress = Ease.ease(this.easeMode, progress);
        const value = GameUtils.lerp(this.startValue, this.endValue, easedProgress);

        this.onStep && this.onStep(Date.now(), easedProgress, value);

        if ((!this.reversed && progress >= 1) || (this.reversed && progress <= 0)) {
            this.complete();
        }
    }

    // ---

    public setSpeed(speed: number): Animation {
        this.speed = speed;
        this.updateDuration();
        return this;
    }

    public setDuration(duration: number): Animation {
        this.baseDuration = Math.max(duration, Number.EPSILON);
        this.updateDuration();
        return this;
    }

    private updateDuration(): void {
        this.duration = Math.ceil(this.baseDuration / Math.max(this.speed, Number.EPSILON));
    }

    public getProgress(time: number): number {
        const progress = time / this.duration;
        if (this.reversed) {
            return 1 - progress;
        }
        return progress;
    }

    public getTimePassed(time: number): number {
        if (!this.startTime) {
            return 0;
        }
        return GameUtils.clamp(time - this.startTime, 0, this.duration);
    }

    public isPlaying(time: number): boolean {
        return this.startTime !== undefined && time >= this.startTime && time <= this.startTime + this.duration;
    }



}