import Decimal from 'break_infinity.js';
import { player } from '@/Reactor';
import { Globals } from '@/Variables';
import { showTooltip } from '@/UpdateHTML';
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

    getSingleCostWithCount(count: number): Decimal {
        return this.cost.multiply(this.costBase.pow(count + 1))
    }

    getBulkCostWithCount(numberToBuy: number, count: number) : Decimal {
        if (numberToBuy == 1) {
            return this.getSingleCostWithCount(count)
        }
        return this.getSingleCostWithCount(count).multiply(this.costBase.pow(numberToBuy).minus(1)).divide(this.costBase.minus(1))
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
        return `%cost
                Uranium Fuel Rod Output: <span style='color: var(--green-color)'>50%</span><br>
                Current Bonus: <span style='color: var(--green-color)'>${format(new Decimal(1.5).pow(this.count).minus(1).multiply(100))}%</span>`
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

export const buyUpgrade = (upgrade: BaseUpgrade, amount: number): void => {
    const cost = upgrade.getBulkCost(amount)
    if (player.money.lessThan(cost) || amount == 0) {
        Globals.tooltipFunction = () => {
            return {title: '', content: `<span style='color: var(--red-color)'>You don't have enough money for ${upgrade.title}!</span>`}
        }
        showTooltip();
    } else {
        player.money = player.money.minus(cost);
        upgrade.count += amount;
    }
}

export const refundUpgrade = (upgrade: BaseUpgrade, count: number): void => {
    count = Math.min(count, upgrade.count)
    const refundAmount = upgrade.getBulkCostWithCount(count, upgrade.count - count)
    player.money = player.money.add(refundAmount)
    upgrade.count -= count
}
