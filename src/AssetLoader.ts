import * as PIXI from 'pixi.js';
import { SPRITE_PATHS, SpriteID } from './Sprite';
import { Sound } from './SoundManager';

export class AssetLoader {

    private static loading: boolean;

    private static loaded: boolean = false;
    private static spritesLoaded: boolean;
    private static audioLoaded: boolean;

    private static soundsToLoad: Sound[] = [];

    private static loadedCallback: OnAssetsLoadedFunc;
    private static errorCallback: OnAssetsLoadErrorFunc;

    public static load(onLoaded: OnAssetsLoadedFunc, onError: OnAssetsLoadErrorFunc): boolean {
        // Already loading/loaded
        if (AssetLoader.loaded || AssetLoader.loading) {
            return false;
        }
        AssetLoader.loading = true;

        AssetLoader.loadedCallback = onLoaded;
        AssetLoader.errorCallback = onError;

        const pixiLoader = new PIXI.Loader();

        for (const key in SPRITE_PATHS) {
            if (!SPRITE_PATHS.hasOwnProperty(key)) {
                continue;
            }
            const spr: SpriteID = Number(key);
            pixiLoader.add(SpriteID[spr], SPRITE_PATHS[key]);
        }

        pixiLoader.load();
        pixiLoader.on('progress', (a, b) => {
            console.log(a, b);
        });
        pixiLoader.on('complete', () => {
            console.info(`Sprites loaded.`);
            AssetLoader.spritesLoaded = true;
            AssetLoader.tryComplete();
        });
        pixiLoader.on('error', (error, loader, resource) => {
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