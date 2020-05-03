export type EaseFunction = (x: number) => number;

export enum EaseMode {
    LINEAR,

    IN_QUAD,
    OUT_QUAD,
    IN_OUT_QUAD,

    IN_CUBIC,
    OUT_CUBIC,
    IN_OUT_CUBIC,

    IN_QUART,
    OUT_QUART,
    IN_OUT_QUART,

    IN_QUINT,
    OUT_QUINT,
    IN_OUT_QUINT,

    IN_SINE,
    OUT_SINE,
    IN_OUT_SINE,

    IN_EXPO,
    OUT_EXPO,
    IN_OUT_EXPO,

    IN_CIRC,
    OUT_CIRC,
    IN_OUT_CIRC,

    IN_BACK,
    OUT_BACK,
    IN_OUT_BACK,

    IN_ELASTIC,
    OUT_ELASTIC,
    IN_OUT_ELASTIC,

    IN_BOUNCE,
    OUT_BOUNCE,
    IN_OUT_BOUNCE,
}

export class Ease {

    private static readonly c1: number = 1.70158;
    private static readonly c2: number = Ease.c1 * 1.525;
    private static readonly c3: number = Ease.c1 + 1;
    private static readonly c4: number = (2 * Math.PI) / 3;
    private static readonly c5: number = (2 * Math.PI) / 4.5;

    private static easeFunctions: { [mode: number]: EaseFunction } = {
        [EaseMode.LINEAR]: Ease.linear,
        [EaseMode.IN_QUAD]: Ease.easeInQuad,
        [EaseMode.OUT_QUAD]: Ease.easeOutQuad,
        [EaseMode.IN_OUT_QUAD]: Ease.easeInOutQuad,
        [EaseMode.IN_CUBIC]: Ease.easeInCubic,
        [EaseMode.OUT_CUBIC]: Ease.easeOutCubic,
        [EaseMode.IN_OUT_CUBIC]: Ease.easeInOutCubic,
        [EaseMode.IN_QUART]: Ease.easeInQuart,
        [EaseMode.OUT_QUART]: Ease.easeOutQuart,
        [EaseMode.IN_OUT_QUART]: Ease.easeInOutQuart,
        [EaseMode.IN_QUINT]: Ease.easeInQuint,
        [EaseMode.OUT_QUINT]: Ease.easeOutQuint,
        [EaseMode.IN_OUT_QUINT]: Ease.easeInOutQuint,
        [EaseMode.IN_SINE]: Ease.easeInSine,
        [EaseMode.OUT_SINE]: Ease.easeOutSine,
        [EaseMode.IN_OUT_SINE]: Ease.easeInOutSine,
        [EaseMode.IN_EXPO]: Ease.easeInExpo,
        [EaseMode.OUT_EXPO]: Ease.easeOutExpo,
        [EaseMode.IN_OUT_EXPO]: Ease.easeInOutExpo,
        [EaseMode.IN_CIRC]: Ease.easeInCirc,
        [EaseMode.OUT_CIRC]: Ease.easeOutCirc,
        [EaseMode.IN_OUT_CIRC]: Ease.easeInOutCirc,
        [EaseMode.IN_BACK]: Ease.easeInBack,
        [EaseMode.OUT_BACK]: Ease.easeOutBack,
        [EaseMode.IN_OUT_BACK]: Ease.easeInOutBack,
        [EaseMode.IN_ELASTIC]: Ease.easeInElastic,
        [EaseMode.OUT_ELASTIC]: Ease.easeOutElastic,
        [EaseMode.IN_OUT_ELASTIC]: Ease.easeInOutElastic,
        [EaseMode.IN_BOUNCE]: Ease.easeInBounce,
        [EaseMode.OUT_BOUNCE]: Ease.easeOutBounce,
        [EaseMode.IN_OUT_BOUNCE]: Ease.easeInOutBounce
    };

    public static ease(easeMode: EaseMode, progress: number): number {
        return Ease.easeFunctions[easeMode](progress);
    }

    public static linear(x: number): number {
        return x;
    }

    public static easeInQuad(x: number): number {
        return x * x;
    }

    public static easeOutQuad(x: number): number {
        return 1 - (1 - x) * (1 - x);
    }

