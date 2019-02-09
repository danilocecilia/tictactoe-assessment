import React, { Component } from "react";
import "./GameBoard.css";
import Minimax, { Winning } from "./minimax";
import Box from "./box/Box";
import UndoRedo from "../../containers/UndoRedo";
import { play, loadBoard, clearBoard, score } from "../../actions";
import { connect } from "react-redux";

class GameBoard extends Component {
  state = {
    // Building an array of nine possible positions
    isAITurn: false,
    player: {
      ai: "X",
      human: "O"
    }
  };

  handleRestartGame = () => {
    this.props.dispatch(clearBoard(Array.from(Array(9).keys())));
  };

  handleClick = index => {
    this.props.dispatch(play(index, this.state.player.human));
    this.setState({ isAITurn: true });
  };

  handleAITurn = () => {
    const { board } = this.props;

    // AI Turn
    var computed = Minimax(board[board.length - 1], this.state.player.ai);

    this.props.dispatch(play(computed.index, this.state.player.ai));

    this.setState({ isAITurn: false });
  };

  componentDidMount() {
    this.props.dispatch(loadBoard(Array.from(Array(9).keys())));
  }

  checkWinLose = () => {
    const { board } = this.props;
    const { player } = this.state;
    const index = board.length - 1;

    if (Winning(board[index], player.ai)) {
      alert("you lose");
    } else if (Winning(board[index], player.human)) {
      alert("you win");
    } else if (board.length > 8) {
      alert("tie");
    }
  };

  renderBoxes = () => {
    const { board } = this.props;
    const { isAITurn } = this.state;
    const index = board.length - 1;

    if (isAITurn) this.handleAITurn();

    if (board.length === 0) return null;

    this.checkWinLose();

    return board[index].map((value, index) => {
      return (
        <Box
          key={index}
          value={value}
          onClick={() => this.handleClick(index)}
        />
      );
    });
  };

  renderScore = () => (
    <ul>
      <li>{this.props.score ? this.props.score : "0"}</li>
    </ul>
  );

  render() {
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
  past: state.board.past,
  board: state.board.present,
  score: state.score
});

export default connect(mapStateToProps)(GameBoard);
