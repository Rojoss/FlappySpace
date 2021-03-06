import { ReactMain } from './ui/ReactMain';
import { store } from './ui/react/store/Store';
import { setProfile } from './ui/react/store/profile/ProfileActions';
import { SoundManager } from './SoundManager';
import { AssetLoader } from './AssetLoader';
import { history } from './ui/react/History';
import { Routes } from './ui/react/App';

export const DIR = process.cwd();
(global as any).__rootdir__ = DIR;

console.log(`Flappy Space 1.0`);

history.push(Routes.SPLASH);
AssetLoader.load(() => {
    history.push(Routes.GAME);
}, (err) => {
    // TODO: Show that loading failed
});
SoundManager.init();

try {
    const levelDataStr = localStorage.getItem('profile.leveldata');
    if (levelDataStr) {
        const levelData = JSON.parse(levelDataStr);
        console.log(`Level data loaded`, levelData);
        store.dispatch(setProfile({ levelData }));
    }
} catch (err) {
    console.warn(`Unable to load profile data from local storage.`, err);
}

export const REACT = new ReactMain();