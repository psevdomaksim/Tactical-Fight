import { BattleActions } from "../types/BattleActions.ts";
import { UnitAttributes } from "../types/UnitAttributes.ts";
import { UnitType } from "../types/UnitType.ts";
import { Battlefield } from "./Battlefield.ts";
import { Unit } from "./Unit.ts";

export class HealerSingleUnit extends Unit {
  public battleActions: BattleActions[] = [
    BattleActions.Heal,
    BattleActions.Defend,
  ];

  constructor(attributes: UnitAttributes) {
    super({ ...attributes, type: UnitType.HealerSingle });
  }

  performAction(action: BattleActions, target: Unit): void {
    switch (action) {
      case BattleActions.Heal:
        if (target && target.isAlive()) {
          target.takeHeal(this.heal);
        }
        break;

      case BattleActions.Defend:
        this.defend();
        break;

      default:
        throw new Error(`Action ${action} not supported by RangeUnit.`);
    }
  }

  getAvailableTargets(battlefield: Battlefield): Unit[] {
    return battlefield
      .getAlliedTeam(this)
      .flat()
      .filter((unit) => unit.isAlive());
  }
}
