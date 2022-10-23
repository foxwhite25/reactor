import Decimal from 'break_infinity.js';
import { Buildings, Tabs } from '@/Variables';

export interface Player {
    firstPlayed: string;

    money: Decimal;
    power: Decimal;
    research: Decimal;
    flame: Decimal;

    buildings: Buildings[][];

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
    description: (b: BuildingInstance) => string;
    tick: () => void;
}

export interface GlobalVariables {
    mapWidth: number,
    mapHeight: number,
    emptyBoard: Buildings[][],

    maxPower: Decimal
    holdBuilding: Buildings

    currentTab: Tabs;
}

export type PlayerSave = { [P in keyof Player]?: Player[P] | null } & Record<string, unknown>;
