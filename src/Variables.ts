import { BuildingInstance, GlobalVariables } from '@/Types';
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
    Null,
    WindTurbine,
    SolarPanel
}

const emptyFunction = (): void => {
    return;
};

export const Globals: GlobalVariables = {
    mapWidth: 34,
    mapHeight: 17,

    buildingClass: [
        '',
        'turbine',
        'solar-panel',
    ],
    buildingTickFunctions: [
        emptyFunction,
        (): void => {
            player.power = player.power.add(0.15);
        },
        emptyFunction,
    ],
    buildingDescriptionFunctions: [
        (): string => {
            return 'You can add components to this tile. You can start with wind turbines, they produce power that you can sell for more money.';
        },
        (b: BuildingInstance): string => {
            return `Produce <span style='color:var(--cyan-color)'>0.15</span> power. <br>Durability: ${b.durability}/30`;
        },
        (b: BuildingInstance): string => {
            return `Produce <span style='color:var(--red-color)'>3</span> heat. <br>Durability: ${b.durability}/30`;
        },
    ],
    // Edit after declaration
    componentDescription: [],
    buildingName: [
        'Empty Tile',
        'Wind Turbine',
        'Solar Panel',
    ],
    buildingCost: [
        new Decimal(0),
        new Decimal(10),
        new Decimal(100),
    ],

    maxPower: new Decimal(500),
    holdBuilding: Buildings.Null,
    shift: false,

    currentTab: Tabs.Buildings,
};

Globals.componentDescription = [
    '',
    `Cost: <span style='color:var(--yellow-color)'>${Globals.buildingCost[Buildings.WindTurbine]}</span> <br> Produce <span style='color:var(--cyan-color)'>0.15</span> power.`,
    `Cost: <span style='color:var(--yellow-color)'>${Globals.buildingCost[Buildings.SolarPanel]}</span> <br> Produce <span style='color:var(--red-color)'>3</span> heat.`,
];

export const blankGlobals = { ...Globals };
