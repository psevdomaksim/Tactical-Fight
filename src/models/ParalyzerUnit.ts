import { BattleActions } from "../types/BattleActions.ts";
import { UnitAttributes } from "../types/UnitAttributes.ts";
import { UnitType } from "../types/UnitType.ts";
import { Battlefield } from "./Battlefield.ts";
import { Unit } from "./Unit.ts";

export class ParalyzerUnit extends Unit {
  public battleActions: BattleActions[] = [
    BattleActions.Paralyze,
    BattleActions.Defend,
  ];

  constructor(attributes: UnitAttributes) {
    super({ ...attributes, type: UnitType.Paralyzer });
  }

  performAction(action: BattleActions, target: Unit): void {
    switch (action) {
      case BattleActions.Paralyze:
        if (target && target.isAlive()) {
          target.paralyze();
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
      .getEnemyTeam(this)
      .flat()
      .filter((unit) => unit.isAlive());
  }
}
