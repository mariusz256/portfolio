import "./App.scss";
import Game from "../components/tictactoe";
import React from "react";
function App() {
  return (
    <div className="App">
      <div className="title">
        <h1 className="title__heading">I'm Mariusz</h1>
        <p className="title__paragraph">
          I'm looking for job as frontend developer.
        </p>
      </div>
      <Game />
    </div>
  );
}

export default App;
