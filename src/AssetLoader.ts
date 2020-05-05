import * as PIXI from 'pixi.js';
import { Sound } from './SoundManager';
import { SpriteID } from './Sprite';

export class AssetLoader {

    private static loading: boolean;

    private static loaded: boolean = false;
    private static spritesLoaded: boolean;
    private static audioLoaded: boolean;

    private static soundsToLoad: Sound[] = [];

    private static readonly pixiLoader: PIXI.Loader = new PIXI.Loader();

    private static loadedCallback: OnAssetsLoadedFunc;
    private static errorCallback: OnAssetsLoadErrorFunc;

    public static getTexture(spriteID: SpriteID): PIXI.Texture {
        console.log(AssetLoader.pixiLoader.resources);
        const sheet = AssetLoader.pixiLoader.resources['../assets/spritesheet.json'];
        sheet && console.log(sheet.textures);
        return sheet && sheet.textures ? sheet.textures[`${SpriteID[spriteID].toLowerCase()}.png`] : PIXI.Texture.WHITE;
    }

    public static load(onLoaded: OnAssetsLoadedFunc, onError: OnAssetsLoadErrorFunc): boolean {
        // Already loading/loaded
        if (AssetLoader.loaded || AssetLoader.loading) {
            return false;
        }
        AssetLoader.loading = true;

        AssetLoader.loadedCallback = onLoaded;
        AssetLoader.errorCallback = onError;

        AssetLoader.pixiLoader.add('../assets/spritesheet.json');

        AssetLoader.pixiLoader.load();
        AssetLoader.pixiLoader.on('complete', () => {
            console.info(`Sprites loaded.`);
            AssetLoader.spritesLoaded = true;
            AssetLoader.tryComplete();
        });
        AssetLoader.pixiLoader.on('error', (error, loader, resource) => {
            AssetLoader.handleError(error);
        });

        return true;
    }

    public static handleAudioLoading(sound: Sound, clip: Howl): void {
        AssetLoader.soundsToLoad.push(sound);
        clip.on('load', () => {
            const index = AssetLoader.soundsToLoad.indexOf(sound);
            if (index !== -1) {
                AssetLoader.soundsToLoad.splice(index, 1);
                if (AssetLoader.soundsToLoad.length === 0) {
                    console.info(`Audio loaded.`);
                    AssetLoader.audioLoaded = true;
                    AssetLoader.tryComplete();
                }
            }
        });
        clip.on('loaderror', (error: Error) => {
            AssetLoader.handleError(error);
        });
    }

    private static tryComplete(): void {
        if (AssetLoader.loaded || !AssetLoader.loading) {
            return;
        }
        if (!AssetLoader.spritesLoaded || !AssetLoader.audioLoaded) {
            return;
        }

        console.info(`Finished loading assets.`);
        AssetLoader.loading = false;
        AssetLoader.loaded = true;
        AssetLoader.loadedCallback();

    }

    private static handleError(err: Error): void {
        console.log(`Failed to load assets!`, err);
        AssetLoader.loading = false;
        AssetLoader.errorCallback(err);
    }

}

export type OnAssetsLoadedFunc = () => void;
export type OnAssetsLoadErrorFunc = (err: Error) => void;