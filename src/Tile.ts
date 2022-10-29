import { Component, Globals } from '@/Variables';
import Decimal from 'break_infinity.js';
import { addHeat, addPower, distributeHeat, player } from '@/Reactor';
import { format } from '@/Utils';

export interface TileSave {
    component: Component;
    damage: Decimal;
}

export abstract class BaseTile {
    id: string;
    title: string;
    row: number;
    cost: Decimal;
    damage: Decimal;
    maxDamage: Decimal;


    protected constructor(id: string, title: string, row: number, damage: Decimal, maxDamage: Decimal, cost: Decimal) {
        this.cost = cost
        this.id = id;
        this.row = row
        this.damage = damage;
        this.maxDamage = maxDamage;
        this.title = title;
    }

    isHeatAcceptor(): boolean {
        return false;
    }

    isCoolant(): boolean {
        return this.isHeatAcceptor();
    }

    getRods(): number {
        return 0;
    }

    isTileBroken(): boolean {
        return this.isDamageableItem() && this.damage.greaterThanOrEqualTo(this.maxDamage);
    }

    getRelativeDamage(): Decimal {
        return this.isDamageableItem() ? this.damage.divide(this.maxDamage) : new Decimal(0);
    }

    isDamageableItem(): boolean {
        return this.maxDamage.greaterThan(0);
    }

    damageTile(damage: Decimal): Decimal {
        if (damage.notEquals(0) && this.isDamageableItem()) {
            if (this.maxDamage.lessThanOrEqualTo(damage)) {
                return damage;
            }

            let extra = new Decimal(0);
            let newDamage = this.damage;
            newDamage = newDamage.add(damage);

            if (newDamage.greaterThan(this.maxDamage)) {
                extra = this.maxDamage.minus(newDamage).plus(1);
                newDamage = this.maxDamage;
            } else if (newDamage.lessThan(0)) {
                extra = newDamage;
                newDamage = new Decimal(0);
            }

            this.damage = newDamage;
            return extra;
        }
        return damage;
    }

    abstract tickPre(row: number, col: number): void

    abstract tickPost(row: number, col: number): void

    abstract info(col: number | undefined, row: number | undefined): string
}

export class FuelRod extends BaseTile {
    rods: number;
    pulses: Decimal;
    baseEnergyMultiplier: Decimal;
    baseHeatMultiplier: Decimal;
    reflect: Decimal;

    constructor(
        id: string, title: string, row: number,  damage: Decimal,
        maxDamage: Decimal,cost: Decimal, rods: 1 | 2 | 4,
        energyMultiplier: Decimal, heatMultiplier: Decimal,
    ) {
        super(id, title,row, damage, maxDamage, cost);
        this.rods = rods;
        this.pulses = rods == 1 ? new Decimal(1) : rods == 2 ? new Decimal(2) : new Decimal(3);
        this.reflect = new Decimal(rods);
        this.baseEnergyMultiplier = energyMultiplier;
        this.baseHeatMultiplier = heatMultiplier;
    }

    getRods(): number {
        return this.rods;
    }

    energyMultiplier(): Decimal {
        return this.baseEnergyMultiplier;
    }

    heatMultiplier(): Decimal {
        return this.baseHeatMultiplier;
    }

    tickPre(): void {
        if (player.setting.paused) {
            return;
        }
    }

    tickPost(row: number, col: number): void {
        if (player.setting.paused) {
            return;
        }

        let pulse = this.pulses;
        const around: BaseTile[] = [];

        for (let i = 0; i < 4; i++) {
            const t = player.tiles[row + Globals.offsetRow[i]][col + Globals.offsetCol[i]];
            if (t.id == '') {
                continue;
            }
            around.push(t);

            if (t instanceof FuelRod || t instanceof NeutronReflector) {
                pulse = pulse.add(t.reflect);
            }
        }

        addPower(pulse.multiply(this.energyMultiplier()));
        distributeHeat(around, this.heatMultiplier().multiply(pulse).multiply(pulse.plus(1)));
        this.damageTile(new Decimal(1));
    }

    info(row: number | undefined, col: number | undefined): string {
        let output = `Cost: <span style='color: var(--yellow-color)'>${format(this.cost)}$</span><br>`
        output += `Lifespan: <span style='color: var(--green-color)'>${format(this.maxDamage.minus(this.damage))}</span> ticks <br>`

        let pulse = this.pulses;

        if (col != undefined && row != undefined) {
            for (let i = 0; i < 4; i++) {
                if (row + Globals.offsetRow[i] < 0 && col + Globals.offsetCol[i] < 0) {
                    continue
                }
                const t = player.tiles[row + Globals.offsetRow[i]][col + Globals.offsetCol[i]];
                if (t instanceof FuelRod || t instanceof NeutronReflector) {
                    pulse = pulse.add(t.reflect);
                }
            }
        }

        output += `Energy Output: <span style='color: var(--cyan-color)'>${format(pulse.multiply(this.energyMultiplier()))}</span><br>`
        output += `Heat Produced: <span style='color: var(--red-color)'>${format(this.heatMultiplier().multiply(pulse).multiply(pulse.plus(1)))}</span><br>`
        return output
    }
}

export class NeutronReflector extends BaseTile {
    reflect: Decimal;

    constructor(
        id: string, title: string, row: number, damage: Decimal,
        maxDamage: Decimal,cost: Decimal, reflect: Decimal,
    ) {
        super(id, title, row, damage, maxDamage, cost);
        this.reflect = reflect;
    }

