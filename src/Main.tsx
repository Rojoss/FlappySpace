import { ReactMain } from './ui/ReactMain';
import { SoundManager } from './SoundManager';

export const DIR = process.cwd();
(global as any).__rootdir__ = DIR;

console.log(`Flappy Space 1.0`);

SoundManager.init();
export const REACT = new ReactMain();