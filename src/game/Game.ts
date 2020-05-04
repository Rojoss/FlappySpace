import { InputManager } from './InputManager';
import { RenderManager } from './rendering/RenderManager';
import { Levels } from '../levels/Levels';
import { ILevel } from '../levels/ILevel';
import { GameStage } from './rendering/GameStage';
import { GameConstants } from './GameConstants';
import { AnimationManager } from './animation/AnimationManager';
import { GameLoop } from './GameLoop';
import { GameState } from './GameState';
import { Gamecomponent } from './GameComponent';
import { store, GetState } from '../ui/react/store/Store';
import { setGameState, setCrystals, setGameStartTime, setGameLevelAction, setCurrentLevelStats } from '../ui/react/store/game/GameActions';
import { updateLevelDataAction } from '../ui/react/store/profile/ProfileActions';
import { ILevelData } from '../ui/react/store/profile/IProfile';
import { SoundManager, Sound } from '../SoundManager';

export class Game {

    private static INSTANCE: Game | undefined;

    private _levelID!: number;
    private _level!: ILevel;

    private _width: number = window.innerWidth;
    private _height: number = GameConstants.STAGE_HEIGHT;

    private _state: GameState = GameState.PRE_GAME;

    private _components: Gamecomponent[] = [];
    private _stage: GameStage;
    private _loop: GameLoop;
    private _renderManager: RenderManager;
    private _animationManager: AnimationManager;
    private _inputManager: InputManager;

    private _gameStartTime?: number;
    private _levelStats?: ILevelData;

    public static get Instance(): Game {
        if (!Game.INSTANCE) {
            throw new Error(`Trying to access game instance while there is none.`);
        }
        return Game.INSTANCE;
    }

    public static createGame(level: number): void {
        if (Game.INSTANCE) {
            return;
        }
        Game.INSTANCE = new Game(level);

        SoundManager.changeMusic(Sound.MUSIC);
    }

    public static destroyGame(): void {
        if (Game.INSTANCE) {
            Game.INSTANCE.destroy();
        }
    }

    constructor(level: number) {
        this.setLevel(level);

        this._stage = new GameStage(this);
        this._components.push(this._stage);
        this._loop = new GameLoop(this);
        this._components.push(this._loop);
        this._renderManager = new RenderManager(this);
        this._components.push(this._renderManager);
        this._animationManager = new AnimationManager(this);
        this._components.push(this._animationManager);
        this._inputManager = new InputManager(this);
        this._components.push(this._inputManager);
    }

    public destroy(): void {
        for (const component of this._components) {
            component.destroy();
        }
        this._components.length = 0;

        Game.INSTANCE = undefined;
    }

    // ---
    // FLOW

    private setLevel(level: number): void {
        this._levelID = level;
        this._level = Levels.get(level);

        store.dispatch(setGameLevelAction(level));
        this.onLevelLoad(this._levelID, this._level);

        SoundManager.changeAmbient(this._level.ambientSound);
    }

    public setState(state: GameState): void {
        const prevState = this._state;
        this._state = state;
        this.onStateChange(prevState, state);
        store.dispatch(setGameState(state));
        if (state === GameState.DEAD) {
            const survivalTime = this._gameStartTime ? Date.now() - this._gameStartTime : 0;
            store.dispatch(updateLevelDataAction({
                level: this.levelID,
                data: {
                    crystals: this.renderManager.crystals.collectedCrystalCount,
                    survivalTime
                }
            }));
        }
        if (state === GameState.PRE_GAME) {
            SoundManager.removeDeathFilter();
            store.dispatch(setCrystals(0));
            SoundManager.play(Sound.AMBIENT_BASE);
        }
        if (state === GameState.PLAYING) {
            SoundManager.play(Sound.SHIP_MOVE);
            this._gameStartTime = Date.now();
            store.dispatch(setGameStartTime(Date.now()));
        }
    }

    public restart(): void {
        this._levelStats = GetState().profile.levelData[this.levelID] ? { ...GetState().profile.levelData[this.levelID] } : { crystals: 0, survivalTime: 0 };
        store.dispatch(setCurrentLevelStats(this._levelStats));

        this.setState(GameState.PRE_GAME);
        store.dispatch(setGameStartTime(undefined));
    }

    public nextLevel(): void {
        this.setLevel(this._levelID + 1);
        this.restart();
    }

    public loadLevel(level: number): void {
        this.setLevel(level);
        this.restart();
    }

    // ---
    // EVENTS

    public onResize(width: number, height: number): void {
        this._width = width;
        this._height = height;

        for (const component of this._components) {
            component.onResize(width, height);
        }
    }

    public onStateChange(prevState: GameState, state: GameState): void {
        for (const component of this._components) {
            component.onStateChange(prevState, state);
        }
    }

    public onLevelLoad(levelID: number, level: ILevel): void {
        for (const component of this._components) {
            component.onLevelLoad(levelID, level);
        }
    }

    // ---
    // GETTERS


    public get level(): ILevel {
        return this._level;
    }

    public get levelID(): number {
        return this._levelID;
    }

    public get levelStats(): ILevelData | undefined {
        return this._levelStats;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public get state(): GameState {
        return this._state;
    }

    public get stage(): GameStage {
        return this._stage;
    }

    public get renderManager(): RenderManager {
        return this._renderManager;
    }

    public get animManager(): AnimationManager {
        return this._animationManager;
    }

    public get loop(): GameLoop {
        return this._loop;
    }

    public get inputManager(): InputManager {
        return this._inputManager;
    }

}