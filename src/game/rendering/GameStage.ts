import * as PIXI from 'pixi.js';
import { Layer } from './Layer';
import { AutoScaler } from './AutoScaler';
import { Background } from '../background/Background';
import { Game } from '../Game';
import { Gamecomponent } from '../GameComponent';
import { ILevel } from '../../levels/ILevel';

export class GameStage extends Gamecomponent {

    private _renderer!: PIXI.Renderer;
    private _stage!: PIXI.Container;

    public scene!: PIXI.Container;
    private layerMap!: ILayerMap;
    private background!: Background;

    public autoScaler!: AutoScaler;

    constructor(game: Game) {
        super(game);
        const canvas = this.getCanvas();
        if (!canvas) {
            throw new Error(`Tried to initialize rendering stage but no canvas was found!`);
        }

        this.createRenderer(canvas);
        this.createStage();
        this.autoScaler = new AutoScaler(game);

        this.createBackground(game);
        this.createScene();
        this.createLayers();

        console.info('Render stage initialized!');
    }

    public destroy(): void {
        delete this.game;
    }

    public onResize(width: number, height: number): void {
        this.background.onResize(width, height);
    }

    public onLevelLoad(levelID: number, level: ILevel): void {
        this.background.onLevelLoad(levelID, level);
    }

    public renderStage(): void {
        this.renderer.render(this.stage);
    }

    public get renderer(): PIXI.Renderer {
        return this._renderer;
    }

    private createRenderer(canvas: HTMLCanvasElement): PIXI.Renderer {
        PIXI.settings.CAN_UPLOAD_SAME_BUFFER = false;

        this._renderer = new PIXI.Renderer({
            width: window.innerWidth,
            height: window.innerHeight,
            view: canvas,
            powerPreference: 'high-performance',
            backgroundColor: 0xffffff
        });

        this._renderer.plugins.interaction.destroy();
        this._renderer.plugins.accessibility.destroy();
        this._renderer.plugins.extract.destroy();
        this._renderer.plugins.prepare.destroy();
        delete this._renderer.plugins.interaction;
        delete this._renderer.plugins.accessibility;
        delete this._renderer.plugins.extract;
        delete this._renderer.plugins.prepare;

        return this._renderer;
    }

    public get stage(): PIXI.Container {
        return this._stage;
    }

    private createStage(): void {
        this._stage = new PIXI.Container();
        this._stage.name = 'Game Stage';
    }

    public getCanvas(): HTMLCanvasElement | undefined {
        return document.getElementById('game-canvas') as HTMLCanvasElement;
    }

    private createScene(): void {
        this.scene = new PIXI.Container;
        this.scene.name = 'Game Scene';
        this.stage.addChild(this.scene);
    }

    private createLayers(): void {
        // Push all layer-values from the Layer class in a list.
        const layers = [];
        for (const l in Layer) {
            if (Layer.hasOwnProperty(l)) {
                layers.push((Layer as any)[l]);
            }
        }
        // Sort the layer-version based on their value.
        layers.sort((l0: number, l1: number) => { return l0 - l1; });

        // Create a container for each layer and add them to the scene.
        this.layerMap = {};
        for (const layer of layers) {
            const container = new PIXI.Container();
            container.name = `LAYER ${layer}`;
            this.layerMap[layer] = container;
            this.scene.addChild(container);
        }
    }

    private createBackground(game: Game): void {
        this.background = new Background(this, game.level.bgTopColor, game.level.bgBottomClr);
        this.stage.addChild(this.background);
    }

    public addToScene(layer: number, obj: PIXI.DisplayObject, addToBack?: boolean): void {
        (obj as any)['sceneLayer'] = layer;
        if (!addToBack) {
            this.layerMap[layer].addChild(obj);
        } else {
            this.layerMap[layer].addChildAt(obj, 0);
        }
    }

    public removeFromScene(obj: PIXI.DisplayObject): void {
        if (obj && obj.hasOwnProperty('sceneLayer')) {
            this.layerMap[(obj as any)['sceneLayer']].removeChild(obj);
            delete (obj as any)['sceneLayer'];
        }
    }

    public getLayerContainer(layer: number): PIXI.Container {
        return this.layerMap[layer];
    }
}

interface ILayerMap {
    [layer: number]: PIXI.Container;
}