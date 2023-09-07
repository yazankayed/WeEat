import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import Widget from "./Widget";
import axios from "axios";

const Widgets = (props) => {
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    // Initial call for data
    axios({
      method: "get",
      url: "http://localhost:8000/widget"})
      .then((res) => {
        setWidgets(res.data.widgets);
        console.log(widgets);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const mealtypes = widgets;
  const selectedCity = props.selCity;

  return (
    <main className="holders">
      <p className="quick">Quick Searches</p>
      <p className="quick_des">Discover restaurants by type of meals</p>
      <div className="container-fluid">
        <div className="row">
          {mealtypes.map((item) => {
            return <Widget name={item.types[0].mealtype} selectedCity={selectedCity} />;
          })}
        </div>
      </div>
    </main>
  );
}

export default Widgets;
