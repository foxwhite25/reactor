import Decimal from 'break_infinity.js';
import { player } from '@/Reactor';
import { Globals } from '@/Variables';
import { showTooltip } from '@/UpdateHTML';
import { format } from '@/Utils';

export enum UpgradeEnum {
    Null,
    EfficientUranium,
    Chronomancy,
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
    max: number;

    protected constructor(id : string, title: string, cost: Decimal, costBase: Decimal, count: number, max: number) {
        this.id =  id
        this.title = title
        this.cost = cost
        this.costBase = costBase
        this.count = count
        this.max = max
    }

    getSingleCost(): Decimal {
        return this.cost.multiply(this.costBase.pow(this.count + 1))
    }

    // cost(N) = cost(1) * (F^N - 1) / (F - 1)
    getBulkCost(numberToBuy: number) : Decimal {
        numberToBuy = Math.min(this.max - this.count, numberToBuy)
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
        return Math.min(Decimal.log10(this.costBase.minus(1).multiply(money).divide(singleCost).plus(1)) / Decimal.log10(this.costBase) | 0, this.max - this.count)
    }

    abstract info(): string
}

class Null extends BaseUpgrade{
    constructor(id : string, title: string, cost: Decimal, costBase: Decimal, count: number, max: number) {
        super(id, title, cost, costBase, count, max)
    }

    info(): string {
        return '<span style=\'color: var(--purple-color)\'>When you gaze into the abyss, the abyss gazes into you</span>'
    }
}

class EfficientUranium extends BaseUpgrade{
    constructor(id : string, title: string, cost: Decimal, costBase: Decimal, count: number, max: number) {
        super(id, title, cost, costBase, count, max)
    }

    info(): string {
        return `%cost
                Uranium Fuel Rod Output: <span style='color: var(--green-color)'>50%</span><br>
                Current Bonus: <span style='color: var(--green-color)'>${format(new Decimal(1.5).pow(this.count).minus(1).multiply(100))}%</span>`
    }
}

class Chronomancy extends BaseUpgrade{
    constructor(id : string, title: string, cost: Decimal, costBase: Decimal, count: number, max: number) {
        super(id, title, cost, costBase, count, max)
    }

    info(): string {
        return `%cost
                Tick Speed: <span style='color: var(--green-color)'>+1</span><br>
                Current Bonus: <span style='color: var(--green-color)'>+${format(this.count)}</span>`
    }
}

export const getUpgradeByEnum = (e: UpgradeEnum): BaseUpgrade => {
    switch (e) {
        case UpgradeEnum.Null:
            return new Null('Null','Void',new Decimal( 0), new Decimal(0), 0, -1)
        case UpgradeEnum.EfficientUranium:
            return new EfficientUranium('eu','Efficient Uranium',new Decimal(10), new Decimal(20), 0, 100)
        case UpgradeEnum.Chronomancy:
            return new Chronomancy('chrono', 'Chronomancy', new Decimal(1), new Decimal(1000), 0, 8)
    }
}

export const buyUpgrade = (upgrade: BaseUpgrade, amount: number): void => {
    amount = Math.min(amount, upgrade.max - upgrade.count)
    const cost = upgrade.getBulkCost(amount)
    if (player.money.lessThan(cost)) {
        Globals.tooltipFunction = () => {
            return {title: '', content: `<span style='color: var(--red-color)'>You don't have enough money for ${upgrade.title}!</span>`}
        }
        showTooltip();
        return
    }
    if (cost.equals(0)) {
        Globals.tooltipFunction = () => {
            return {title: '', content: `You don't need to buy ${upgrade.title}!`}
        }
        showTooltip();
        return
    }
    player.money = player.money.minus(cost);
    upgrade.count += amount;
}

export const refundUpgrade = (upgrade: BaseUpgrade, count: number): void => {
    count = Math.min(count, upgrade.count)
    const refundAmount = upgrade.getBulkCostWithCount(count, upgrade.count - count)
    player.money = player.money.add(refundAmount)
    upgrade.count -= count
}
