import React, { Component } from "react";
import "./Box.css";

export default class Box extends Component {
  state = {
    text: ""
  };

  handleClick = () => {
    this.setState({ text: this.props.text });
  };

  render() {
    const { restartGame } = this.props;
    return (
      <div onClick={e => this.handleClick()} className="box">
        {restartGame ? "" : this.state.text}
      </div>
    );
  }
}
