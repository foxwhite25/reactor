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
    ComponentVent,
    HeatExchanger_1,
    HeatExchanger_2,
    HeatExchangerComponent,
    HeatExchangerReactor,
    NeutronReflector,
    ThickNeutronReflector,
    IridiumNeutronReflector,
    ReactorPlating,
    ContainmentPlating,
    HeatPlating,
    Capacitor
}

export const Globals: GlobalVariables = {
    mapWidth: 34,
    mapHeight: 17,
    offsetCol: [0, 0, 1, -1],
    offsetRow: [1, -1, 0, 0],
    ticks: 0,

    maxPower: new Decimal(50000),
    maxHeat: new Decimal(50000),
    selectedComponent: Component.Null,
    componentQue: [],
    vents: [],
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
    ctrl: false,
    shiftAdd: false,
    shiftRemove: false,

    tooltipFunction: () => {return {title: '', content: ''}},
    currentTab: Tabs.Buildings,
};

export const blankGlobals = { ...Globals };
