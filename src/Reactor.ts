import { generateEventHandlers } from '@/EventListener';
import { clearTimers, setInterval, setTimeout } from '@/Timers';
import { Player } from '@/Types';
import Decimal from 'break_infinity.js';
import { htmlInserts, processComponentQue, setupPage } from '@/UpdateHTML';
import { blankGlobals, Component, Globals, Tabs } from '@/Variables';
import { toggleTabs } from '@/Toggles';
import { BaseTile, FuelRod } from '@/Tile';
import { buyComponent } from '@/Components';
import { DOMCacheGetOrSet } from '@/Cache/DOM';

export const player: Player = {
    firstPlayed: new Date().toISOString(),
    money: new Decimal(1000),
    heat: new Decimal(0),
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
    Globals.maxHeat = blankGlobals.maxHeat

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
        player.heat = Decimal.max(player.heat.add(Globals.stats.heat), 0)
        player.power = Decimal.max(player.power.add(Globals.stats.power), 0)
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
    Globals.stats.heat = Globals.stats.heat.add(heat)
}

export const addPower = (power: Decimal): void => {
    Globals.stats.power = Globals.stats.power.add(power)
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
        nuke.className += ' done';
    }, 2000);
    setTimeout(() => {
        player.power = new Decimal(0)
        player.heat = new Decimal(0)
        player.setting.paused = false
        DOMCacheGetOrSet('body').className = DOMCacheGetOrSet('body').className.replace(' nuke', '');
        nuke.remove()
    }, 3500);
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

    const weights: Decimal[] = []

    list.map((tile) => {
        weights.push((tile.maxDamage.minus(tile.damage)).divide(tile.maxDamage))
    })
    const sum = weights.reduce((partialSum, a) => partialSum.add(a), new Decimal(0))
    list.map((tile, i) => {
        addHeat(tile.damageTile(heat.multiply(weights[i].divide(sum))))
    })
    return
}
