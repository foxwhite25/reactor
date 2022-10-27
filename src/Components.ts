import Decimal from 'break_infinity.js';
import { format } from '@/Utils';
import { Component, Globals } from '@/Variables';
import { player } from '@/Reactor';
import { componentTooltip, showTooltip } from '@/UpdateHTML';
import { DOMCacheGetOrSet } from '@/Cache/DOM';

interface BaseComponent {
    id: string;
    row: number;
    title: string;
    baseDescription: string;
    baseCost: Decimal;
}

export interface Generator extends BaseComponent {
    basePower: Decimal;
    baseHeat: Decimal;
    baseTicks: Decimal;
    cells: Decimal;
}

export interface NeutronReflector extends BaseComponent {
    basePulse: Decimal;
}

interface CoolantCell extends BaseComponent {
    baseMaxHeat: Decimal;
}

export interface Capacitor extends CoolantCell {
    baseReactorPower: Decimal;
}

export interface Vent extends CoolantCell {
    baseHeatDissipate: Decimal;
}

export interface HeatExchanger extends CoolantCell {
    baseTransfer: Decimal;
}

export interface Plating extends CoolantCell {
    baseReactorHeat: Decimal;
    baseReactorProtection: Decimal;
}

export type Components
  = Plating
  | HeatExchanger
  | Vent
  | Capacitor
  | NeutronReflector
  | Generator

export const getComponentsDescription = (c: Components): string => {
    return c.baseDescription
        .replace(/%power/, 'basePower' in c ? `<span style='color: var(--cyan-color)'>${format(c.basePower)}</span>` : 'null')
        .replace(/%heat-dissipate/, 'baseHeatDissipate' in c ? `<span style='color: var(--red-color)'>${format(c.baseHeatDissipate)}</span>` : 'null')
        .replace(/%cost/, `<span style='color: var(--yellow-color)'>${format(c.baseCost)}</span>`)
};

export const buySelectedComponent = (row: number, col: number): void => {
    buyComponent(row, col, Globals.selectorComponent);
};

export const buyComponent = (row: number, col: number, component: Component | null): void => {
    if (component != null && player.tiles[row][col] != null) {
        return;
    }

    for (const buildingQueElement of Globals.componentQue) {
        if (buildingQueElement.coordinate.col == row && buildingQueElement.coordinate.col == row) {
            return;
        }
    }

    if (component != null && player.money.lessThan(Globals.componentsData[component].baseCost)) {
        showTooltip('', `<span style='color: var(--red-color)'>You don't have enough money for ${Globals.componentsData[component].title}!</span>`);
        return;
    }

    Globals.componentQue.push({
        component: component,
        coordinate: {
            col: col,
            row: row,
        },
    });
    componentTooltip(component);
    let classname = 'map-table-cell ';
    if (component != null) {
        classname += Globals.componentsData[component].id;
        player.money = player.money.minus(Globals.componentsData[component].baseCost);
    }
    DOMCacheGetOrSet(`map-cell-${row}-${col}`).className = classname;
};

