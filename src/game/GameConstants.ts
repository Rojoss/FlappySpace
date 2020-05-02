export class GameConstants {
    /**
     * This desired height of the game stage.
     * The stage will be scaled so that this height is the same on all devices.
     * The width will be different on each device, they will just see further ahead on wide screens so that the game can be rendered full-screen.
     */
    public static readonly STAGE_HEIGHT: number = 2000; // 4k minus borders should be sharp enough
}