import { GlobalVariables } from '@/Types';
import Decimal from 'break_infinity.js';
import { player } from '@/Reactor';

export enum Tabs {
    Buildings,
    Upgrades,
    Research,
    Setting,
    Map,
}

export enum Buildings {
    Null = '',
    WindTurbine = 'turbine',
    SolarPanel = 'solar-panel'
}

export const Globals: GlobalVariables = {
    mapWidth: 34,
    mapHeight: 17,

    buildingTickFunctions: {
        '': () => {
            return;
        },
        'turbine': () => {
            player.power = player.power.add(1);
        },
        'solar-panel': () => {
            return;
        },
    },

    buildingDescriptionFunctions: {
        '': () => '',
        'turbine': (b) => `Produce <span style='color: var(--cyan-color)'>1</span> power. <br>Durability: ${b.durability}/30`,
        'solar-panel': () => 'Foo bar test test',
    },

    maxPower: new Decimal(500),
    holdBuilding: Buildings.Null,

    currentTab: Tabs.Buildings,
};

export const blankGlobals = { ...Globals };
