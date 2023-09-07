import React from "react";
import { useHistory } from "react-router-dom";
import "../../styles/home.css";

const Widget = (props) => {
  const history = useHistory();

  const clickHandle = () => {
    const selectedCity = props.selectedCity;
    history.push(`/search?type=${props.name}&city=${selectedCity}`);
  };

  return (
    <div className="col-sm-12 col-lg-4" onClick={clickHandle}>
      <div className="boxes">
        <div className="box-img">
          <img
            src={require("../../assets/" + props.name + ".png")}
            alt={props.name}
            className="box-img_img"
          />
        </div>
        <div className="box-content">
          <p className="box-content_title">{props.name}</p>
          <p className="box-content_des">
            Start your day with exclusive {props.name}  options
          </p>
        </div>
      </div>
    </div>
  );
}

export default Widget;
