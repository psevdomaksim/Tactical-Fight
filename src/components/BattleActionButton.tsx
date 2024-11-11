import React from "react";
import { BattleActions } from "../types/BattleActions";
import "../App.css";

interface BattleActionBtnProps {
  action: BattleActions;
  handleBattleAction: (action: BattleActions) => void;
  disabled: boolean;
}

const BattleActionButton: React.FC<BattleActionBtnProps> = ({
  action,
  handleBattleAction,
  disabled,
}) => {
  const renderButtonContent = () => {
    switch (action) {
      case BattleActions.Attack:
        return "Attack";
      case BattleActions.Defend:
        return "Defend";
      case BattleActions.Heal:
        return "Heal";
      case BattleActions.Paralyze:
        return "Paralyze";
      default:
        return "Action";
    }
  };

  const buttonClass = `battle-action-btn ${action.toLowerCase()}`;

  return (
    <button
      className={buttonClass}
      disabled={disabled}
      onClick={() => handleBattleAction(action)}
    >
      {renderButtonContent()}
    </button>
  );
};

export default BattleActionButton;
