import { GlobalVariables } from '@/Type/Reactor';
import Decimal from 'break_infinity.js';

export enum Tabs {
  Buildings,
  Upgrades,
  Research,
  Setting,
  Map,
}

export const Globals: GlobalVariables = {
    mapWidth: 34,
    mapHeight: 17,

    maxPower: new Decimal(500),

    currentTab: Tabs.Buildings,
};

export const blankGlobals = { ...Globals };
