import { DOMCacheGetOrSet } from '@/Cache/DOM';
import { player } from '@/Reactor';
import { toggleBuildings, toggleTabs } from '@/Toggles';
import { Buildings, Tabs } from '@/Variables';

export const generateEventHandlers = (): void => {
    DOMCacheGetOrSet('sell-power-button').addEventListener('click', () => {
        player.money = player.money.add(player.power)
        player.power = player.power.mul(0)
    });
    DOMCacheGetOrSet('buildings-tab').addEventListener('click', () => {toggleTabs(Tabs.Buildings)})
    DOMCacheGetOrSet('upgrade-tab').addEventListener('click', () => {toggleTabs(Tabs.Upgrades)})
    DOMCacheGetOrSet('research-tab').addEventListener('click', () => {toggleTabs(Tabs.Research)})
    DOMCacheGetOrSet('map-tab').addEventListener('click', () => {toggleTabs(Tabs.Map)})
    DOMCacheGetOrSet('setting-tab').addEventListener('click', () => {toggleTabs(Tabs.Setting)})
    DOMCacheGetOrSet('turbine').addEventListener('click', () => {toggleBuildings(Buildings.WindTurbine)})
    DOMCacheGetOrSet('solar-panel').addEventListener('click', () => {toggleBuildings(Buildings.SolarPanel)})
};
