import { GlobalVariables } from '@/Types';
import Decimal from 'break_infinity.js';
import { getTileByComponent } from '@/Tile';

export enum Tabs {
    Buildings,
    Upgrades,
    Research,
    Setting,
    Map,
}

export enum Component {
    Null,
    WindTurbine,
    Vent_1,
    Vent_2,
}

export const Globals: GlobalVariables = {
    mapWidth: 34,
    mapHeight: 17,
    offsetCol: [0, 0, 1, -1],
    offsetRow: [1, -1, 0, 0],

    maxPower: new Decimal(50000),
    maxHeat: new Decimal(50000),
    selectorComponent: Component.Null,
    componentQue: [],
    stats: {
        power: new Decimal(0),
        heat: new Decimal(0)
    },
    emptyTiles: Object.values(Component).filter((c) => typeof c != 'string').map((c) => {
        if (typeof c == 'string') {
            return getTileByComponent(Component.Null)
        }
        return getTileByComponent(c)
    }),
    shift: false,
    shiftRemove: false,

    tooltipIntervalId: null,
    currentTab: Tabs.Buildings,
};

export const blankGlobals = { ...Globals };
