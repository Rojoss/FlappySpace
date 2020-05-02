import { RenderManager } from '../rendering/RenderManager';
import { GameUtils } from '../utils/GameUtils';

export class ScreenShake {

    private static updateID: number | undefined;

    private static strength: number;
    private static shakeX: number;
    private static shakeY: number;

    public static shake(strength: number = 0.9, shakeX: number = 100, shakeY: number = shakeX): void {
        if (this.updateID) {
            return;
        }
        ScreenShake.updateID = RenderManager.Instance.stage.addToUpdate(ScreenShake.update);
        ScreenShake.strength = GameUtils.clamp01(strength);
        ScreenShake.shakeX = shakeX;
        ScreenShake.shakeY = shakeY;
    }

    private static update(): void {
        if (!ScreenShake.updateID) {
            return;
        }

        RenderManager.Instance.stage.scene.x = -(ScreenShake.shakeX / 2) + (Math.random() * ScreenShake.shakeX);
        RenderManager.Instance.stage.scene.y = -(ScreenShake.shakeY / 2) + (Math.random() * ScreenShake.shakeY);
        ScreenShake.shakeX *= ScreenShake.strength;
        ScreenShake.shakeY *= ScreenShake.strength;

        if (ScreenShake.shakeX < 0.5 && ScreenShake.shakeY < 0.5) {
            RenderManager.Instance.stage.removeFromUpdate(ScreenShake.updateID);
            RenderManager.Instance.stage.scene.x = 0;
            RenderManager.Instance.stage.scene.y = 0;
            ScreenShake.updateID = undefined;
        }
    }

}