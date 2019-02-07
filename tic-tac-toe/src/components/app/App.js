import React, { Component } from "react";
import "../gameboard/GameBoard";
import "./App.css";
import GameBoard from "../gameboard/GameBoard";

class App extends Component {
  render() {
    return (
      <div>
        <h1 className="center-text">Tic Tac Toe</h1>
        <h2 className="center-text">Single Player vs Computer</h2>
        <div className="align-center">
          <button className="back">Undo</button>
          <button className="site">Restart Game</button>
          <button className="button">Redo</button>
        </div>
        <GameBoard />
      </div>
    );
  }
}

export default App;
