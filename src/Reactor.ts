import { generateEventHandlers } from '@/EventListener';
import { clearTimers, setInterval } from '@/Timers';
import { Player } from '@/Types';
import Decimal from 'break_infinity.js';
import { htmlInserts, setupMapTable } from '@/UpdateHTML';
import { Buildings, Globals, Tabs } from '@/Variables';
import { toggleTabs } from '@/Toggles';
import { getBuildingInstance } from '@/Buildings';

export const player: Player = {
    firstPlayed: new Date().toISOString(),
    money: new Decimal(10),
    research: new Decimal(0),
    power: new Decimal(0),
    flame: new Decimal(0),
} as Player;

player.buildings = [];
for (let i = 0; i < Globals.mapHeight; i++) {
    player.buildings.push([]);
    for (let j = 0; j < Globals.mapWidth; j++) {
        player.buildings[i].push(getBuildingInstance(i, j, Buildings.Null));
    }
}

window.addEventListener('load', () => {
    setupMapTable();
    generateEventHandlers();

    void reload();
});

export const updateAll = (): void => {
    player.buildings.forEach((row) => {
        row.forEach((building) => {
            Globals.buildingTickFunctions[building.buildingType]();
        });
    });

    if (player.power.greaterThan(Globals.maxPower)) {
        player.power = Globals.maxPower;
    }
};

export const fastUpdates = (): void => {
    updateAll();
    htmlInserts();
};

export const slowUpdates = (): void => {
    return;
};

export const constantIntervals = (): void => {
    setInterval(slowUpdates, 200);
    setInterval(fastUpdates, 50);
};

export const reload = async (reset = false): Promise<void> => {
    clearTimers();
    await new Promise((res) => {
        setTimeout(res, 0);
    });

    htmlInserts();
    toggleTabs(Tabs.Buildings);
    constantIntervals();
    if (reset) {
        return;
    }
};
