import { BattleActions } from "../types/BattleActions.ts";
import { UnitAttributes } from "../types/UnitAttributes.ts";
import { UnitStatus } from "../types/UnitStatus.ts";
import { UnitType } from "../types/UnitType.ts";
import { Battlefield } from "./Battlefield.ts";

export abstract class Unit {
  protected id: string;
  protected name: string;
  protected health: number;
  protected maxHealth: number;
  protected damage: number;
  protected heal: number;
  protected initiative: number;
  protected status: UnitStatus;
  protected type: UnitType;
  protected image: string;
  protected hasActedThisRound: boolean = false;
  protected paralyzedForOneRound: boolean = false;
  protected abstract battleActions: BattleActions[];

  constructor(attributes: UnitAttributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.health = attributes.health;
    this.maxHealth = attributes.maxHealth;
    this.damage = attributes.damage;
    this.heal = attributes.heal;
    this.initiative = attributes.initiative;
    this.status = attributes.status;
    this.type = attributes.type;
    this.image = attributes.image;
  }

  abstract performAction(action: BattleActions, target: Unit | Unit[]): void;
  abstract getAvailableTargets(battlefield: Battlefield): Unit[];

  public takeDamage(damage: number): void {
    const actualDamage = this.isDefending() ? damage * 0.5 : damage;
    this.health = Math.max(0, this.health - actualDamage);
    if (this.health === 0) this.status = UnitStatus.Killed;
  }

  public takeHeal(heal: number): void {
    this.health = Math.min(this.maxHealth, this.health + heal);
  }

  public paralyze(): void {
    this.status = UnitStatus.Paralyzed;
    this.paralyzedForOneRound = true;
  }

  public defend(): void {
    this.status = UnitStatus.Defending;
  }

  public markAsActed(): void {
    this.hasActedThisRound = true;
  }

  public resetRoundStatus(): void {
    if (this.status === UnitStatus.Killed) return;

    if (this.status === UnitStatus.Paralyzed) {
      if (!this.hasActedThisRound && this.paralyzedForOneRound) {
        this.paralyzedForOneRound = false;
      } else {
        this.status = UnitStatus.Normal;
        this.paralyzedForOneRound = false;
      }
    } else {
      this.status = UnitStatus.Normal;
    }

    this.hasActedThisRound = false;
  }

  public isAlive(): boolean {
    return this.status !== UnitStatus.Killed;
  }

  public isParalyzed(): boolean {
    return this.status === UnitStatus.Paralyzed;
  }

  public isDefending(): boolean {
    return this.status === UnitStatus.Defending;
  }

  public getName(): string {
    return this.name;
  }

  public getType(): UnitType {
    return this.type;
  }

  public getImage(): string {
    return this.image;
  }

  public getHealth(): number {
    return this.health;
  }

  public getMaxHealth(): number {
    return this.maxHealth;
  }

  public getInitiative(): number {
    return this.initiative;
  }

  public getBattleActions(): BattleActions[] {
    return this.battleActions;
  }
}
