import React, { Component } from "react";
import "./App.css";
import GameBoard from "../gameboard/GameBoard";

class App extends Component {
  render() {
    return (
      <div>
        <h1 className="center-text">Unbeatable Tic Tac Toe</h1>
        <GameBoard />
      </div>
    );
  }
}

export default App;
