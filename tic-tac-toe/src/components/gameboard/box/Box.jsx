import React, { Component } from "react";
import "./Box.css";

export default class Box extends Component {
  render() {
    debugger;
    return (
      <div onClick={e => this.props.onClick()} className="box">
        {isNaN(this.props.value) ? this.props.value : ""}
      </div>
    );
  }
}
