import { DOMCacheGetOrSet } from '@/Cache/DOM';

export const generateEventHandlers = (): void => {
    DOMCacheGetOrSet('button').addEventListener('click', () => {
        console.log('Clicked');
        alert('Clicked');
    });
};
