import { DOMCacheGetOrSet } from '@/Cache/DOM';
import { player } from '@/Reactor';
import { toggleBuildings, toggleTabs } from '@/Toggles';
import { Globals, Tabs } from '@/Variables';
import { componentTooltip, hideTooltip } from '@/UpdateHTML';

export const generateEventHandlers = (): void => {
    document.addEventListener('mousemove', (e) => {
        const tooltip = DOMCacheGetOrSet('tooltip');

        // Get calculated ktooltip coordinates and size

        const tipX = e.pageX; // 5px on the right of the ktooltip
        const tipY = e.pageY;                     // 40px on the top of the ktooltip
        // Position tooltip
        tooltip.style.top = tipY + 'px';
        tooltip.style.left = tipX + 'px';

        const tooltip_rect = tooltip.getBoundingClientRect();
        if ((tooltip_rect.x + tooltip_rect.width) > window.innerWidth) {
            tooltip.style.right = window.innerWidth - tipX + 20 + 'px';
            tooltip.style.left = '';
        } else {
            tooltip.style.left = tipX + 'px';
            tooltip.style.right = '';
        }
        if ((tooltip_rect.y + tooltip_rect.height + 10) > window.innerHeight) {
            tooltip.style.bottom = window.innerHeight - tipY + 10 + 'px';
            tooltip.style.top = '';
        } else {
            tooltip.style.top = tipY + 10 + 'px';
            tooltip.style.bottom = '';
        }
    });

    DOMCacheGetOrSet('body').addEventListener('keyup', (e) => {
        if (Globals.shift && e.key == 'Shift') {
            Globals.shift = false;
        }
        if (Globals.shiftRemove && e.key == 'Shift') {
            Globals.shift = false;
        }
    });

    DOMCacheGetOrSet('sell-power-button').addEventListener('click', () => {
        player.money = player.money.add(player.power);
        player.power = player.power.mul(0);
    });
    DOMCacheGetOrSet('buildings-tab').addEventListener('click', () => {
        toggleTabs(Tabs.Buildings);
    });
    DOMCacheGetOrSet('upgrade-tab').addEventListener('click', () => {
        toggleTabs(Tabs.Upgrades);
    });
    DOMCacheGetOrSet('research-tab').addEventListener('click', () => {
        toggleTabs(Tabs.Research);
    });
    DOMCacheGetOrSet('map-tab').addEventListener('click', () => {
        toggleTabs(Tabs.Map);
    });
    DOMCacheGetOrSet('setting-tab').addEventListener('click', () => {
        toggleTabs(Tabs.Setting);
    });

    Globals.buildingClass.forEach((className, index) => {
        if (className == '') {
            return;
        }
        DOMCacheGetOrSet(className).addEventListener('click', () => {
            toggleBuildings(index);
        });
        DOMCacheGetOrSet(className).addEventListener('mouseover', () => {
            componentTooltip(index);
        });
        DOMCacheGetOrSet(className).addEventListener('mouseout', () => {
            hideTooltip();
        });
    });
};
