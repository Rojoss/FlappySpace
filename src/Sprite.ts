export enum SpriteID {
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
    [SpriteID.CRYSTAL]: '../assets/sprites/crystal.png',
    [SpriteID.CRYSTAL_OLD]: '../assets/sprites/crystal_old.png',
    [SpriteID.PLANET_1]: '../assets/sprites/planet_1.png',
    [SpriteID.PLANET_2]: '../assets/sprites/planet_2.png',
    [SpriteID.PLANET_3]: '../assets/sprites/planet_3.png',
    [SpriteID.PLANET_4]: '../assets/sprites/planet_4.png',
    [SpriteID.PLANET_5]: '../assets/sprites/planet_5.png',
    [SpriteID.PLANET_6]: '../assets/sprites/planet_6.png',
    [SpriteID.SHIP]: '../assets/sprites/ship.png',
    [SpriteID.SHIP_DEAD]: '../assets/sprites/ship_dead.png',
    [SpriteID.STAR]: '../assets/sprites/star.png',

    [SpriteID.CLOCK]: '../assets/sprites/clock.png',
    [SpriteID.LOCK]: '../assets/sprites/lock.png',
    [SpriteID.MARS]: '../assets/planets/mars.png',
    [SpriteID.NEPTUNE]: '../assets/planets/neptune.png',
    [SpriteID.URANUS]: '../assets/planets/uranus.png',
    [SpriteID.PLUTO]: '../assets/planets/pluto.png',
    [SpriteID.VENUS]: '../assets/planets/venus.png',
    [SpriteID.MERCURY]: '../assets/planets/mercury.png',
};