import Decimal from 'break_infinity.js';
import { format } from '@/Utils';

export enum UpgradeEnum {
    Null,
    EfficientUranium
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface UpgradeSave {
    upgrade: UpgradeEnum;
    count: number;
}

export abstract class BaseUpgrade {
    id: string
    title: string
    cost: Decimal;
    costBase: Decimal;
    count: number;

    protected constructor(id : string, title: string, cost: Decimal, costBase: Decimal, count: number) {
        this.id =  id
        this.title = title
        this.cost = cost
        this.costBase = costBase
        this.count = count
    }

    getSingleCost(): Decimal {
        return this.cost.multiply(this.costBase.pow(this.count + 1))
    }

    // cost(N) = cost(1) * (F^N - 1) / (F - 1)
    getBulkCost(numberToBuy: number) : Decimal {
        if (numberToBuy == 1) {
            return this.getSingleCost()
        }
        return this.getSingleCost().multiply(this.costBase.pow(numberToBuy).minus(1)).divide(this.costBase.minus(1))
    }

    getMaxNumber(money: Decimal) : number {
        const singleCost = this.getSingleCost()
        if (money.lessThan(singleCost)) {
            return 0
        }
        return Decimal.log10(this.costBase.minus(1).multiply(money).divide(singleCost).plus(1)) / Decimal.log10(this.costBase) | 0
    }

    abstract info(): string
}

class Null extends BaseUpgrade{
    constructor(id : string, title: string, cost: Decimal, costBase: Decimal, count: number) {
        super(id, title, cost, costBase, count)
    }

    info(): string {
        return '<span style=\'color: var(--purple-color)\'>When you gaze into the abyss, the abyss gazes into you</span>'
    }
}

class EfficientUranium extends BaseUpgrade{
    constructor(id : string, title: string, cost: Decimal, costBase: Decimal, count: number) {
        super(id, title, cost, costBase, count)
    }

    info(): string {
        return `Cost: <span style='color: var(--yellow-color)'>${format(this.getSingleCost())}$</span><br>Uranium Fuel Rod Output: <span style='color: var(--green-color)'>50%</span>`
    }
}

export const getUpgradeByEnum = (e: UpgradeEnum): BaseUpgrade => {
    switch (e) {
        case UpgradeEnum.Null:
            return new Null('Null','Void',new Decimal( 0), new Decimal(0), 0,)
        case UpgradeEnum.EfficientUranium:
            return new EfficientUranium('eu','Efficient Uranium',new Decimal(10), new Decimal(20), 0)
    }
}
