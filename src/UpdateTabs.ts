import { Globals, Tabs } from '@/Variables';
import { player } from '@/Reactor';
import { DOMCacheGetOrSet } from '@/Cache/DOM';
import { format } from '@/Utils';

export const visualUpdateBuildings = (): void => {
    if (Globals.currentTab != Tabs.Buildings) {
        return;
    }
    player.tiles.map((tiles, i) => {
        tiles.map((tile,j) => {
            if (tile.id == '' || tile.maxDamage.lessThanOrEqualTo(0)) {
                return
            }
            const bar = DOMCacheGetOrSet(`map-bar-${i}-${j}`)
            bar.style.width = `${format((tile.maxDamage.minus(tile.damage)).divide(tile.maxDamage).multiply(100))}%`
        })
    })
};
