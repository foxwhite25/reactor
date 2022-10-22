import { player } from '@/Reactor';
import { DOMCacheGetOrSet } from '@/Cache/DOM';
import { format } from '@/Utils';

export const htmlInserts = (): void => {
    // ALWAYS Update these, for they are the most important resources
    const playerRequirements = ['money', 'power', 'research', 'flame'] as const;
    const domRequirements = ['money-display', 'power-display', 'research-display', 'flame-display'] as const;
    for (let i = 0; i < playerRequirements.length; i++) {
        const text = format(player[`${playerRequirements[i]}` as const]);
        const dom = DOMCacheGetOrSet(`${domRequirements[i]}` as const);
        if (dom.textContent !== text) {
            dom.textContent = text;
        }
    }

    DOMCacheGetOrSet('power-bar').style.width = `${player.power.div(5)}%`
};
