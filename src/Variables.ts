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
            player.power = player.power.add(0.15);
        },
        'solar-panel': () => {
            return;
        },
    },
    buildingDescriptionFunctions: {
        '': () => {
            return 'You can add components to this tile. You can start with wind turbines, they produce power that you can sell for more money.';
        },
        'turbine': (b) => {
            return `Produce <span style='color:var(--cyan-color)'>0.15</span> power. <br>Durability: ${b.durability}/30`;
        },
        'solar-panel': (b) => {
            return `Produce <span style='color:var(--red-color)'>3</span> heat. <br>Durability: ${b.durability}/30`;
        },
    },
    componentDescription: {
        '': '',
        'turbine': 'Cost: <span style=\'color:var(--yellow-color)\'>10</span> <br> Produce <span style=\'color:var(--cyan-color)\'>0.15</span> power.',
        'solar-panel': 'Cost: <span style=\'color:var(--yellow-color)\'>100</span> <br> Produce <span style=\'color:var(--red-color)\'>3</span> heat.',
    },
    buildingName: {
        '': 'Empty Tile',
        'turbine': 'Wind Turbine',
        'solar-panel': 'Solar Panel',
    },
    buildingCost: {
        '': new Decimal(0),
        'turbine': new Decimal(10),
        'solar-panel': new Decimal(100),
    },

    maxPower: new Decimal(500),
    holdBuilding: Buildings.Null,

    currentTab: Tabs.Buildings,
};

export const blankGlobals = { ...Globals };
