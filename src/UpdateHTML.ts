import { player } from '@/Reactor';
import { DOMCacheGetOrSet } from '@/Cache/DOM';
import { format } from '@/Utils';

export const htmlInserts = () => {
    // ALWAYS Update these, for they are the most important resources
    const playerRequirements = ['money'] as const;
    const domRequirements = ['moneyDisplay'] as const;
    for (let i = 0; i < playerRequirements.length; i++) {
        const text = format(player[`${playerRequirements[i]}` as const]);
        const dom = DOMCacheGetOrSet(`${domRequirements[i]}` as const);
        if (dom.textContent !== text) {
            dom.textContent = text;
        }
    }
};
