import { DOMCacheGetOrSet } from '@/Cache/DOM';
import { player } from '@/Reactor';
import { toggleTabs } from '@/Toggles';
import { Tabs } from '@/Variables';

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
};
