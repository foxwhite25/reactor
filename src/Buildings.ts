import { Buildings, Globals } from '@/Variables';
import { player } from '@/Reactor';
import { DOMCacheGetOrSet } from '@/Cache/DOM';
import { BuildingInstance } from '@/Types';
import Decimal from 'break_infinity.js';
import { updateBuildingDescription, updateDescription } from '@/UpdateHTML';

export const BuyBuilding = (row: number, col: number): void => {
    if (player.money.lessThan(Globals.buildingCost[Globals.holdBuilding])) {
        updateDescription('', `<span style='color: var(--red-color)'>You don't have enough money for ${Globals.buildingName[Globals.holdBuilding]}!</span>`);
        return;
    }

    player.buildings[row][col] = getBuildingInstance(row, col, Globals.holdBuilding);
    player.money = player.money.minus(Globals.buildingCost[Globals.holdBuilding]);
    updateBuildingDescription(row, col);
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
