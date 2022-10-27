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
    if (component == Globals.selectorComponent) {
        Globals.selectorComponent = null;
        DOMCacheGetOrSet(Globals.componentsData[component].id).style.borderColor = 'var(--blue-color)';
    } else {
        if (Globals.selectorComponent != null) {
            DOMCacheGetOrSet(Globals.componentsData[Globals.selectorComponent].id).style.borderColor = 'var(--blue-color)';
        }
        Globals.selectorComponent = component;
        DOMCacheGetOrSet(Globals.componentsData[component].id).style.borderColor = 'var(--green-color)';
    }

    const el = document.activeElement as HTMLElement | null;
    if (el !== null) {
        el.blur();
    }
};
