import { generateEventHandlers } from '@/EventListener';
import { clearTimers, setInterval } from '@/Timers';
import { Player } from '@/Types';
import Decimal from 'break_infinity.js';
import { htmlInserts, processComponentQue, setupPage } from '@/UpdateHTML';
import { Globals, Tabs } from '@/Variables';
import { toggleTabs } from '@/Toggles';

export const player: Player = {
    firstPlayed: new Date().toISOString(),
    money: new Decimal(10),
    heat: new Decimal(222),
    research: new Decimal(0),
    power: new Decimal(0),
    particle: new Decimal(0),
    tiles: [],
    setting: {
        theme: 'dracula',
    },
};

for (let i = 0; i < Globals.mapHeight; i++) {
    player.tiles.push([]);
    for (let j = 0; j < Globals.mapWidth; j++) {
        player.tiles[i].push(null);
    }
}

window.addEventListener('load', () => {
    setupPage();
    generateEventHandlers();

    void reload();
});

export const updateAll = (): void => {
    processComponentQue();

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
