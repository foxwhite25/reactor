import { Globals, Tabs } from '@/Variables';
import { player } from '@/Reactor';
import { DOMCacheGetOrSet } from '@/Cache/DOM';
import { format, getKeyMultiplier } from '@/Utils';

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
            if (tile.isCoolant()) {
                bar.style.width = `${format((tile.damage.divide(tile.maxDamage).multiply(100)))}%`;
            } else {
                bar.style.width = `${format((tile.maxDamage.minus(tile.damage)).divide(tile.maxDamage).multiply(100))}%`;
            }
        })
    })
};

export const visualUpdateUpgrades = (): void => {
    if (Globals.currentTab != Tabs.Upgrades) {
        return;
    }
    player.upgrades.map((upgrade) => {
        DOMCacheGetOrSet(`upgrade-desc-${upgrade.id}`).innerText = upgrade.title + ' ' + format(upgrade.count)
        DOMCacheGetOrSet(`upgrade-pos-${upgrade.id}`).innerText = `+${getKeyMultiplier()}`
        DOMCacheGetOrSet(`upgrade-neg-${upgrade.id}`).innerText = `-${getKeyMultiplier()}`
    })
};
