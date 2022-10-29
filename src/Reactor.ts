import { generateEventHandlers } from '@/EventListener';
import { clearTimers, setInterval, setTimeout } from '@/Timers';
import { Player } from '@/Types';
import Decimal from 'break_infinity.js';
import { htmlInserts, processComponentQue, setupPage } from '@/UpdateHTML';
import { Component, Globals, Tabs } from '@/Variables';
import { toggleTabs } from '@/Toggles';
import { BaseTile, FuelRod } from '@/Tile';
import { buyComponent } from '@/Components';
import { DOMCacheGetOrSet } from '@/Cache/DOM';

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
        paused: false,
        simulation: false,
    },
};

for (let i = 0; i < Globals.mapHeight; i++) {
    player.tiles.push([]);
    for (let j = 0; j < Globals.mapWidth; j++) {
        player.tiles[i].push(Globals.emptyTiles[0]);
    }
}

window.addEventListener('load', () => {
    setupPage();
    generateEventHandlers();

    void reload();
});

export const tick = (): boolean => {
    Globals.stats.power = new Decimal(0)
    Globals.stats.heat = new Decimal(0)
    Globals.maxHeat = new Decimal(500)

    let stopSimulation = true

    for (let i = 0; i < Globals.mapHeight; i++) {
        for (let j = 0; j < Globals.mapWidth; j++) {
            const tile = player.tiles[i][j]

            if (tile.id == '') {
                continue
            }

            tile.tickPre(i, j)

            if (tile.isTileBroken()) {
                buyComponent(i, j, Component.Null)
            }
        }
    }
    for (let i = 0; i < Globals.mapHeight; i++) {
        for (let j = 0; j < Globals.mapWidth; j++) {
            const tile = player.tiles[i][j]

            if (tile.id == '') {
                continue
            }

            tile.tickPost(i, j)

            if (tile.isTileBroken()) {
                buyComponent(i, j, Component.Null)
            }
        }
    }
    for (let i = 0; i < Globals.mapHeight; i++) {
        for (let j = 0; j < Globals.mapWidth; j++) {
            const tile = player.tiles[i][j]

            if (tile.id == '') {
                continue
            }

            if (tile.isTileBroken()) {
                buyComponent(i, j, Component.Null)
            } else if (player.setting.simulation && stopSimulation && tile instanceof FuelRod) {
                stopSimulation = false
            }
        }
    }
    if (!player.setting.simulation) {
        player.heat = player.heat.add(Globals.stats.heat)
        player.power = player.power.add(Globals.stats.power)
    }
    return stopSimulation
}

export const updateAll = (): void => {
    processComponentQue();
    tick();

    if (player.heat.greaterThan(Globals.maxHeat)) {
        blowUp()
    }

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
    setInterval(fastUpdates, 100);
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

export const addHeat = (heat: Decimal): void => {
    Globals.stats.heat = Decimal.max(Globals.stats.heat.add(heat), 0)
}

export const addPower = (power: Decimal): void => {
    Globals.stats.power = Decimal.max(Globals.stats.power.add(power), 0)
}

export const blowUp = ():void => {
    player.setting.paused = true
    for (let i = 0; i < Globals.mapHeight; i++) {
        for (let j = 0; j < Globals.mapWidth; j++) {
            buyComponent(i, j, Component.Null, true);
        }
    }
    player.power = new Decimal(0)
    player.heat = new Decimal(0)
    DOMCacheGetOrSet('body').className += ' nuke'
    const nuke = document.createElement('div')
    nuke.className = 'nuke'
    DOMCacheGetOrSet('body').append(nuke);
    setTimeout(() => {
        nuke.className += ' burn';
    }, 500);
    setTimeout(() => {
        nuke.className += ' b';
    }, 600);
    setTimeout(() => {
        player.power = new Decimal(0)
        player.heat = new Decimal(0)
        player.setting.paused = false
        DOMCacheGetOrSet('body').className = DOMCacheGetOrSet('body').className.replace(' nuke', '');
        nuke.remove()
    }, 4000);
}

export const distributeHeat = (around: BaseTile[], heat: Decimal) :void => {
    const list: BaseTile[] = []
    let first: BaseTile = {} as BaseTile

    around.map((tile) => {
        if (tile.isHeatAcceptor()) {
            list.push(tile)

            if (first == {} as BaseTile){
                first = tile
            }
        }
    })

    if (list.length == 0){
        addHeat(heat)
        return;
    }

    list.map((tile) => {
        tile.damageTile(heat.divide(list.length))
    })
    return
}
