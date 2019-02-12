import React, { Component } from "react";
import "./Box.css";

export default class Box extends Component {
  render() {
    const { disabled, draw } = this.props;

    var style = {
      cursor: disabled ? "no-drop" : "pointer",
      background: draw ? "#8AB0AB" : "#34495E"
    };

    return (
      <div
        disabled={disabled}
        onClick={e => this.props.onClick()}
        style={style}
        className="box"
      >
        {isNaN(this.props.value) ? this.props.value : ""}
      </div>
    );
  }
}
