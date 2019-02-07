import React, { Component } from "react";
import "../gameboard/GameBoard";
import "./App.css";
import GameBoard from "../gameboard/GameBoard";

class App extends Component {
  render() {
    return (
      <div>
        <h1 className="center">Tic Tac Toe</h1>
        <h2 className="center">Single Player vs Computer</h2>
        <GameBoard />
      </div>
    );
  }
}

export default App;
