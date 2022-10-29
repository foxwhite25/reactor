import { player } from '@/Reactor';
import { DOMCacheGetOrSet } from '@/Cache/DOM';
import { format } from '@/Utils';
import { Component, Globals, Tabs } from '@/Variables';
import { visualUpdateBuildings } from '@/UpdateTabs';
import { buyComponent, buySelectedComponent } from '@/Components';
import { toggleComponent } from '@/Toggles';
import { getTileByComponent } from '@/Tile';
import { clearInterval, setInterval } from './Timers';
import { alignTooltip } from '@/EventListener';

export const setupPage = (): void => {
    const table = document.getElementById('map-table') as HTMLTableElement | null;
    if (!table) {
        throw new TypeError('Element with id "map-table" was not found on page?');
    }
    table.style.width = `${Globals.mapWidth * 32}px`;
    table.style.height = `${Globals.mapHeight * 32}px`;

    for (let i = 0; i < Globals.mapHeight; i++) {
        const row = table.insertRow();
        row.id = `map-row${i}`;
        for (let j = 0; j < Globals.mapWidth; j++) {
            const cell = row.insertCell();
            cell.id = `map-cell-${i}-${j}`;
            const tile = player.tiles[i][j];
            cell.className = `map-table-cell ${tile.id}`;
            if ((i + j) % 2 == 0) {
                cell.style.backgroundColor = 'var(--frontground-color)';
            } else {
                cell.style.backgroundColor = 'var(--blue-color)';
            }
            cell.addEventListener('click', (e) => {
                buySelectedComponent(i, j);
                alignTooltip(e)
                if (e.shiftKey) {
                    Globals.shift = true;
                }
            });
            cell.addEventListener('mouseover', (e) => {
                tileTooltip(i, j);
                alignTooltip(e)
                if (Globals.shift) {
                    buySelectedComponent(i, j);
                }
                if (Globals.shiftRemove) {
                    buyComponent(i, j, Component.Null);
                }
            });
            cell.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                buyComponent(i, j, Component.Null);
                if (e.shiftKey) {
                    Globals.shiftRemove = true;
                }
                return false;
            });
            cell.addEventListener('mouseout', () => {
                hideTooltip();
            });
        }
    }

    const componentBox = document.getElementById('buildings-component-table-container');
    if (componentBox == null) {
        throw new TypeError('Element with id "buildings-component-table-container" was not found on page?');
    }
    const boxRows: HTMLDivElement[] = [];
    Globals.emptyTiles.forEach((tile, index) => {
        const className = tile.id;
        if (tile.id == '') {
            return
        }
        if (boxRows.length - 1 < tile.row) {
            for (let i = 0; i < (tile.row + 1) - boxRows.length; i++) {
                const element = document.createElement('div');
                element.className = 'buildings-component-table-row';
                componentBox.append(element);
                boxRows.push(element);
            }
        }

        const element = document.createElement('button');
        element.className = 'component-button ' + className;
        element.id = className;
        boxRows[tile.row].append(element);

        element.addEventListener('click', () => {
            toggleComponent(index);
        });
        element.addEventListener('mouseover', () => {
            componentTooltip(index);
        });
        element.addEventListener('mouseout', () => {
            hideTooltip();
        });
    });
};

