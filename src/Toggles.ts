import { Buildings, Globals, Tabs } from '@/Variables';
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

export const toggleBuildings = (building: Buildings): void => {
    if (building == Globals.holdBuilding) {
        Globals.holdBuilding = Buildings.Null;
        DOMCacheGetOrSet(Globals.buildingClass[building]).style.borderColor = 'var(--blue-color)';
    } else {
        if (Globals.holdBuilding != Buildings.Null) {
            DOMCacheGetOrSet(Globals.buildingClass[Globals.holdBuilding]).style.borderColor = 'var(--blue-color)';
        }
        Globals.holdBuilding = building;
        DOMCacheGetOrSet(Globals.buildingClass[building]).style.borderColor = 'var(--green-color)';
    }

    const el = document.activeElement as HTMLElement | null;
    if (el !== null) {
        el.blur();
    }
};
