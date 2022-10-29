import { Component, Globals } from '@/Variables';
import { player } from '@/Reactor';
import { componentTooltip, hideTooltip, showTooltip } from '@/UpdateHTML';
import { DOMCacheGetOrSet } from '@/Cache/DOM';

export const buySelectedComponent = (row: number, col: number): void => {
    buyComponent(row, col, Globals.selectorComponent);
};

export const buyComponent = (row: number, col: number, component: Component): void => {
    if (component != Component.Null && player.tiles[row][col].id != '') {
        return;
    }

    for (const buildingQueElement of Globals.componentQue) {
        if (buildingQueElement.coordinate.col == row && buildingQueElement.coordinate.col == row) {
            return;
        }
    }

    if (component != Component.Null && player.money.lessThan(Globals.emptyTiles[component].cost)) {
        showTooltip('', `<span style='color: var(--red-color)'>You don't have enough money for ${Globals.emptyTiles[component].title}!</span>`);
        return;
    }

    Globals.componentQue.push({
        component: component,
        coordinate: {
            col: col,
            row: row,
        },
    });
    if (component != Component.Null) {
        componentTooltip(component);
    } else {
        hideTooltip()
    }

    let classname = 'map-table-cell ';
    if (Globals.emptyTiles[component].maxDamage.greaterThan(0)) {
        DOMCacheGetOrSet(`map-bar-${row}-${col}`).style.display = 'initial'
        if (Globals.emptyTiles[component].isCoolant()) {
            DOMCacheGetOrSet(`map-bar-${row}-${col}`).style.backgroundColor = 'var(--red-color)'
        } else {
            DOMCacheGetOrSet(`map-bar-${row}-${col}`).style.backgroundColor = 'var(--green-color)'
        }
    } else {
        DOMCacheGetOrSet(`map-bar-${row}-${col}`).style.display = 'none'
    }
    classname += Globals.emptyTiles[component].id;
    player.money = player.money.minus(Globals.emptyTiles[component].cost);
    DOMCacheGetOrSet(`map-cell-${row}-${col}`).className = classname;
};

