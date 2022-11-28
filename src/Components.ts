import { Component, Globals } from '@/Variables';
import { player } from '@/Reactor';
import { hideTooltip, showTooltip, tileTooltip } from '@/UpdateHTML';
import { DOMCacheGetOrSet } from '@/Cache/DOM';
import { getTileByComponent } from '@/Tile';
import Decimal from 'break_infinity.js';

export const buySelectedComponent = (row: number, col: number): void => {
    buyComponent(row, col, Globals.selectedComponent);
};

export const buyComponent = (row: number, col: number, component: Component, immediate = false): void => {
    if (component != Component.Null && player.tiles[row][col].id != '') {
        return;
    }
    if (!immediate) {
        for (const buildingQueElement of Globals.componentQue) {
            if (buildingQueElement.coordinate.col == row && buildingQueElement.coordinate.col == row) {
                return;
            }
        }
    }
    if (component != Component.Null && player.money.lessThan(Globals.emptyTiles[component].cost)) {
        Globals.tooltipFunction = () => {
            return {title: '', content: `<span style='color: var(--red-color)'>You don't have enough money for ${Globals.emptyTiles[component].title}!</span>`}
        }
        showTooltip();
        return;
    }

    const original = player.tiles[row][col]
    if (!immediate) {
        Globals.componentQue.push({
            component: component,
            coordinate: {
                col: col,
                row: row,
            },
        });
    } else {
        player.tiles[row][col] = getTileByComponent(component);
    }

    if (component != Component.Null) {
        tileTooltip(row, col);
    } else {
        hideTooltip()
        if (original.isDamageableItem()) {
            player.money = player.money.add(original.cost.multiply(new Decimal(1).minus(original.getRelativeDamage())).divide(2))
        } else {
            player.money = player.money.add(original.cost)
        }
    }

    let classname = 'map-table-cell ';
    if (Globals.emptyTiles[component].maxDamage.greaterThan(0)) {
        if (Globals.emptyTiles[component].isCoolant()) {
            DOMCacheGetOrSet(`map-bar-${row}-${col}`).style.width = '0%';
            DOMCacheGetOrSet(`map-bar-${row}-${col}`).style.backgroundColor = 'var(--red-color)'
        } else {
            DOMCacheGetOrSet(`map-bar-${row}-${col}`).style.width = '100%';
            DOMCacheGetOrSet(`map-bar-${row}-${col}`).style.backgroundColor = 'var(--green-color)'
        }
        DOMCacheGetOrSet(`map-bar-${row}-${col}`).style.display = 'initial'
    } else {
        DOMCacheGetOrSet(`map-bar-${row}-${col}`).style.display = 'none'
    }
    classname += Globals.emptyTiles[component].id;
    player.money = player.money.minus(Globals.emptyTiles[component].cost);
    DOMCacheGetOrSet(`map-cell-${row}-${col}`).className = classname;
};
