import Decimal from 'break_infinity.js';
import { Component, Tabs } from '@/Variables';
import { Components } from '@/Components';
import { Tile, TileExtra } from '@/Tile';

export interface Player {
    firstPlayed: string;

    money: Decimal;
    power: Decimal;
    research: Decimal;
    heat: Decimal;
    particle: Decimal;

    tiles: (Tile | null)[][];

    setting: {
        theme: string;
    };
}

export interface GlobalVariables {
    mapWidth: number,
    mapHeight: number,

    componentsData: Components[]
    tileExtras: TileExtra[][]

    maxPower: Decimal
    maxHeat: Decimal
    selectorComponent: Component | null
    componentQue: { coordinate: Coordinate, component: Component | null }[]
    shift: boolean
    shiftRemove: boolean

    currentTab: Tabs;
}

export type PlayerSave = { [P in keyof Player]?: Player[P] | null } & Record<string, unknown>;

export interface Coordinate {
    row: number;
    col: number;
}
