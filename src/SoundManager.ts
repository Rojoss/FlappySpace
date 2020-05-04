import { Howl } from 'howler';
import 'howler-plugin-effect-chain';
import { AssetLoader } from './AssetLoader';
const Tuna = require('tunajs');

export enum Sound {
    UI_CLICK = 1,
    UI_DENY,
    GEM,
    GEM_PICKUP,
    GEM_OLD_PICKUP,
    GEM_CHANGE,
    BEAT_RECORD,
    SHIP_MOVE,
    JUMP_1,
    JUMP_2,
    JUMP_3,
    EXPLODE,

    MUSIC,
    // MUSIC_MENU,

    AMBIENT_BASE,
    AMBIENT_1,
    AMBIENT_2,
    AMBIENT_3,
    AMBIENT_4,
    AMBIENT_5,
    AMBIENT_6,
    // AMBIENT_7,
    // AMBIENT_8,
}

export enum SoundCategory {
    SFX = 1,
    MUSIC,
    AMBIENT,
}

export class SoundManager {

    private static readonly DEFAULT_FADE_DURATION: number = 1000;

    public static readonly VOLUME_SETTINGS: IVolumeMap = {
        [SoundCategory.SFX]: 1,
        [SoundCategory.MUSIC]: 0.25,
        [SoundCategory.AMBIENT]: 0.5
    };

    private static readonly SOUND_DATA: ISoundMap = {
        [Sound.UI_CLICK]: { category: SoundCategory.SFX },
        [Sound.UI_DENY]: { category: SoundCategory.SFX },
        [Sound.GEM]: { category: SoundCategory.SFX },
        [Sound.GEM_PICKUP]: { category: SoundCategory.SFX },
        [Sound.GEM_OLD_PICKUP]: { category: SoundCategory.SFX },
        [Sound.GEM_CHANGE]: { category: SoundCategory.SFX, volume: 0.6, rate: 1.2 },
        [Sound.BEAT_RECORD]: { category: SoundCategory.SFX },
        [Sound.SHIP_MOVE]: { category: SoundCategory.SFX, loop: true, volume: 0.25 },
        [Sound.JUMP_2]: { category: SoundCategory.SFX, volume: 0.4 },
        [Sound.JUMP_3]: { category: SoundCategory.SFX, volume: 0.4 },
        [Sound.JUMP_1]: { category: SoundCategory.SFX, volume: 0.4 },
        [Sound.EXPLODE]: { category: SoundCategory.SFX, volume: 1.5 },

        [Sound.MUSIC]: { category: SoundCategory.MUSIC, loop: true },
        // [Sound.MUSIC_MENU]: { category: SoundCategory.MUSIC, loop: true },

        [Sound.AMBIENT_BASE]: { category: SoundCategory.AMBIENT, loop: true, volume: 0.9 },
        [Sound.AMBIENT_1]: { category: SoundCategory.AMBIENT, loop: true },
        [Sound.AMBIENT_2]: { category: SoundCategory.AMBIENT, loop: true },
        [Sound.AMBIENT_3]: { category: SoundCategory.AMBIENT, loop: true },
        [Sound.AMBIENT_4]: { category: SoundCategory.AMBIENT, loop: true },
        [Sound.AMBIENT_5]: { category: SoundCategory.AMBIENT, loop: true },
        [Sound.AMBIENT_6]: { category: SoundCategory.AMBIENT, loop: true },
        // [Sound.AMBIENT_7]: { category: SoundCategory.AMBIENT, loop: true },
        // [Sound.AMBIENT_8]: { category: SoundCategory.AMBIENT, loop: true },
    };

    private static JUMP_SOUNDS: Sound[] = [Sound.JUMP_1, Sound.JUMP_2, Sound.JUMP_3];

    private static CURRENT_MUSIC?: Sound = undefined;
    private static CURRENT_AMBIENT?: Sound = undefined;

    private static TUNA: any;
    private static DEATH_FILTER_EFFECT: any;

    public static init(): void {
        for (const key in SoundManager.SOUND_DATA) {
            if (!SoundManager.SOUND_DATA.hasOwnProperty(key)) {
                continue;
            }
            const sound: Sound = Number(key);

            const data = SoundManager.SOUND_DATA[key];
            data.clip = new Howl({
                src: `/assets/sounds/${SoundCategory[data.category].toLowerCase()}/${Sound[sound].toLowerCase()}.mp3`,
                loop: data.loop,
                volume: SoundManager.getDefaultSoundVolume(sound),
                rate: data.rate,
                html5: data.html5
            });

            AssetLoader.handleAudioLoading(sound, data.clip);
        }
    }

    private static getDefaultSoundVolume(sound: Sound): number {
        const data = SoundManager.SOUND_DATA[sound];
        return (data.volume || 1) * SoundManager.VOLUME_SETTINGS[data.category];
    }

