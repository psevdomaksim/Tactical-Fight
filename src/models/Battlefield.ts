import { UnitFactory } from "../factories/UnitFactory";
import { Unit } from "./Unit";

export class Battlefield {
  private team1: Unit[][];
  private team2: Unit[][];
  private turnOrder: Unit[];
  private unitFactory: UnitFactory = new UnitFactory();

  constructor() {
    this.team1 = this.setupTeamRows(this.unitFactory.createTeam(6));
    this.team2 = this.setupTeamRows(this.unitFactory.createTeam(6));

    this.turnOrder = this.generateTurnOrder([
      ...this.team1.flat(),
      ...this.team2.flat(),
    ]);
  }

  public getMappedTeamLines(team: Unit[][]): {
    frontLine: Unit[];
    backLine: Unit[];
  } {
    return team === this.team1
      ? { backLine: team[0], frontLine: team[1] }
      : { backLine: team[1], frontLine: team[0] };
  }

  public getEnemyTeam(unit: Unit): Unit[][] {
    return this.isUnitInTeam(unit, this.team1) ? this.team2 : this.team1;
  }

  public getAlliedTeam(unit: Unit): Unit[][] {
    return this.isUnitInTeam(unit, this.team1) ? this.team1 : this.team2;
  }

  public getTeam1(): Unit[][] {
    return this.team1;
  }

  public getTeam2(): Unit[][] {
    return this.team2;
  }

  public getCurrentUnit(): Unit {
    return this.turnOrder[0];
  }

  public getTurnOrder(): Unit[] {
    return this.turnOrder;
  }

  public startNewRound(): void {
    this.turnOrder = this.generateTurnOrder([
      ...this.team1.flat(),
      ...this.team2.flat(),
    ]);

    this.turnOrder.forEach((unit) => unit.resetRoundStatus());
  }

  public nextTurn(): void {
    this.removeDeadUnitsFromTurnOrder();
    const currentUnit = this.getCurrentUnit();

    currentUnit.markAsActed();

    this.advanceTurnOrder();
    this.removeParalyzedUnitsFromTurnOrder();
  }

  private advanceTurnOrder(): void {
    this.turnOrder.shift();

    if (this.turnOrder.length === 0) {
      this.startNewRound();
    }
  }

  private removeParalyzedUnitsFromTurnOrder(): void {
    this.turnOrder = this.turnOrder.filter((unit) => !unit.isParalyzed());
  }

  private removeDeadUnitsFromTurnOrder(): void {
    this.turnOrder = this.turnOrder.filter((unit) => unit.isAlive());
  }

  private setupTeamRows(team: Unit[]): Unit[][] {
    return [team.slice(0, 3), team.slice(3, 6)];
  }

  private generateTurnOrder(allUnits: Unit[]): Unit[] {
    return allUnits
      .filter((unit) => unit.isAlive())
      .sort((a, b) => b.getInitiative() - a.getInitiative());
  }

  private isUnitInTeam(unit: Unit, team: Unit[][]): boolean {
    return team.flat().includes(unit);
  }
}