export const hideStuff = (): void => {
    DOMCacheGetOrSet('buildings').style.display = 'none';
    DOMCacheGetOrSet('buildings-tab').style.color = 'var(--foreground-color)';
    DOMCacheGetOrSet('buildings-tab').style.backgroundColor = '';

    DOMCacheGetOrSet('upgrades').style.display = 'none';
    DOMCacheGetOrSet('upgrade-tab').style.color = 'var(--foreground-color)';
    DOMCacheGetOrSet('upgrade-tab').style.backgroundColor = '';

    DOMCacheGetOrSet('researches').style.display = 'none';
    DOMCacheGetOrSet('research-tab').style.color = 'var(--foreground-color)';
    DOMCacheGetOrSet('research-tab').style.backgroundColor = '';

    DOMCacheGetOrSet('map').style.display = 'none';
    DOMCacheGetOrSet('map-tab').style.color = 'var(--foreground-color)';
    DOMCacheGetOrSet('map-tab').style.backgroundColor = '';

    DOMCacheGetOrSet('settings').style.display = 'none';
    DOMCacheGetOrSet('setting-tab').style.color = 'var(--foreground-color)';
    DOMCacheGetOrSet('setting-tab').style.backgroundColor = '';

    const tab = DOMCacheGetOrSet('tab-border');
    const tooltip = DOMCacheGetOrSet('tooltip');

    if (Globals.currentTab == Tabs.Buildings) {
        tab.style.backgroundColor = 'var(--cyan-color)';
        tooltip.style.borderColor = 'var(--cyan-color)';
        DOMCacheGetOrSet('buildings-tab').style.color = 'var(--background-color)';
        DOMCacheGetOrSet('buildings-tab').style.backgroundColor = 'var(--cyan-color)';
        DOMCacheGetOrSet('buildings').style.display = 'flex';
    }
    if (Globals.currentTab == Tabs.Upgrades) {
        tab.style.backgroundColor = 'var(--yellow-color)';
        tooltip.style.borderColor = 'var(--yellow-color)';
        DOMCacheGetOrSet('upgrade-tab').style.color = 'var(--background-color)';
        DOMCacheGetOrSet('upgrade-tab').style.backgroundColor = 'var(--yellow-color)';
        DOMCacheGetOrSet('upgrades').style.display = 'block';
    }
    if (Globals.currentTab == Tabs.Research) {
        tab.style.backgroundColor = 'var(--purple-color)';
        tooltip.style.borderColor = 'var(--purple-color)';
        DOMCacheGetOrSet('research-tab').style.color = 'var(--background-color)';
        DOMCacheGetOrSet('research-tab').style.backgroundColor = 'var(--purple-color)';
        DOMCacheGetOrSet('researches').style.display = 'block';
    }
    if (Globals.currentTab == Tabs.Map) {
        tab.style.backgroundColor = 'var(--green-color)';
        tooltip.style.borderColor = 'var(--green-color)';
        DOMCacheGetOrSet('map-tab').style.color = 'var(--background-color)';
        DOMCacheGetOrSet('map-tab').style.backgroundColor = 'var(--green-color)';
        DOMCacheGetOrSet('map').style.display = 'block';
    }
    if (Globals.currentTab == Tabs.Setting) {
        tab.style.backgroundColor = 'var(--orange-color)';
        tooltip.style.borderColor = 'var(--orange-color)';
        DOMCacheGetOrSet('setting-tab').style.color = 'var(--background-color)';
        DOMCacheGetOrSet('setting-tab').style.backgroundColor = 'var(--orange-color)';
        DOMCacheGetOrSet('settings').style.display = 'block';
    }
};

const visualTab: Record<typeof Globals.currentTab, () => void> = {
    0: visualUpdateBuildings,
    1: visualUpdateBuildings,
    2: visualUpdateBuildings,
    3: visualUpdateBuildings,
    4: visualUpdateBuildings,
};

export const htmlInserts = (): void => {
    // ALWAYS Update these, for they are the most important resources
    const playerRequirements = ['money', 'power', 'research', 'heat', 'particle'] as const;
    const domRequirements = ['money-display', 'power-display', 'research-display', 'heat-display', 'particle-display'] as const;
    for (let i = 0; i < playerRequirements.length; i++) {
        const text = format(player[`${playerRequirements[i]}` as const]);
        const dom = DOMCacheGetOrSet(`${domRequirements[i]}` as const);
        if (dom.textContent !== text) {
            switch (playerRequirements[i]) {
                case 'power':
                    dom.textContent = `${text} / ${format(Globals.maxPower)}`;
                    break;
                case 'heat':
                    dom.textContent = `${text} / ${format(Globals.maxHeat)}`;
                    break;
                default:
                    dom.textContent = text;
            }
        }
    }

    DOMCacheGetOrSet('power-bar').style.width = `${player.power.multiply(100).divide(Globals.maxPower)}%`;
    DOMCacheGetOrSet('heat-bar').style.width = `${player.heat.multiply(100).divide(Globals.maxHeat)}%`;
    visualTab[Globals.currentTab]();
};

export const tileTooltip = (row: number, col: number): void => {
    const tile = player.tiles[row][col]
    if (tile.id == '') {
        return
    }
    showTooltip(tile.info(row, col), tile.title)
    Globals.tooltipIntervalId = setInterval(()=>{
        const tile = player.tiles[row][col];
        DOMCacheGetOrSet('description-content').innerHTML = tile.info(row, col)
    }, 100)
};

export const componentTooltip = (component: Component): void => {
    const tile = Globals.emptyTiles[component]
    if (tile.id != '') {
        showTooltip(tile.info(undefined, undefined), tile.title);
    }
};

export const showTooltip = (description: string, title: string): void => {
    DOMCacheGetOrSet('tooltip').style.display = 'block';
    DOMCacheGetOrSet('description-title').innerHTML = title;
    DOMCacheGetOrSet('description-content').innerHTML = description;
};

export const hideTooltip = (): void => {
    if (Globals.tooltipIntervalId != null) {
        clearInterval(Globals.tooltipIntervalId)
        Globals.tooltipIntervalId = null
    }
    DOMCacheGetOrSet('tooltip').style.display = 'none';
};

export const processComponentQue = (): void => {
    for (const componentSet of Globals.componentQue) {
        const c = componentSet.coordinate;
        const component = componentSet.component;
        player.tiles[c.row][c.col] = getTileByComponent(component);
    }
    Globals.componentQue = [];
};
