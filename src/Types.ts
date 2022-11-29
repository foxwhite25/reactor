import Decimal from 'break_infinity.js';
import { Component, Tabs } from '@/Variables';
import { BaseTile, HeatVent } from '@/Tile';
import { BaseUpgrade } from '@/Upgrades';

export interface Player {
    firstPlayed: string;

    money: Decimal;
    power: Decimal;
    research: Decimal;
    heat: Decimal;
    particle: Decimal;

    tiles: BaseTile[][];

    upgrades: BaseUpgrade[];

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
    ticks: number,

    maxPower: Decimal
    maxHeat: Decimal
    selectedComponent: Component
    componentQue: { coordinate: Coordinate, component: Component }[]
    vents: HeatVent[]
    stats: {
        heat: Decimal
        power: Decimal
    }
    emptyTiles: BaseTile[]
    shift: boolean
    ctrl: boolean
    shiftAdd: boolean
    shiftRemove: boolean

    tooltipFunction: () => {title: string, content: string}
    currentTab: Tabs;
}

export type PlayerSave = { [P in keyof Player]?: Player[P] | null } & Record<string, unknown>;

export interface Coordinate {
    row: number;
    col: number;
}
