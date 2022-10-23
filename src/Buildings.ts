import { Buildings, Globals } from '@/Variables';
import { player } from '@/Reactor';
import { DOMCacheGetOrSet } from '@/Cache/DOM';
import { BuildingInstance } from '@/Types';
import Decimal from 'break_infinity.js';

export const BuyBuilding = (row: number, col: number): void => {
    player.buildings[row][col] = getBuildingInstance(row, col, Globals.holdBuilding);
    DOMCacheGetOrSet(`map-cell-${row}-${col}`).className = 'map-table-cell ' + player.buildings[row][col].buildingType;
};

export const getBuildingInstance = (row: number, col: number, building: Buildings): BuildingInstance => {
    return {
        row: row,
        col: col,
        buildingType: building,
        heat: new Decimal(0),
        water: new Decimal(0),
        durability: new Decimal(0),
        tick: Globals.buildingTickFunctions[building],
        description: Globals.buildingDescriptionFunctions[building],
    } as BuildingInstance;
};
