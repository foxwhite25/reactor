import { Buildings, Globals } from '@/Variables';
import { player } from '@/Reactor';
import { DOMCacheGetOrSet } from '@/Cache/DOM';
import { BuildingInstance } from '@/Types';
import Decimal from 'break_infinity.js';
import { buildingTooltip, showTooltip } from '@/UpdateHTML';

export const BuyHolding = (row: number, col: number): void => {
    BuyBuilding(row, col, Globals.holdBuilding);
};

export const BuyBuilding = (row: number, col: number, building: Buildings): void => {
    if (building != Buildings.Null && player.buildings[row][col].buildingType != Buildings.Null) {
        return;
    }

    if (building != Buildings.Null && player.money.lessThan(Globals.buildingCost[building])) {
        showTooltip('', `<span style='color: var(--red-color)'>You don't have enough money for ${Globals.buildingName[building]}!</span>`);
        return;
    }

    player.buildings[row][col] = getBuildingInstance(row, col, building);
    player.money = player.money.minus(Globals.buildingCost[building]);
    buildingTooltip(row, col);
    DOMCacheGetOrSet(`map-cell-${row}-${col}`).className = 'map-table-cell ' + Globals.buildingClass[player.buildings[row][col].buildingType];
};

export const getBuildingInstance = (row: number, col: number, building: Buildings): BuildingInstance => {
    return {
        row: row,
        col: col,
        buildingType: building,
        heat: new Decimal(0),
        water: new Decimal(0),
        durability: new Decimal(30),
        tick: Globals.buildingTickFunctions[building],
        description: Globals.buildingDescriptionFunctions[building],
    } as BuildingInstance;
};
