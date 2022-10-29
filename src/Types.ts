import Decimal from 'break_infinity.js';
import { Component, Tabs } from '@/Variables';
import { BaseTile } from '@/Tile';

export interface Player {
    firstPlayed: string;

    money: Decimal;
    power: Decimal;
    research: Decimal;
    heat: Decimal;
    particle: Decimal;

    tiles: BaseTile[][];

    setting: {
        theme: string;
        paused: boolean
        simulation: boolean
    };
}

export interface GlobalVariables {
    mapWidth: number,
    mapHeight: number,
    offsetCol: number[],
    offsetRow: number[],

    maxPower: Decimal
    maxHeat: Decimal
    selectorComponent: Component
    componentQue: { coordinate: Coordinate, component: Component }[]
    stats: {
        heat: Decimal
        power: Decimal
    }
    emptyTiles: BaseTile[]
    shift: boolean
    shiftRemove: boolean

    tooltipIntervalId: number | null
    currentTab: Tabs;
}

export type PlayerSave = { [P in keyof Player]?: Player[P] | null } & Record<string, unknown>;

export interface Coordinate {
    row: number;
    col: number;
}
