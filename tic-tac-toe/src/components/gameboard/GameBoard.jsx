import React, { Component } from "react";
import "./GameBoard.css";
import Minimax, { Winning } from "./minimax";
import Box from "./box/Box";
import UndoRedo from "../../containers/UndoRedo";
import { play, loadBoard, clearBoard, endGame } from "../../actions";
import { connect } from "react-redux";

class GameBoard extends Component {
  state = {
    isAITurn: false,
    player: {
      ai: "X",
      human: "O"
    },
    winner: ""
  };

  handleRestartGame = () => {
    this.props.dispatch(clearBoard(Array.from(Array(9).keys())));
  };

  checkIfMoveIsTaken = index => {
    const {
      board: { board }
    } = this.props;

    //Check current index on the board, if its not a number then I need to lock the box, otherwise Its a free move.
    var isMoveTaken = isNaN(board[index]) ? true : false;

    return isMoveTaken;
  };

  handleClick = index => {
    if (!this.checkIfMoveIsTaken(index)) {
      this.props.dispatch(play(index, this.state.player.human));
      this.setState({ isAITurn: true });
    }
  };

  handleAITurn = () => {
    const {
      board: { board }
    } = this.props;

    // AI Turn
    var computed = Minimax(board, this.state.player.ai);

    this.props.dispatch(play(computed.index, this.state.player.ai));

    this.setState({ isAITurn: false });
  };

  componentDidMount() {
    this.props.dispatch(loadBoard(Array.from(Array(9).keys())));
  }

  componentWillUpdate(nextProps, nextState) {
    //this.checkWinLose();
  }

  checkWinLose = () => {
    const {
      board: { board }
    } = this.props;
    const { player } = this.state;

    if (!board) return null;

    if (Winning(board, player.ai)) {
      //this.props.dispatch(endGame(player.ai));

      alert("you lose");
    } else if (Winning(board, player.human)) {
      //this.props.dispatch(endGame(player.human));

      alert("you win");
    }
    //  else if (board.length > 8) {
    //   alert("tie");
    // }
  };

  shouldDraw = index => {
    const {
      board: { board }
    } = this.props;
    const { winner } = this.state.winner;

    if (!winner) return null;

    return board[index] === winner ? true : false;
  };

  renderBoxes = () => {
    const {
      board: { board }
    } = this.props;
    const { isAITurn } = this.state;

    if (isAITurn) this.handleAITurn();

    if (!board) return null;

    this.checkWinLose();

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

  // renderScore = () => (
  //   <ul>
  //     <li>{this.props.score ? this.props.score : "0"}</li>
  //   </ul>
  // );

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
  score: state.score,
  winner: state.winner
});

export default connect(mapStateToProps)(GameBoard);
