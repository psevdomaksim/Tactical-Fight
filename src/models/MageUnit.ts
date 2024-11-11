import { Unit } from "./Unit.ts";
import { UnitType } from "../types/UnitType.ts";
import { UnitAttributes } from "../types/UnitAttributes.ts";
import { BattleActions } from "../types/BattleActions.ts";
import { Battlefield } from "./Battlefield.ts";

export class MageUnit extends Unit {
  public battleActions: BattleActions[] = [
    BattleActions.Attack,
    BattleActions.Defend,
  ];

  constructor(attributes: UnitAttributes) {
    super({ ...attributes, type: UnitType.Mage });
  }

  performAction(action: BattleActions, target: Unit[]): void {
    switch (action) {
      case BattleActions.Attack:
        target.forEach((target) => {
          if (target && target.isAlive()) {
            target.takeDamage(this.damage);
          }
        });
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
      .getEnemyTeam(this)
      .flat()
      .filter((unit) => unit.isAlive());
  }
}
