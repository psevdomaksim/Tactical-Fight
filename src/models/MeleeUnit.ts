import { BattleActions } from "../types/BattleActions.ts";
import { UnitAttributes } from "../types/UnitAttributes.ts";
import { UnitType } from "../types/UnitType.ts";
import { Unit } from "./Unit.ts";
import { Battlefield } from "./Battlefield.ts";

export class MeleeUnit extends Unit {
  public battleActions: BattleActions[] = [
    BattleActions.Attack,
    BattleActions.Defend,
  ];

  constructor(attributes: UnitAttributes) {
    super({ ...attributes, type: UnitType.Melee });
  }

  performAction(action: BattleActions, target: Unit): void {
    switch (action) {
      case BattleActions.Attack:
        if (target && target.isAlive()) target.takeDamage(this.damage);
        break;
      case BattleActions.Defend:
        this.defend();
        break;
      default:
        throw new Error(`Action ${action} not supported by MeleeUnit.`);
    }
  }

  getAvailableTargets(battlefield: Battlefield): Unit[] {
    const alliedTeam = battlefield.getAlliedTeam(this);
    const enemyTeam = battlefield.getEnemyTeam(this);

    const alliedLines = battlefield.getMappedTeamLines(alliedTeam);
    const enemyLines = battlefield.getMappedTeamLines(enemyTeam);

    const isInBackline = alliedLines.backLine.includes(this);

    if (isInBackline) {
      const frontlineAlliesAlive = alliedLines.frontLine.some((unit) =>
        unit.isAlive()
      );

      if (!frontlineAlliesAlive) {
        const aliveFrontlineEnemies = enemyLines.frontLine.filter((unit) =>
          unit.isAlive()
        );

        if (aliveFrontlineEnemies.length > 0) {
          return aliveFrontlineEnemies;
        } else {
          return enemyLines.backLine.filter((unit) => unit.isAlive());
        }
      } else {
        return [];
      }
    }

    const aliveFrontlineEnemies = enemyLines.frontLine.filter((unit) =>
      unit.isAlive()
    );
    const unitIndex = alliedLines.frontLine.indexOf(this);

    if (aliveFrontlineEnemies.length > 0) {
      if (unitIndex === 1) {
        // Center unit
        return aliveFrontlineEnemies;
      } else if (unitIndex === 0) {
        // Left corner unit
        return aliveFrontlineEnemies.slice(0, 2);
      } else if (unitIndex === 2) {
        // Right corner unit
        return aliveFrontlineEnemies.slice(1, 3);
      }
    }

    return enemyLines.backLine.filter((unit) => unit.isAlive());
  }
}
