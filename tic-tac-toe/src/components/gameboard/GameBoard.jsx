import React, { Component } from "react";
import "./GameBoard.css";
import Minimax, { Winning, EmptyIndexes } from "./minimax";
import Box from "./box/Box";

export default class GameBoard extends Component {
  state = {
    // Building an array of nine possible positions
    square: Array.from(Array(9).keys()),
    isAITurn: false,
    player: {
      ai: "X",
      human: "O"
    }
  };

  handleRestartGame = () => {
    return this.setState({
      square: Array.from(Array(9).keys()),
      isAITurn: false
    });
  };

  handleClick = index => {
    const {
      square,
      isAITurn,
      player: { ai, human }
    } = this.state;

    const newSquare = [...square];
    newSquare[index] = isAITurn ? ai : human;

    // AI Turn
    var computed = Minimax(newSquare, !isAITurn ? ai : human);

    newSquare[computed.index] = !isAITurn ? ai : human;

    // This will trigger the renderBoxes to be re-rendered with the new values on the square.
    this.setState({
      square: newSquare,
      isAITurn: isAITurn,
      value: isAITurn ? ai : human
    });
  };

  renderBoxes = () => {
    return this.state.square.map((value, index) => {
      return (
        <Box
          key={index}
          value={value}
          onClick={() => this.handleClick(index)}
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
