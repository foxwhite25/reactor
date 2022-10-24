import { DOMCacheGetOrSet } from '@/Cache/DOM';
import { player } from '@/Reactor';
import { toggleBuildings, toggleTabs } from '@/Toggles';
import { Globals, Tabs } from '@/Variables';
import { componentTooltip, hideTooltip } from '@/UpdateHTML';

export const generateEventHandlers = (): void => {
    document.addEventListener('mousemove', (e)=>{
        const tooltip = DOMCacheGetOrSet('tooltip')
        tooltip.style.left = e.pageX + 'px';
        tooltip.style.top = e.pageY + 'px';
    });

    DOMCacheGetOrSet('body').addEventListener('keyup', (e)=>{
        if (Globals.shift && e.key == 'Shift') {
            Globals.shift = false
        }
        if (Globals.shiftRemove && e.key == 'Shift') {
            Globals.shift = false
        }
    })

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

    Globals.buildingClass.forEach((className, index)=>{
        if (className == '') {
            return
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
    })
};
