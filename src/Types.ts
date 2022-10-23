import Decimal from 'break_infinity.js';
import { Buildings, Globals, Tabs } from '@/Variables';

export interface Player {
    firstPlayed: string;

    money: Decimal;
    power: Decimal;
    research: Decimal;
    flame: Decimal;

    buildings: BuildingInstance[][];

    setting: {
        theme: string;
    };
}

export interface BuildingInstance {
    row: number;
    col: number;
    buildingType: Buildings;
    heat: Decimal;
    water: Decimal;
    durability: Decimal;
}

export interface GlobalVariables {
    mapWidth: number,
    mapHeight: number,

    buildingTickFunctions: Record<typeof Globals.holdBuilding, ()=>void>
    buildingDescriptionFunctions: Record<typeof Globals.holdBuilding, (b: BuildingInstance)=> {title: string, description: string}>
    maxPower: Decimal
    holdBuilding: Buildings

    currentTab: Tabs;
}

export type PlayerSave = { [P in keyof Player]?: Player[P] | null } & Record<string, unknown>;
