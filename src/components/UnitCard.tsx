// UnitCard.tsx
import React from "react";
import { Unit } from "../models/Unit";

interface UnitCardProps {
  unit: Unit;
  isSelected: boolean;
  isHovered: boolean;
  isCurrent: boolean;
  onSelect: () => void;
}

const UnitCard: React.FC<UnitCardProps> = ({
  unit,
  isSelected,
  isHovered,
  isCurrent,
  onSelect,
}) => {
  const healthPercentage = (unit.getHealth() / unit.getMaxHealth()) * 100;

  return (
    <div
      className={`unit-card ${isSelected ? "selected" : ""}
      
       ${isCurrent ? "current" : ""} ${isHovered ? "hovered" : ""}
       ${!unit.isAlive() ? "killed" : ""}
       ${unit.isDefending() ? "defending" : ""} ${
        unit.isParalyzed() ? "paralyzed" : ""
      }`}
      onClick={onSelect}
    >
      <div className="unit-avatar">
        <img src={unit.getImage()} alt={unit.getName()} />
        <div
          className="health-overlay"
          style={{ height: `${100 - healthPercentage}%` }}
        />
      </div>
      <div className="unit-info">
        <div className="unit-name">{unit.getName()}</div>
        <div className="unit-health">{`${unit.getHealth()} / ${unit.getMaxHealth()}`}</div>
      </div>
    </div>
  );
};

export default UnitCard;
