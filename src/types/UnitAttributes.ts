import { UnitStatus } from "./UnitStatus";
import { UnitType } from "./UnitType";

export interface UnitAttributes {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  damage: number;
  heal: number;
  initiative: number;
  status: UnitStatus;
  type: UnitType;
  image: string;
}
