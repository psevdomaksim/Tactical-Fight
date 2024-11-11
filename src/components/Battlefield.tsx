import React, { useState } from "react";
import { Unit } from "../models/Unit.ts";
import UnitCard from "./UnitCard.tsx";
import RoundInfo from "./RoundInfo.tsx";
import { Battlefield as BattlefieldModel } from "../models/Battlefield.ts";
import "../App.css";
import BattleActionButton from "./BattleActionButton.tsx";
import { BattleActions } from "../types/BattleActions.ts";
import { UnitType } from "../types/UnitType.ts";

interface BattlefieldProps {
  battlefield: BattlefieldModel;
}

const BattlefieldComponent: React.FC<BattlefieldProps> = ({ battlefield }) => {
  const [hoveredUnit, setHoveredUnit] = useState<Unit | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [turnOrder, setTurnOrder] = useState<Unit[]>(
    battlefield.getTurnOrder()
  );

  const [currentUnit, setCurrentUnit] = useState<Unit>(
    battlefield.getCurrentUnit()
  );

  const currentUnitAvailableTargets =
    currentUnit.getAvailableTargets(battlefield);

  const teamAssignments = new Map<Unit, "team1" | "team2">();
  battlefield
    .getTeam1()
    .flat()
    .forEach((unit) => teamAssignments.set(unit, "team1"));
  battlefield
    .getTeam2()
    .flat()
    .forEach((unit) => teamAssignments.set(unit, "team2"));

  const isUnitTargetable = (unit: Unit | null): boolean => {
    return unit ? currentUnitAvailableTargets.includes(unit) : false;
  };

  const handleUnitClick = (unit: Unit) => {
    if (isUnitTargetable(unit)) setSelectedUnit(unit);
  };

  const getActionTargets = (): Unit | Unit[] => {
    switch (currentUnit.getType()) {
      case UnitType.HealerMass:
        return currentUnitAvailableTargets;
      case UnitType.Mage:
        return currentUnitAvailableTargets;
      default:
        return selectedUnit && isUnitTargetable(selectedUnit)
          ? selectedUnit
          : [];
    }
  };

  const handleBattleAction = (action: BattleActions) => {
    const targets = getActionTargets();

    currentUnit.performAction(action, targets);

    battlefield.nextTurn();
    setTurnOrder(battlefield.getTurnOrder());
    setCurrentUnit(battlefield.getCurrentUnit());
    setSelectedUnit(null);
  };

  const renderTeam = (team: Unit[], isTeam1: boolean) => (
    <div className={`team ${isTeam1 ? "team1" : "team2"}`}>
      {team.map((unit, index) => (
        <UnitCard
          key={index}
          unit={unit}
          isSelected={selectedUnit === unit}
          isHovered={hoveredUnit === unit}
          isCurrent={unit === currentUnit}
          onSelect={() => handleUnitClick(unit)}
        />
      ))}
    </div>
  );

  return (
    <div className="battlefield-container">
      <div className="battlefield">
        {renderTeam(battlefield.getTeam1().flat(), true)}
        {renderTeam(battlefield.getTeam2().flat(), false)}

        <div className="action-panel">
          {currentUnit.getBattleActions().map((action, index) => (
            <BattleActionButton
              handleBattleAction={handleBattleAction}
              key={index}
              disabled={!selectedUnit && action !== BattleActions.Defend}
              action={action}
            />
          ))}
        </div>
      </div>

      <div className="round-info-panel">
        <RoundInfo
          teamAssignments={teamAssignments}
          turnOrder={turnOrder}
          currentUnit={currentUnit}
          onUnitHover={setHoveredUnit}
        />
      </div>
    </div>
  );
};

export default BattlefieldComponent;
