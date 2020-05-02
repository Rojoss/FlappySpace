import * as PIXI from 'pixi.js';
import { GameStage } from '../rendering/GameStage';
import { Layer } from '../rendering/Layer';
import { RenderManager } from '../rendering/RenderManager';
import { GameUtils } from '../utils/GameUtils';

export class Planets extends PIXI.Container {

    private static readonly PLANET_TEXTURES: PIXI.Texture[] = [
        PIXI.Texture.from('/assets/sprites/planet_1.png')
    ];

    private static readonly START_OFFSET: number = 1000;
    private static readonly OFFSCREEN_BUFFER: number = 1000;
    private static readonly PLANETS_PER_LEVEL: number = 100;

    private static readonly MIN_PLANET_SIZE: number = 300;
    private static readonly MAX_PLANET_SIZE: number = 750;

    private static readonly MIN_PLANET_ANGLE: number = 5;
    private static readonly MAX_PLANET_ANGLE: number = 35;

    private static readonly MAX_OFFSCREEN_Y: number = 200;

    private updateID: number;
    private prevShipDistance: number | undefined;

    private seed: number;

    private planetCount: number = 0;
    private planets: PIXI.Sprite[] = [];
    private planetPool: PIXI.Sprite[] = [];

    constructor(stage: GameStage) {
        super();
        this.updateID = stage.addToUpdate(this.update.bind(this));

        this.seed = RenderManager.Instance.level.planetSeed;
        stage.addToScene(Layer.OBSTACLES, this);
    }

    public destroy(): void {
        super.destroy();
        RenderManager.Instance.stage.removeFromUpdate(this.updateID);
    }

    public update(): void {
        const ship = RenderManager.Instance.ship;
        this.createPlanets();

        for (let i = this.planets.length - 1; i >= 0; i--) {
            const planet = this.planets[i];

            const speed = ship.speed;
            planet.x -= speed;

            const distance = (ship.x - planet.x) * (ship.x - planet.x) + (ship.y + ship.collisionOffsetY - planet.y) * (ship.y + ship.collisionOffsetY - planet.y);
            const planetRadius = planet.height / 2;
            const shipRadius = ship.collisionSize / 2;
            if (distance < (shipRadius + planetRadius) * (shipRadius + planetRadius)) {
                ship.crash();
            }

            if (planet.x + planet.width < 0) {
                this.planets.splice(i, 1);
                planet.visible = false;
                this.planetPool.push(planet);
            }
        }
    }

    public restart(): void {
        for (let i = this.planets.length - 1; i >= 0; i--) {
            const planet = this.planets[i];
            this.planets.splice(i, 1);
            planet.visible = false;
            this.planetPool.push(planet);
            this.planetCount = 0;
        }

        this.createPlanets();
    }

    private createPlanets(): void {
        const ship = RenderManager.Instance.ship;
        if (!ship || !ship.alive || this.prevShipDistance === ship.distance || this.planetCount >= Planets.PLANETS_PER_LEVEL) {
            return;
        }

        this.createPlanet();

    }

    private random(offset: number = 0): number {
        return GameUtils.getPseudoRandom(this.seed + this.planetCount + offset);
    }

    private createPlanet(): void {
        if (this.planetCount >= Planets.PLANETS_PER_LEVEL) {
            return;
        }
        const lastPlanet = this.planets.length > 0 ? this.planets[this.planets.length - 1] : undefined;

        const stageWidth = RenderManager.Instance.stageWidth;
        if (lastPlanet !== undefined && lastPlanet.x > stageWidth + Planets.OFFSCREEN_BUFFER) {
            return;
        }

        const stageHeight = RenderManager.Instance.stageHeight;


        // Create a random planet first
        const radius = Planets.MIN_PLANET_SIZE + (this.random(1) * (Planets.MAX_PLANET_SIZE - Planets.MIN_PLANET_SIZE));
        let y = 0;
        let top = false;
        if (this.random() <= 0.5) {
            y = -Planets.MAX_OFFSCREEN_Y + (this.random(2) * Planets.MAX_PLANET_SIZE);
            top = true;
        } else {
            y = stageHeight + Planets.MAX_OFFSCREEN_Y - (this.random(2) * Planets.MAX_PLANET_SIZE);
        }
        if (lastPlanet) {
            const minPlanetDistance = RenderManager.Instance.level.minPlanetDistance;
            const maxPlanetDistance = RenderManager.Instance.level.maxPlanetDistance;
            const planetDistance = minPlanetDistance + (this.random(3) * (maxPlanetDistance - minPlanetDistance));
            this.addPlanet(lastPlanet.x + (lastPlanet.width / 2) + radius + planetDistance, y, radius, top);
        } else {
            this.addPlanet(Planets.START_OFFSET + radius, y, radius, top);
        }

        this.createMatchingPlanet();
    }