    public static changeMusic(music: Sound): void {
        if (SoundManager.CURRENT_MUSIC) {
            SoundManager.fadeAndStop(SoundManager.CURRENT_MUSIC);
        }
        SoundManager.playAndFade(music);
        SoundManager.CURRENT_MUSIC = music;
    }

    public static getCurrentMusic(): Howl | undefined {
        if (!SoundManager.CURRENT_MUSIC) {
            return;
        }
        return SoundManager.getClip(SoundManager.CURRENT_MUSIC);
    }

    public static changeAmbient(ambient: Sound): void {
        if (SoundManager.CURRENT_AMBIENT) {
            SoundManager.fadeAndStop(SoundManager.CURRENT_AMBIENT);
        }
        SoundManager.playAndFade(ambient);
        SoundManager.CURRENT_AMBIENT = ambient;
    }

    public static getCurrentAmbient(): Howl | undefined {
        if (!SoundManager.CURRENT_AMBIENT) {
            return;
        }
        return SoundManager.getClip(SoundManager.CURRENT_AMBIENT);
    }

    public static play(sound: Sound): void {
        const data = SoundManager.SOUND_DATA[sound];
        const clip = data.clip;
        if (!clip) {
            console.log(`Tried to stop a sound but the clip is missing.`);
            return;
        }
        clip.rate(data.rate || 1);
        clip.volume(SoundManager.getDefaultSoundVolume(sound));
        clip.play();
    }

    public static playWithRandomPitch(sound: Sound, minOffset: number = -0.1, maxOffset: number = 0.1): void {
        const data = SoundManager.SOUND_DATA[sound];
        const clip = data.clip;
        if (!clip) {
            console.log(`Tried to stop a sound but the clip is missing.`);
            return;
        }
        clip.rate((data.rate || 1) + (minOffset + (Math.random() * (maxOffset - minOffset))));
        clip.volume(SoundManager.getDefaultSoundVolume(sound));
        clip.play();
    }

    public static playRandomJump(minPitchOffset: number = -0.1, maxPitchOffset: number = 0.1): void {
        const sound = SoundManager.JUMP_SOUNDS[Math.floor(Math.random() * SoundManager.JUMP_SOUNDS.length)];
        SoundManager.playWithRandomPitch(sound, minPitchOffset, maxPitchOffset);
    }

    public static stop(sound: Sound): void {
        const clip = SoundManager.SOUND_DATA[sound].clip;
        if (!clip) {
            console.log(`Tried to stop a sound but the clip is missing.`);
            return;
        }
        clip.stop();
    }

    public static pause(sound: Sound): void {
        const clip = SoundManager.SOUND_DATA[sound].clip;
        if (!clip) {
            console.log(`Tried to stop a sound but the clip is missing.`);
            return;
        }
        clip.pause();
    }

    public static getClip(sound: Sound): Howl {
        return SoundManager.SOUND_DATA[sound].clip as Howl;
    }

    public static fadeAndStop(sound: Sound, fade: number = SoundManager.DEFAULT_FADE_DURATION): void {
        const data = SoundManager.SOUND_DATA[sound];
        const howl = data.clip;
        if (!howl) {
            console.log(`Tried to fadeAndStop a sound but the clip is missing.`);
            return;
        }

        if (fade > 0) {
            howl.once('fade', (id) => {
                howl.stop();
            });
            howl.fade(SoundManager.getDefaultSoundVolume(sound), 0, fade);
        } else {
            SoundManager.stop(sound);
        }
    }

    public static playAndFade(sound: Sound, fade: number = SoundManager.DEFAULT_FADE_DURATION): void {
        const data = SoundManager.SOUND_DATA[sound];
        const howl = data.clip;
        if (!howl) {
            console.log(`Tried to fadeAndStop a sound but the clip is missing.`);
            return;
        }

        if (fade > 0) {
            howl.volume(0);
            howl.play();
            howl.fade(0, SoundManager.getDefaultSoundVolume(sound), fade);
        } else {
            SoundManager.play(sound);
        }
    }

    public static addFDeathFilter(): void {
        SoundManager.TUNA = new Tuna(Howler.ctx);
        SoundManager.DEATH_FILTER_EFFECT = new SoundManager.TUNA.Filter({
            frequency: 800,
            Q: 2,
            gain: 0,
            filterType: 'lowpass',
            bypass: 0
        });
        /// @ts-ignore
        Howler.addEffect(SoundManager.DEATH_FILTER_EFFECT);
    }

    public static removeDeathFilter(): void {
        /// @ts-ignore
        Howler.removeEffect(SoundManager.DEATH_FILTER_EFFECT);
    }

}

interface ISoundMap {
    [sound: number]: {
        category: SoundCategory;
        loop?: boolean;
        volume?: number;
        rate?: number;
        html5?: boolean;

        clip?: Howl;
    };
}

interface IVolumeMap {
    [category: number]: number;
}