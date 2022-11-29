import { player } from '@/Reactor';
import { DOMCacheGetOrSet } from '@/Cache/DOM';
import { format, getKeyMultiplier } from '@/Utils';
import { Component, Globals, Tabs } from '@/Variables';
import { visualUpdateBuildings, visualUpdateUpgrades } from '@/UpdateTabs';
import { buyComponent, buySelectedComponent } from '@/Components';
import { toggleComponent } from '@/Toggles';
import { getTileByComponent } from '@/Tile';
import { alignTooltip } from '@/EventListener';
import { BaseUpgrade, buyUpgrade, refundUpgrade } from '@/Upgrades';

function setupBuildings() {
    const componentBox = document.getElementById('buildings-component-table-container');
    if (componentBox == null) {
        throw new TypeError('Element with id "buildings-component-table-container" was not found on page?');
    }
    const boxRows: HTMLDivElement[] = [];
    Globals.emptyTiles.forEach((tile, index) => {
        const className = tile.id;
        if (tile.id == '') {
            return;
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
}

function setupCells() {
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
                alignTooltip(e);
                if (e.shiftKey) {
                    Globals.shiftAdd = true;
                }
            });
            cell.addEventListener('mouseover', (e) => {
                tileTooltip(i, j);
                alignTooltip(e);
                if (Globals.shiftAdd) {
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

            const barContainer = document.createElement('div');
            barContainer.className = 'durability-bar-container';

            const bar = document.createElement('div');
            bar.id = `map-bar-${i}-${j}`;
            bar.className = 'durability-bar';
            barContainer.append(bar);

            cell.append(barContainer);
        }
    }
}

function setupUpgrades() {
    const componentBox = DOMCacheGetOrSet('upgrades-table-container');
    if (componentBox == null) {
        throw new TypeError('Element with id "upgrades-table-container" was not found on page?');
    }
    let div: HTMLDivElement;
    player.upgrades.forEach((upgrade, index) => {
        if (index % 2 == 0) {
            div = document.createElement('div')
            div.className = 'upgrades-table-row'
            componentBox.append(div)
        }
        const container = document.createElement('div')
        container.className = 'upgrade-container'
        container.id = upgrade.id
        div.append(container)

        const u = document.createElement('div')
        u.className = 'upgrade'
        container.append(u)

        const image = document.createElement('div')
        image.className = 'upgrade-image'
        image.id = `upgrade-image-${upgrade.id}`
        u.append(image)

        const desc = document.createElement('span')
        desc.className = 'upgrade-desc'
        let innerText = upgrade.title + ' ' + format(upgrade.count);
        if (upgrade.max != -1) {
            innerText += '/' + format(upgrade.max)
        }
        desc.innerText = innerText
        desc.id = `upgrade-desc-${upgrade.id}`
        u.append(desc)

        const bMax = document.createElement('button')
        bMax.className = 'upgrade-max'
        u.append(bMax)
        bMax.id = `upgrade-max-${upgrade.id}`
        bMax.innerText = '+MAX'
        bMax.addEventListener('click', ()=>{
            buyUpgrade(upgrade, upgrade.getMaxNumber(player.money))
        })
        bMax.addEventListener('mouseover', () => {
            upgradeTooltip(upgrade, 'posMax');
        });
        bMax.addEventListener('mouseout', () => {
            hideTooltip();
        });

        const bPos = document.createElement('button')
        bPos.className = 'upgrade-pos'
        u.append(bPos)
        bPos.id = `upgrade-pos-${upgrade.id}`
        bPos.innerText = '+1'
        bPos.addEventListener('click', ()=>{
            buyUpgrade(upgrade, getKeyMultiplier())
        })
        bPos.addEventListener('mouseover', () => {
            upgradeTooltip(upgrade, 'pos');
        });
        bPos.addEventListener('mouseout', () => {
            hideTooltip();
        });

        const bNeg = document.createElement('button')
        bNeg.className = 'upgrade-neg'
        u.append(bNeg)
        bNeg.id = `upgrade-neg-${upgrade.id}`
        bNeg.innerText = '-1'
        bNeg.addEventListener('click', ()=>{
            refundUpgrade(upgrade, getKeyMultiplier())
        })
        bNeg.addEventListener('mouseover', () => {
            upgradeTooltip(upgrade, 'neg');
        });
        bNeg.addEventListener('mouseout', () => {
            hideTooltip();
        });

        const bMin = document.createElement('button')
        bMin.className = 'upgrade-min'
        u.append(bMin)
        bMin.id = `upgrade-min-${upgrade.id}`
        bMin.innerText = '-MAX'
        bMin.addEventListener('click', ()=>{
            refundUpgrade(upgrade, upgrade.count)
        })
        bMin.addEventListener('mouseover', () => {
            upgradeTooltip(upgrade, 'negMax');
        });
        bMin.addEventListener('mouseout', () => {
            hideTooltip();
        });
    })
}

export const setupPage = (): void => {
    setupCells();
    setupBuildings();
    setupUpgrades();
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
    1: visualUpdateUpgrades,
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
    const tt = Globals.tooltipFunction()
    DOMCacheGetOrSet('description-title').innerHTML = tt.title;
    DOMCacheGetOrSet('description-content').innerHTML = tt.content;

    DOMCacheGetOrSet('power-bar').style.width = `${player.power.multiply(100).divide(Globals.maxPower)}%`;
    DOMCacheGetOrSet('heat-bar').style.width = `${player.heat.multiply(100).divide(Globals.maxHeat)}%`;
    visualTab[Globals.currentTab]();
};

export const tileTooltip = (row: number, col: number): void => {
    const tile = player.tiles[row][col]
    if (tile.id != '') {
        Globals.tooltipFunction = () => {
            const tile = player.tiles[row][col];
            return {title: tile.title, content: tile.info(row, col)}
        }
        showTooltip()
    }
};

export const componentTooltip = (component: Component): void => {
    const tile = Globals.emptyTiles[component]
    if (tile.id != '') {
        Globals.tooltipFunction = () => {
            return {title: tile.title, content: tile.info(undefined, undefined)}
        }
        showTooltip();
    }
};

export const upgradeTooltip = (upgrade: BaseUpgrade, t: 'posMax' | 'pos' | 'neg' | 'negMax'): void => {
    Globals.tooltipFunction = () => {
        const replaceStr = (t: 'posMax' | 'pos' | 'neg' | 'negMax'): string => {
            switch (t) {
                case 'posMax': {
                    const numberToBuy = upgrade.getMaxNumber(player.money);
                    if (numberToBuy == 0 && upgrade.max != upgrade.count) {
                        return `Cost: <span style='color: var(--red-color)'>${format(upgrade.getSingleCost())}$</span>`;
                    }
                    return `Cost: <span style='color: var(--green-color)'>${format(upgrade.getBulkCost(numberToBuy))}$</span> (+${format(numberToBuy)})`;
                }
                case 'pos': {
                    const cost = upgrade.getBulkCost(getKeyMultiplier());
                    if (player.money.lessThan(cost)) {
                        return `Cost: <span style='color: var(--red-color)'>${format(upgrade.getBulkCost(getKeyMultiplier()))}$</span>`;
                    }
                    return `Cost: <span style='color: var(--green-color)'>${format(upgrade.getBulkCost(getKeyMultiplier()))}$</span>`;
                }
                case 'neg': {
                    const refundCount = Math.min(getKeyMultiplier(), upgrade.count)
                    const refundAmount = upgrade.getBulkCostWithCount(refundCount, upgrade.count - refundCount)
                    return `Refund: <span style='color: var(--green-color)'>${format(refundAmount)}$</span> (-${refundCount})`;
                }
                case 'negMax': {
                    const refundCount = upgrade.count
                    const refundAmount = upgrade.getBulkCostWithCount(refundCount, upgrade.count - refundCount)
                    return `Refund: <span style='color: var(--green-color)'>${format(refundAmount)}$</span> (-${refundCount})`;
                }
            }
        }
        return {title: upgrade.title, content: upgrade.info().replace('%cost', replaceStr(t))}
    }
    showTooltip()
}

export const showTooltip = (): void => {
    const tt = Globals.tooltipFunction()
    DOMCacheGetOrSet('description-title').innerHTML = tt.title;
    DOMCacheGetOrSet('description-content').innerHTML = tt.content;
    DOMCacheGetOrSet('tooltip').style.visibility = 'visible';
};

export const hideTooltip = (): void => {
    Globals.tooltipFunction = () => {
        return {title: '', content: ''}
    }
    DOMCacheGetOrSet('tooltip').style.visibility = 'hidden';
};

export const processComponentQue = (): void => {
    let lastX = 0
    let lastY = 0
    let exist = false
    Globals.componentQue.map((componentSet) => {
        const c = componentSet.coordinate;
        const component = componentSet.component;
        player.tiles[c.row][c.col] = getTileByComponent(component);
        lastX = c.row
        lastY = c.col
        exist = true
    })
    if (exist) {
        tileTooltip(lastX, lastY)
    }
    Globals.componentQue.length = 0;
};
