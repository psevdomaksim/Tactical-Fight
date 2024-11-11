import { Unit } from "../models/Unit.ts";
import { MeleeUnit } from "../models/MeleeUnit.ts";
import { RangeUnit } from "../models/RangeUnit.ts";
import { MageUnit } from "../models/MageUnit.ts";
import { HealerSingleUnit } from "../models/HealerSingleUnit.ts";
import { HealerMassUnit } from "../models/HealerMassUnit.ts";
import { ParalyzerUnit } from "../models/ParalyzerUnit.ts";
import { UnitAttributes } from "../types/UnitAttributes.ts";
import { UnitType } from "../types/UnitType.ts";
import { unitsData } from "../utils/unitsData.ts";

export class UnitFactory {
  private createUnit(attributes: UnitAttributes): Unit {
    switch (attributes.type) {
      case UnitType.Melee:
        return new MeleeUnit(attributes);
      case UnitType.Range:
        return new RangeUnit(attributes);
      case UnitType.Mage:
        return new MageUnit(attributes);
      case UnitType.HealerSingle:
        return new HealerSingleUnit(attributes);
      case UnitType.HealerMass:
        return new HealerMassUnit(attributes);
      case UnitType.Paralyzer:
        return new ParalyzerUnit(attributes);
      default:
        throw new Error(`Unknown unit type: ${attributes.type}`);
    }
  }
  public createTeam(teamSize: number): Unit[] {
    const team: Unit[] = [];

    for (let i = 0; i < teamSize; i++) {
      const randomIndex = Math.floor(Math.random() * unitsData.length);
      const attributes = unitsData[randomIndex];
      const unit = this.createUnit(attributes);

      if (unit) team.push(unit);
    }

    return team;
  }
}
