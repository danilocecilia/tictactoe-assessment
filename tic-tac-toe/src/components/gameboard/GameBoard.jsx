import React, { Component } from "react";
import { connect } from "react-redux";

import { clearBoard, play, loadBoard } from "../../actions";
import UndoRedo from "../../containers/UndoRedo";
import Box from "./box/Box";
import "./GameBoard.css";
import Minimax from "./minimax";

class GameBoard extends Component {
  state = {
    player: {
      ai: "X",
      human: "O"
    }
  };

  handleRestartGame = () => {
    this.props.dispatch(clearBoard(Array.from(Array(9).keys())));
  };

  checkIfMoveIsTaken = index => {
    const { board } = this.props.game;

    //Check current index on the board, if its not a number then I need to lock the box, otherwise Its a free move.
    return isNaN(board[index]) ? true : false;
  };

  handleClick = index => {
    const { isGameOver } = this.props.game;

    if (!isGameOver && !this.checkIfMoveIsTaken(index)) {
      //Human Turn
      this.handleHumanTurn(index);
    }
  };

  handleHumanTurn(index) {
    const { human } = this.state.player;

    this.props.dispatch(play(index, human));
  }

  handleAITurn = () => {
    const { board } = this.props.game;
    const { ai } = this.state.player;

    setTimeout(() => {
      // AI Turn
      var computed = Minimax(board, ai);
      this.props.dispatch(play(computed.index, ai));
    }, 300);
  };

  componentDidMount() {
    this.props.dispatch(loadBoard(Array.from(Array(9).keys())));
  }

  componentDidUpdate() {
    const { ai } = this.state.player;
    const { active, isGameOver, winner } = this.props.game;

    if (isGameOver) {
      return alert(`Congratulations Player ${winner}`);
    }

    if (!isGameOver) {
      if (active === ai) {
        //AI Turn
        this.handleAITurn();
      }
    }
  }

  shouldDraw = index => {
    const { board, winner } = this.props.game;

    if (!winner) return null;

    return board[index] === winner ? true : false;
  };

  renderBoxes = () => {
    const { board } = this.props.game;

    return board.map((value, index) => {
      return (
        <Box
          key={index}
          value={value}
          disabled={this.checkIfMoveIsTaken(index)}
          onClick={() => this.handleClick(index)}
          draw={this.shouldDraw(index)}
        />
      );
    });
  };

  render() {
    const { board } = this.props.game;

    if (!board) return null;

    return (
      <div>
        <div className="align-center">
          <UndoRedo onRestart={() => this.handleRestartGame()} />
        </div>
        <div className="game-board">{this.renderBoxes()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game.present
});

export default connect(mapStateToProps)(GameBoard);
