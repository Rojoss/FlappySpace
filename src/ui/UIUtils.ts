export class UIUtils {

    public static formatDuration(ms: number): string {
        const hours = Math.floor(ms / 360000);
        ms -= hours * 360000;
        const minutes = Math.floor(ms / 60000);
        ms -= minutes * 60000;
        const seconds = Math.floor(ms / 1000);

        return `${hours > 0 ? UIUtils.addZero(hours) + ':' : ''}${UIUtils.addZero(minutes)}:${UIUtils.addZero(seconds)}`;
    }

    private static addZero(value: number): String {
        if (value < 10) {
            return `0${value}`;
        }
        return value.toString();
    }
}