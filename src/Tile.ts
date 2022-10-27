import { Component } from '@/Variables';
import Decimal from 'break_infinity.js';
import { Coordinate } from '@/Types';

// These are data that is important and
// should be stored in player
export interface Tile {
    component: Component;
    heatContained: Decimal;
    ticks: Decimal;
}

// These are data that update every tick to help with calculation and
// should be stored in Globals
export interface TileExtra {
    coordinate: Coordinate;
    heat: Decimal;
    power: Decimal;
    containment: Coordinate[];
    cells: Coordinate[];
    reflectors: Coordinate[];
    activated: boolean;
    enabled: boolean;
    updated: boolean;
}

