import { GlobalVariables } from '@/Type/Reactor';

export enum Tabs {
  Buildings,
  Upgrades,
  Research,
  Area,
}

export const Globals: GlobalVariables = {
    currentTab: Tabs.Buildings,
};

export const blankGlobals = { ...Globals };
