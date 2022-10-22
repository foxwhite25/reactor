import { DOMCacheGetOrSet } from '@/Cache/DOM';

export const generateEventHandlers = (): void => {
    DOMCacheGetOrSet('money-display').addEventListener('click', () => {
        console.log('Clicked');
        alert('Clicked');
    });
};
