import { DOMCacheGetOrSet } from '@/Cache/DOM';
import { player } from '@/Reactor';

export const generateEventHandlers = (): void => {
    DOMCacheGetOrSet('sell-power-button').addEventListener('click', () => {
        player.money = player.money.add(player.power)
        player.power = player.power.mul(0)
    });
};
