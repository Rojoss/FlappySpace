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
}