import React from "react";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { connect } from "react-redux";

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo, onRestart }) => (
  <React.Fragment>
    {/* <button className="back" onClick={onUndo} disabled={!canUndo}>
      Undo
    </button> */}
    <button className="site" onClick={onRestart}>
      Restart Game
    </button>
    {/* <button
      className={!canRedo ? "button-disabled" : "button"}
      onClick={onRedo}
      disabled={!canRedo}
    >
      Redo
    </button> */}
  </React.Fragment>
);

const mapsStateToProps = state => ({
  canUndo: state.game.past.length > 1,
  canRedo: state.game.future.length > 0
});

const mapDispatchToProps = {
  onUndo: UndoActionCreators.undo,
  onRedo: UndoActionCreators.redo
};

UndoRedo = connect(
  mapsStateToProps,
  mapDispatchToProps
)(UndoRedo);

export default UndoRedo;
