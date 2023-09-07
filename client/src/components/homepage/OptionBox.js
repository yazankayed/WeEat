import React from "react";
import { useHistory } from "react-router-dom";
import "../../styles/home.css";

const OptionBox = (props) => {
  const history = useHistory();

  const showDetails = () => {
    console.log("clicked");
    history.push(`/details/${props.id}`);
  };

  return (
    <div className="optionBox" onMouseDown={showDetails}>
      <div className="optionBoxl">
        <img className="optionBoximg" src={props.img} alt="nope"></img>
      </div>
      <div className="optionBoxr">
        <div className="optionResname">{props.name}</div>
        <div className="optionResarea">{props.area}</div>
      </div>
    </div>
  );
}

export default OptionBox;
