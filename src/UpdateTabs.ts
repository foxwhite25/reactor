import { Globals, Tabs } from '@/Variables';

export const visualUpdateBuildings = (): void => {
    if (Globals.currentTab != Tabs.Buildings) {
        return;
    }
};