    tickPre(): void {
        return;
    }

    tickPost(row: number, col: number): void {
        if (player.setting.paused || this.maxDamage.lessThanOrEqualTo(0)) {
            return;
        }

        for (let i = 0; i < 4; i++) {
            const t = player.tiles[row + Globals.offsetRow[i]][col + Globals.offsetCol[i]];
            if (t == null) {
                continue;
            }
            this.damageTile(new Decimal(t.getRods()));
        }
    }

    info(): string {
        let output = `Cost: <span style='color: var(--yellow-color)'>${format(this.cost)}$</span><br>`
        output += `Durability: <span style='color: var(--green-color)'>${format(this.maxDamage.minus(this.damage))}</span> pulses <br>`
        output += `Efficiency: <span style='color: var(--pink-color)'>${format(this.maxDamage.minus(this.damage))}</span> pulses <br>`
        return output
    }
}

export class HeatVent extends BaseTile {
    selfCooling: Decimal;
    reactorCooling: Decimal;
    componentCooling: Decimal;

    constructor(
        id: string, title: string, row: number, damage: Decimal,
        maxDamage: Decimal, cost: Decimal, selfCooling: Decimal,
        reactorCooling: Decimal, componentCooling: Decimal,
    ) {
        super(id, title, row, damage, maxDamage, cost);
        this.selfCooling = selfCooling;
        this.reactorCooling = reactorCooling;
        this.componentCooling = componentCooling;
    }

    isHeatAcceptor(): boolean {
        return this.maxDamage.greaterThan(0);
    }

    tickPre(row: number, col: number): void {
        if (this.reactorCooling.greaterThan(0)) {
            addHeat(this.reactorCooling.neg());
        }

        if (this.selfCooling.greaterThan(0)) {
            this.damageTile(this.selfCooling.neg());
        }

        if (this.componentCooling.greaterThan(0)) {
            for (let i = 0; i < 4; i++) {
                const t = player.tiles[row + Globals.offsetRow[i]][col + Globals.offsetCol[i]];
                if (t == null) {
                    continue;
                }

                if (t.isCoolant()) {
                    t.damageTile(this.componentCooling.neg());
                }
            }
        }
    }

    tickPost(): void {
        return;
    }

    info(): string {
        let output = `Cost: <span style='color: var(--yellow-color)'>${format(this.cost)}$</span><br>`
        if (this.maxDamage.greaterThan(0)) {
            output += `Coolent: <span style='color: var(--red-color)'>${format(this.maxDamage.minus(this.damage))}</span> heat <br>`
        }
        if (this.selfCooling.greaterThan(0)) {
            output += `Self Cooling: <span style='color: var(--red-color)'>${format(this.selfCooling)}</span> heat <br>`
        }
        if (this.reactorCooling.greaterThan(0)) {
            output += `Reactor Cooling: <span style='color: var(--red-color)'>${format(this.reactorCooling)}</span> heat <br>`
        }
        if (this.componentCooling.greaterThan(0)) {
            output += `Component Cooling: <span style='color: var(--red-color)'>${format(this.componentCooling)}</span> heat <br>`
        }
        return output;
    }
}

export class ReactorPlating extends BaseTile {
    maxHeatBonus: Decimal;

    constructor(
        id: string, title: string, row: number, damage: Decimal,
        maxDamage: Decimal, cost: Decimal, maxHeatBonus: Decimal,
    ) {
        super(id, title, row, damage, maxDamage, cost);
        this.maxHeatBonus = maxHeatBonus;
    }

    tickPre(): void {
        Globals.maxHeat = Globals.maxHeat.add(this.maxHeatBonus);
    }

    tickPost(): void {
        return;
    }

    info(): string {
        let output = `Cost: <span style='color: var(--yellow-color)'>${format(this.cost)}$</span><br>`
        output += `Max Heat: +<span style='color: var(--red-color)'>${format(this.maxHeatBonus)}</span><br>`
        return output
    }
}

export class Capacitor extends BaseTile {
    maxPowerBonus: Decimal;

    constructor(
        id: string, title: string, row: number, damage: Decimal,
        maxDamage: Decimal, cost: Decimal, maxPowerBonus: Decimal,
    ) {
        super(id, title, row, damage, maxDamage, cost);
        this.maxPowerBonus = maxPowerBonus;
    }

    tickPre(): void {
        Globals.maxPower = Globals.maxPower.add(this.maxPowerBonus);
    }

    tickPost(): void {
        return;
    }

    info(): string {
        let output = `Cost: <span style='color: var(--yellow-color)'>${format(this.cost)}$</span><br>`
        output += `Max Power: +<span style='color: var(--blue-color)'>${format(this.maxPowerBonus)}</span><br>`
        return output
    }
}

export const getTileByComponent = (component: Component): BaseTile => {
    switch (component) {
        case Component.Null:
            return new Capacitor(
                '', 'Empty Tile', 0,
                new Decimal(0), new Decimal(0),
                new Decimal(0), new Decimal(0)
            )
        case Component.WindTurbine:
            return new FuelRod(
                'wind-turbine', 'Wind Turbine', 0,
                new Decimal(0), new Decimal(30000), new Decimal(10),
                1, new Decimal(1), new Decimal(1),
            );
        case Component.Vent_1:
            return new HeatVent(
                'vent-1', 'Standard turbine', 0,
                new Decimal(0), new Decimal(100), new Decimal(10),
                new Decimal(1), new Decimal(0), new Decimal(0),
            );
    }
};

