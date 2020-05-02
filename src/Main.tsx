import { ReactMain } from './ui/ReactMain';

export const DIR = process.cwd();
(global as any).__rootdir__ = DIR;

console.log(`Flappy Space 1.0`);

export const REACT = new ReactMain();