import * as PIXI from 'pixi.js';
import { Layer } from './Layer';
import { AutoScaler } from './AutoScaler';

export class GameStage {

    public app!: PIXI.Application;
    public scene!: PIXI.Container;

    private layerMap!: ILayerMap;

    private updateMap: ITickerMap = {};
    private updateID: number = 0;

    public autoScaler!: AutoScaler;

    constructor() {
        const canvas = this.getCanvas();
        if (!canvas) {
            throw new Error(`Tried to initialize rendering stage but no canvas was found!`);
        }
        this.app = this.createApp(canvas);

        this.createScene();
        this.createLayers();

        this.autoScaler = new AutoScaler(this);

        console.info('Render stage initialized!');
    }

    public createApp(canvas: HTMLCanvasElement): PIXI.Application {
        const app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            view: canvas,
            powerPreference: 'high-performance',
            backgroundColor: 0xffffff
        });

        // PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        PIXI.settings.CAN_UPLOAD_SAME_BUFFER = false;

        app.renderer.plugins.interaction.destroy();
        app.renderer.plugins.accessibility.destroy();
        app.renderer.plugins.extract.destroy();
        app.renderer.plugins.prepare.destroy();
        delete app.renderer.plugins.interaction;
        delete app.renderer.plugins.accessibility;
        delete app.renderer.plugins.extract;
        delete app.renderer.plugins.prepare;
        return app;
    }

    public getCanvas(): HTMLCanvasElement | undefined {
        return document.getElementById('game-canvas') as HTMLCanvasElement;
    }

    private createScene(): void {
        this.scene = new PIXI.Container;
        this.scene.name = 'Game Scene';
        this.app.stage.addChild(this.scene);
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

    public addToUpdate(callback: (delta: number) => void): number {
        const id = this.updateID++;
        const timeFunc = (dt: number) => {
            callback(dt / 60);
        };
        this.updateMap[id] = timeFunc;
        this.app && this.app.ticker.add(timeFunc);
        return id;
    }

    public removeFromUpdate(id: number): void {
        const fn = this.updateMap[id];
        if (fn !== undefined) {
            this.app && this.app.ticker.remove(fn);
        }
        delete this.updateMap[id];
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

    public getScreen(): PIXI.Rectangle {
        return this.app.screen;
    }
}

interface ILayerMap {
    [layer: number]: PIXI.Container;
}

interface ITickerMap {
    [id: number]: (dt: number) => void;
}