import { player } from '@/Reactor';
import { DOMCacheGetOrSet } from '@/Cache/DOM';
import { format } from '@/Utils';
import { Globals, Tabs } from '@/Variables';
import { visualUpdateBuildings } from '@/UpdateTabs';
import { GetBuyBuildingFunction } from '@/Buildings';

export const setupMapTable = ():void => {
    const table = document.getElementById('map-table') as HTMLTableElement | null
    if (!table) {
        throw new TypeError('Element with id "map-table" was not found on page?');
    }
    table.style.width = `${Globals.mapWidth * 32}px`
    table.style.height = `${Globals.mapHeight * 32}px`

    for (let i = 0; i < Globals.mapHeight; i++) {
        const row = table.insertRow()
        row.id = `map-row${i}`
        for (let j = 0; j < Globals.mapWidth; j++) {
            const cell = row.insertCell()
            cell.id = `map-cell-${i}-${j}`
            cell.className = 'map-table-cell'
            cell.addEventListener('click', GetBuyBuildingFunction(i, j))
        }
    }
}

export const hideStuff = () :void => {
    DOMCacheGetOrSet('buildings').style.display = 'none'
    DOMCacheGetOrSet('buildings-tab').style.color = 'var(--foreground-color)'
    DOMCacheGetOrSet('buildings-tab').style.backgroundColor = '';

    DOMCacheGetOrSet('upgrades').style.display = 'none'
    DOMCacheGetOrSet('upgrade-tab').style.color = 'var(--foreground-color)'
    DOMCacheGetOrSet('upgrade-tab').style.backgroundColor = ''

    DOMCacheGetOrSet('researches').style.display = 'none'
    DOMCacheGetOrSet('research-tab').style.color = 'var(--foreground-color)'
    DOMCacheGetOrSet('research-tab').style.backgroundColor = ''

    DOMCacheGetOrSet('map').style.display = 'none'
    DOMCacheGetOrSet('map-tab').style.color = 'var(--foreground-color)'
    DOMCacheGetOrSet('map-tab').style.backgroundColor = ''

    DOMCacheGetOrSet('settings').style.display = 'none'
    DOMCacheGetOrSet('setting-tab').style.color = 'var(--foreground-color)'
    DOMCacheGetOrSet('setting-tab').style.backgroundColor = ''

    const tab = DOMCacheGetOrSet('tab-border');

    if (Globals.currentTab == Tabs.Buildings) {
        tab.style.backgroundColor = 'var(--cyan-color)';
        DOMCacheGetOrSet('buildings-tab').style.color = 'var(--background-color)'
        DOMCacheGetOrSet('buildings-tab').style.backgroundColor = 'var(--cyan-color)';
        DOMCacheGetOrSet('buildings').style.display = 'flex'
    }
    if (Globals.currentTab == Tabs.Upgrades) {
        tab.style.backgroundColor = 'var(--yellow-color)';
        DOMCacheGetOrSet('upgrade-tab').style.color = 'var(--background-color)'
        DOMCacheGetOrSet('upgrade-tab').style.backgroundColor = 'var(--yellow-color)';
        DOMCacheGetOrSet('upgrades').style.display = 'block'
    }
    if (Globals.currentTab == Tabs.Research) {
        tab.style.backgroundColor = 'var(--purple-color)'
        DOMCacheGetOrSet('research-tab').style.color = 'var(--background-color)'
        DOMCacheGetOrSet('research-tab').style.backgroundColor = 'var(--purple-color)';
        DOMCacheGetOrSet('researches').style.display = 'block'
    }
    if (Globals.currentTab == Tabs.Map) {
        tab.style.backgroundColor = 'var(--green-color)'
        DOMCacheGetOrSet('map-tab').style.color = 'var(--background-color)'
        DOMCacheGetOrSet('map-tab').style.backgroundColor = 'var(--green-color)';
        DOMCacheGetOrSet('map').style.display = 'block'
    }
    if (Globals.currentTab == Tabs.Setting) {
        tab.style.backgroundColor = 'var(--orange-color)'
        DOMCacheGetOrSet('setting-tab').style.color = 'var(--background-color)'
        DOMCacheGetOrSet('setting-tab').style.backgroundColor = 'var(--orange-color)';
        DOMCacheGetOrSet('settings').style.display = 'block'
    }
}

const visualTab: Record<typeof Globals.currentTab, () => void> = {
    0:visualUpdateBuildings,
    1:visualUpdateBuildings,
    2:visualUpdateBuildings,
    3:visualUpdateBuildings,
    4:visualUpdateBuildings,
};

export const htmlInserts = (): void => {
    // ALWAYS Update these, for they are the most important resources
    const playerRequirements = ['money', 'power', 'research', 'flame'] as const;
    const domRequirements = ['money-display', 'power-display', 'research-display', 'flame-display'] as const;
    for (let i = 0; i < playerRequirements.length; i++) {
        const text = format(player[`${playerRequirements[i]}` as const]);
        const dom = DOMCacheGetOrSet(`${domRequirements[i]}` as const);
        if (dom.textContent !== text) {
            if (playerRequirements[i] == 'power') {
                dom.textContent = `${text} / ${format(Globals.maxPower)}`
            } else {
                dom.textContent = text;
            }
        }
    }

    DOMCacheGetOrSet('power-bar').style.width = `${player.power.div(5)}%`
    visualTab[Globals.currentTab]()
};
