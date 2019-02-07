import React, { Component } from "react";
import "./GameBoard.css";
import Box from "./box/Box";

export default class GameBoard extends Component {
  render() {
    return (
      <div className="game-board">
        <Box />
      </div>
    );
  }
}
