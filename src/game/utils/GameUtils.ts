export class GameUtils {
    public static lerp(min: number, max: number, percentage: number): number {
        return (max - min) * percentage + min;
    }


    public static clamp(value: number, min: number, max: number): number {
        return Math.min(Math.max(value, min), max);
    }
    public static clamp01(value: number): number {
        return this.clamp(value, 0, 1);
    }

    public static getPseudoRandom(seed: number): number {
        var t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}