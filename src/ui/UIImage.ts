export class UIImage {

    public static readonly ship: any = require('../../assets/sprites/ship.png').default;
    public static readonly crystal: any = require('../../assets/sprites/crystal.png').default;
    public static readonly crystalOld: any = require('../../assets/sprites/crystal_old.png').default;

    public static readonly clock: any = require('../../assets/sprites/clock.png').default;
    public static readonly lock: any = require('../../assets/sprites/lock.png').default;

    public static readonly planet: { [level: number]: any } = {
        [1]: require('../../assets/planets/mars.png').default,
        [2]: require('../../assets/planets/neptune.png').default,
        [3]: require('../../assets/planets/uranus.png').default,
        [4]: require('../../assets/planets/pluto.png').default,
        [5]: require('../../assets/planets/venus.png').default,
        [6]: require('../../assets/planets/mercury.png').default
    };

}