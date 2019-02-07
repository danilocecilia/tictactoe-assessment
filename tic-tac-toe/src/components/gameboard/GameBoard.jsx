import React, { Component } from "react";
import "./GameBoard.css";
import Box from "./box/Box";

export default class GameBoard extends Component {
  state = {
    restart: false
  };

  handleRestartGame = () => {
    return this.setState({ restart: true });
  };

  renderBoxes = () => {
    // Building an array of nine possible positions
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    return array.map((value, index) => {
      return (
        <Box
          key={index}
          id={value}
          restartGame={this.state.restart}
          text={"O"}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <div className="align-center">
          <button className="back">Undo</button>
          <button className="site" onClick={() => this.handleRestartGame()}>
            Restart Game
          </button>
          <button className="button">Redo</button>
        </div>
        <div className="game-board">{this.renderBoxes()}</div>
      </div>
    );
  }
}
