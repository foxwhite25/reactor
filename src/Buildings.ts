import { Globals } from '@/Variables';
import { player } from '@/Reactor';
import { DOMCacheGetOrSet } from '@/Cache/DOM';

export const BuyBuilding = (row: number, col: number) :void => {
    player.buildings[row][col] = Globals.holdBuilding
    DOMCacheGetOrSet(`map-cell-${row}-${col}`).className = 'map-table-cell ' + player.buildings[row][col]
}
