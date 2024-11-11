import React from "react";
import { Unit } from "../models/Unit.ts";
import "../App.css";

interface RoundInfoProps {
  turnOrder: Unit[];
  currentUnit: Unit;
  onUnitHover: (unit: Unit | null) => void;
  teamAssignments: Map<Unit, "team1" | "team2">;
}

const RoundInfo: React.FC<RoundInfoProps> = ({
  turnOrder,
  currentUnit,
  onUnitHover,
  teamAssignments,
}) => {
  const getUnitClassNames = (unit: Unit): string => {
    const isActive = unit === currentUnit ? "active" : "";
    const teamClass =
      teamAssignments.get(unit) === "team1" ? "team1-border" : "team2-border";
    return `unit-order-item ${isActive} ${teamClass}`;
  };

  const renderHealthBar = (unit: Unit) => (
    <div className="unit-order-health-bar">
      <div
        className="health-fill"
        style={{ width: `${(unit.getHealth() / unit.getMaxHealth()) * 100}%` }}
      />
    </div>
  );

  const renderUnitDetails = (unit: Unit) => (
    <div className="unit-order-details">
      <div className="unit-order-name">{unit.getName()}</div>
      {renderHealthBar(unit)}
      <div className="unit-order-stats">
        HP: {unit.getHealth()} | Init: {unit.getInitiative()}
      </div>
    </div>
  );

  const renderUnitAvatar = (unit: Unit) => (
    <div className="unit-order-avatar">
      <img src={unit.getImage()} alt={unit.getName()} />
    </div>
  );

  return (
    <div className="round-info-panel">
      <h4>Turn Order</h4>
      <div className="unit-order-list">
        {turnOrder.map((unit, index) => (
          <div
            key={index}
            className={getUnitClassNames(unit)}
            onMouseEnter={() => onUnitHover(unit)}
            onMouseLeave={() => onUnitHover(null)}
          >
            {renderUnitAvatar(unit)}
            {renderUnitDetails(unit)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoundInfo;
