import "./App.css";
import React from "react";
import BattlefieldComponent from "./components/Battlefield.tsx";
import { Battlefield } from "./models/Battlefield.ts";

function App() {
  const battlefield = new Battlefield();

  return (
    <div className="App">
      <BattlefieldComponent battlefield={battlefield} />
    </div>
  );
}

export default App;
