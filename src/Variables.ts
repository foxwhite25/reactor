import { GlobalVariables } from '@/Type/Reactor';
import Decimal from 'break_infinity.js';

export enum Tabs {
  Buildings,
  Upgrades,
  Research,
  Setting,
  Area,
}

export const Globals: GlobalVariables = {
    maxPower: new Decimal(500),
    currentTab: Tabs.Buildings,
};

export const blankGlobals = { ...Globals };
