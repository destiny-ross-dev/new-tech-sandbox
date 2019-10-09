import React, { useState, useEffect } from "react";
import "./App.css";
import { observe } from "./components/Game";
import Board from "./components/Board";

const App = () => {
  const [knightState, setKnightState] = useState([0, 0]);

  useEffect(() => {
    observe(setKnightState);
  }, [setKnightState]);

  return <Board knightPosition={knightState} />;

  // return (
  //   <div className="App">
  //     <Board knightPosition={[0, 0]} />
  //   </div>
  // );
};

export default App;