    private createMatchingPlanet(): void {
        if (this.planetCount >= Planets.PLANETS_PER_LEVEL) {
            return;
        }
        const stageHeight = RenderManager.Instance.stageHeight;

        const lastPlanet = this.planets[this.planets.length - 1];
        const lastPlanetTop: boolean = lastPlanet ? (lastPlanet as any)['top'] : false;

        const minPlanetDistance = RenderManager.Instance.level.minPlanetDistance;
        const maxPlanetDistance = RenderManager.Instance.level.maxPlanetDistance;

        // First pick a random distance the planet will be offset from the previous one
        const planetDistance = minPlanetDistance + (this.random(2) * (maxPlanetDistance - minPlanetDistance));
        // Secondly pick a random angle, the new planet will be created x degrees away from the previous one.
        const angleDeg = Math.min(Planets.MIN_PLANET_ANGLE + (this.random() * (Planets.MAX_PLANET_ANGLE - Planets.MIN_PLANET_ANGLE)), 85);
        // const angleDeg = 10;
        const angle = angleDeg * Math.PI / 180;
        // Then pick a random offset from the edge (for bottom it will be added, and top it will be subtracted)
        const edgeOffset = (this.random(1) * (Planets.MAX_OFFSCREEN_Y + planetDistance)) - planetDistance;

        // Calculate how much space there is between the edge and the last planet
        const newTop = !lastPlanetTop;
        const distanceToEdge = lastPlanetTop ? stageHeight + edgeOffset - lastPlanet.y : -edgeOffset + lastPlanet.y;

        // Calculate the distance to the random edge offset from the previous planet. (The Hypotenuse)
        const distance = distanceToEdge / Math.cos(angle);
        // Calculate the size of the new planet
        const lastRadius = lastPlanet.height / 2;
        const newSize = distance - lastRadius - planetDistance;
        const newRadius = newSize / 2;

        // Get the center point for the new planet
        const distanceFromLastPlanet = lastRadius + planetDistance + newRadius;
        if (newTop) {
            const newX = lastPlanet.x + Math.cos(angle - (90 * Math.PI / 180)) * distanceFromLastPlanet;
            const newY = lastPlanet.y + Math.sin(angle - (90 * Math.PI / 180)) * distanceFromLastPlanet;
            this.addPlanet(newX, newY, newRadius, newTop);
        } else {
            const newX = lastPlanet.x + Math.sin(angle) * distanceFromLastPlanet;
            const newY = lastPlanet.y + Math.cos(angle) * distanceFromLastPlanet;
            this.addPlanet(newX, newY, newRadius, newTop);
        }

        this.createPlanet();
    }


    private addPlanet(x: number, y: number, radius: number, top: boolean): void {
        let planet: PIXI.Sprite;
        if (this.planetPool.length > 0) {
            planet = this.planetPool[this.planetPool.length - 1];
            this.planetPool.splice(this.planetPool.length - 1);
        } else {
            planet = new PIXI.Sprite(Planets.PLANET_TEXTURES[0]);
        }

        planet.x = x;
        planet.y = y;
        planet.anchor.set(0.5);
        planet.width = radius * 2;
        planet.height = radius * 2;
        planet.alpha = 0.8;
        planet.blendMode = PIXI.BLEND_MODES.SCREEN;
        planet.visible = true;

        (planet as any)['top'] = top;

        this.addChild(planet);
        this.planets.push(planet);
        this.planetCount++;
    }


}