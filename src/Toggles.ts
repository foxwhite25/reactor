import { Globals, Tabs } from '@/Variables';
import { hideStuff } from '@/UpdateHTML';

export const toggleTabs = (tabs: Tabs):void => {
    Globals.currentTab = tabs;

    // revealStuff();
    hideStuff();

    const el = document.activeElement as HTMLElement | null;
    if (el !== null) {
        el.blur();
    }
}
