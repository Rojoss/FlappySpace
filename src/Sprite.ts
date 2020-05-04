export enum Sprite {
    // Game
    CRYSTAL,
    CRYSTAL_OLD,
    PLANET_1,
    PLANET_2,
    PLANET_3,
    PLANET_4,
    PLANET_5,
    PLANET_6,
    SHIP,
    SHIP_DEAD,
    STAR,

    // UI
    CLOCK,
    LOCK,
    MARS,
    NEPTUNE,
    URANUS,
    PLUTO,
    VENUS,
    MERCURY,
}

export const SPRITE_PATHS: { [spr: number]: string } = {
    [Sprite.CRYSTAL]: '/assets/sprites/crystal.png',
    [Sprite.CRYSTAL_OLD]: '/assets/sprites/crystal_old.png',
    [Sprite.PLANET_1]: '/assets/sprites/planet_1.png',
    [Sprite.PLANET_2]: '/assets/sprites/planet_2.png',
    [Sprite.PLANET_3]: '/assets/sprites/planet_3.png',
    [Sprite.PLANET_4]: '/assets/sprites/planet_4.png',
    [Sprite.PLANET_5]: '/assets/sprites/planet_5.png',
    [Sprite.PLANET_6]: '/assets/sprites/planet_6.png',
    [Sprite.SHIP]: '/assets/sprites/ship.png',
    [Sprite.SHIP_DEAD]: '/assets/sprites/ship_dead.png',
    [Sprite.STAR]: '/assets/sprites/star.png',

    [Sprite.CLOCK]: '/assets/sprites/clock.png',
    [Sprite.LOCK]: '/assets/sprites/lock.png',
    [Sprite.MARS]: '/assets/planets/mars.png',
    [Sprite.NEPTUNE]: '/assets/planets/neptune.png',
    [Sprite.URANUS]: '/assets/planets/uranus.png',
    [Sprite.PLUTO]: '/assets/planets/pluto.png',
    [Sprite.VENUS]: '/assets/planets/venus.png',
    [Sprite.MERCURY]: '/assets/planets/mercury.png',
};