    public static easeInOutQuad(x: number): number {
        return x < 0.5 ?
            2 * x * x :
            1 - Math.pow(-2 * x + 2, 2) / 2;
    }

    public static easeInCubic(x: number): number {
        return x * x * x;
    }

    public static easeOutCubic(x: number): number {
        return 1 - Math.pow(1 - x, 3);
    }

    public static easeInOutCubic(x: number): number {
        return x < 0.5 ?
            4 * x * x * x :
            1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    public static easeInQuart(x: number): number {
        return x * x * x * x;
    }

    public static easeOutQuart(x: number): number {
        return 1 - Math.pow(1 - x, 4);
    }

    public static easeInOutQuart(x: number): number {
        return x < 0.5 ?
            8 * x * x * x * x :
            1 - Math.pow(-2 * x + 2, 4) / 2;
    }

    public static easeInQuint(x: number): number {
        return x * x * x * x * x;
    }

    public static easeOutQuint(x: number): number {
        return 1 - Math.pow(1 - x, 5);
    }

    public static easeInOutQuint(x: number): number {
        return x < 0.5 ?
            16 * x * x * x * x * x :
            1 - Math.pow(-2 * x + 2, 5) / 2;
    }

    public static easeInSine(x: number): number {
        return 1 - Math.cos(x * Math.PI / 2);
    }

    public static easeOutSine(x: number): number {
        return Math.sin(x * Math.PI / 2);
    }

    public static easeInOutSine(x: number): number {
        return -(Math.cos(Math.PI * x) - 1) / 2;
    }

    public static easeInExpo(x: number): number {
        return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
    }

    public static easeOutExpo(x: number): number {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    }

    public static easeInOutExpo(x: number): number {
        return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ?
            Math.pow(2, 20 * x - 10) / 2 :
            (2 - Math.pow(2, -20 * x + 10)) / 2;
    }

    public static easeInCirc(x: number): number {
        return 1 - Math.sqrt(1 - Math.pow(x, 2));
    }

    public static easeOutCirc(x: number): number {
        return Math.sqrt(1 - Math.pow(x - 1, 2));
    }

    public static easeInOutCirc(x: number): number {
        return x < 0.5 ?
            (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2 :
            (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
    }

    public static easeInBack(x: number): number {
        return Ease.c3 * x * x * x - Ease.c1 * x * x;
    }

    public static easeOutBack(x: number): number {
        return 1 + Ease.c3 * Math.pow(x - 1, 3) + Ease.c1 * Math.pow(x - 1, 2);
    }

    public static easeInOutBack(x: number): number {
        return x < 0.5 ?
            (Math.pow(2 * x, 2) * ((Ease.c2 + 1) * 2 * x - Ease.c2)) / 2 :
            (Math.pow(2 * x - 2, 2) * ((Ease.c2 + 1) * (x * 2 - 2) + Ease.c2) + 2) / 2;
    }

    public static easeInElastic(x: number): number {
        return x === 0 ? 0 : x === 1 ? 1 :
            -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * Ease.c4);
    }

    public static easeOutElastic(x: number): number {
        return x === 0 ? 0 : x === 1 ? 1 :
            Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * Ease.c4) + 1;
    }

    public static easeInOutElastic(x: number): number {
        return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ?
            -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * Ease.c5)) / 2 :
            Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * Ease.c5) / 2 + 1;
    }

    public static easeInBounce(x: number): number {
        return 1 - Ease.easeOutBounce(1 - x);
    }

    public static easeOutBounce(x: number): number {
        const n1 = 7.5625;
        const d1 = 2.75;

        if (x < 1 / d1) {
            return n1 * x * x;
        } else if (x < 2 / d1) {
            return n1 * (x -= (1.5 / d1)) * x + .75;
        } else if (x < 2.5 / d1) {
            return n1 * (x -= (2.25 / d1)) * x + .9375;
        } else {
            return n1 * (x -= (2.625 / d1)) * x + .984375;
        }
    }

    public static easeInOutBounce(x: number): number {
        return x < 0.5 ?
            (1 - Ease.easeOutBounce(1 - 2 * x)) / 2 :
            (1 + Ease.easeOutBounce(2 * x - 1)) / 2;
    }

}