import React from "react";
import "./Box.css";

const Box = ({ disabled, draw, marker, onClick }) => {
  const style = {
    cursor: disabled ? "no-drop" : "pointer",
    background: draw ? "#8AB0AB" : "#34495E"
  };

  return (
    <div
      disabled={disabled}
      onClick={() => onClick()}
      style={style}
      className="box"
    >
      {isNaN(marker) ? marker : null}
    </div>
  );
};

export default Box;
