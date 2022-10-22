import Decimal from 'break_infinity.js';
import { Tabs } from '@/Variables';

export interface Player {
  firstPlayed: string;

  money: Decimal;
  power: Decimal;
  research: Decimal;
  flame: Decimal;

  setting: {
    theme: string;
  };
}

export interface GlobalVariables {
  currentTab: Tabs;
}

export type PlayerSave = { [P in keyof Player]?: Player[P] | null } & Record<
  string,
  unknown
>;
