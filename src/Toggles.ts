import { Component, Globals, Tabs } from '@/Variables';
import { hideStuff } from '@/UpdateHTML';
import { DOMCacheGetOrSet } from '@/Cache/DOM';

export const toggleTabs = (tabs: Tabs): void => {
    Globals.currentTab = tabs;

    // revealStuff();
    hideStuff();

    const el = document.activeElement as HTMLElement | null;
    if (el !== null) {
        el.blur();
    }
};

export const toggleComponent = (component: Component): void => {
    if (component == Globals.selectedComponent) {
        Globals.selectedComponent = Component.Null;
        DOMCacheGetOrSet(Globals.emptyTiles[component].id).style.borderColor = 'var(--blue-color)';
    } else {
        if (Globals.selectedComponent != Component.Null) {
            DOMCacheGetOrSet(Globals.emptyTiles[Globals.selectedComponent].id).style.borderColor = 'var(--blue-color)';
        }
        Globals.selectedComponent = component;
        DOMCacheGetOrSet(Globals.emptyTiles[component].id).style.borderColor = 'var(--green-color)';
    }

    const el = document.activeElement as HTMLElement | null;
    if (el !== null) {
        el.blur();
    }
};
