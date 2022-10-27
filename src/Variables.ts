import { GlobalVariables } from '@/Types';
import Decimal from 'break_infinity.js';

export enum Tabs {
    Buildings,
    Upgrades,
    Research,
    Setting,
    Map,
}

export enum Component {
    WindTurbine,
    Vent_1
}

export const Globals: GlobalVariables = {
    mapWidth: 34,
    mapHeight: 17,


    componentsData: [
        {
            id: 'wind-turbine',
            title: 'Wind Turbine',
            row: 0,
            baseDescription: 'Cost: %cost <br>Generate %power power',
            baseCost: new Decimal(10),
            basePower: new Decimal(1),
            baseHeat: new Decimal(0),
            baseTicks: new Decimal(30),
            cells: new Decimal(0),
        },
        {
            id: 'vent-1',
            title: 'Standard Vent',
            row: 0,
            baseDescription: 'Cost: %cost <br>Vent %heat-dissipate heat.',
            baseCost: new Decimal(10),
            baseMaxHeat: new Decimal(1),
            baseHeatDissipate: new Decimal(1),
        },
    ],
    tileExtras: [],

    maxPower: new Decimal(500),
    maxHeat: new Decimal(500),
    selectorComponent: null,
    componentQue: [],
    shift: false,
    shiftRemove: false,

    currentTab: Tabs.Buildings,
};

for (let i = 0; i < Globals.mapHeight; i++) {
    Globals.tileExtras.push([]);
    for (let j = 0; j < Globals.mapWidth; j++) {
        Globals.tileExtras[i].push({
            coordinate: {
                row: i,
                col: j,
            },
            heat: new Decimal(0),
            power: new Decimal(0),
            containment: [],
            cells: [],
            reflectors: [],
            activated: false,
            enabled: false,
            updated: false,
        });
    }
}

export const blankGlobals = { ...Globals };
