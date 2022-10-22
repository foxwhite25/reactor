import { generateEventHandlers } from '@/EventListener';
import { clearTimers } from '@/Timers';
import { Player } from '@/Type/Reactor';
import Decimal from 'break_infinity.js';
import { htmlInserts } from '@/UpdateHTML';
import { Globals } from '@/Variables';

export const player: Player = {
    firstPlayed: new Date().toISOString(),
    money: new Decimal(0),
    research: new Decimal(0),
    power: new Decimal(0),
    flame: new Decimal(0),
} as Player;

window.addEventListener('load', () => {
    generateEventHandlers();
    void reload();
});

export const updateAll = (): void => {
    player.money = player.money.add(1);
    player.power = player.power.add(1);
    if (player.power.greaterThan(Globals.maxPower)) {
        player.power = Globals.maxPower
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
    constantIntervals();
    if (reset) {
        return;
    }
};
