export class UIUtils {

    public static formatDuration(sec: number): string {
        sec = Math.floor(sec);
        const hours = Math.floor(sec / 36000);
        sec -= hours * 360000;
        const minutes = Math.floor(sec / 6000);
        sec -= minutes * 60000;

        return `${hours > 0 ? UIUtils.addZero(hours) + ':' : ''}${UIUtils.addZero(minutes)}:${UIUtils.addZero(sec)}`;
    }

    private static addZero(value: number): String {
        if (value < 10) {
            return `0${value}`;
        }
        return value.toString();
    }
}