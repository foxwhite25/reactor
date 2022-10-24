import Decimal from 'break_infinity.js';
import { Buildings, Tabs } from '@/Variables';

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

    buildingClass: string[],
    buildingTickFunctions: (() => void)[]
    buildingDescriptionFunctions: ((b: BuildingInstance) => string)[]
    componentDescription: string[]
    buildingName: string[]
    buildingCost: Decimal[]

    maxPower: Decimal
    holdBuilding: Buildings
    shift: boolean
    shiftRemove: boolean

    currentTab: Tabs;
}

export type PlayerSave = { [P in keyof Player]?: Player[P] | null } & Record<string, unknown>;
