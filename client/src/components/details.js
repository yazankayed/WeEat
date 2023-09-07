import React, { useState, useEffect } from "react";
import "../styles/details.css";
import Detailtabs from "./detailspage/DetailTabs";
import axios from "axios";
import { useParams } from "react-router-dom";

const Details = (props) => {
  const [restaurantDetail, setRestaurantDetail] = useState({});
  const [cuisineTypes, setCuisineTypes] = useState([]);
  const [menuu, setMenuu] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/restraunt/id/${id}`)
      .then((res) => {
        setRestaurantDetail(res.data.restraunt);
        // Assuming `cuisines` is an array of cuisine types in the API response
        const cuisines = res.data.restraunt.Cuisine.cuisines.map((cuisine) => cuisine.cuisinetype);
        setCuisineTypes(cuisines);
        setMenuu(res.data.restraunt.menu);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <img src={restaurantDetail.thumb} alt={restaurantDetail.name} className="banner" />
      <div>
        <h1 className="resname">{restaurantDetail.name}</h1>
      {/* Map over the cuisine types and display them */}
      {/* <div className="cuisine-types">
        {cuisineTypes.map((cuisineType, index) => (
          <span key={index} className="cuisine-type">
            {cuisineType}
          </span>
        ))}
      </div> */}
      <Detailtabs cuisineTypes={cuisineTypes} cost={restaurantDetail.cost} menu={menuu} address={restaurantDetail.address} name={restaurantDetail.name} id={restaurantDetail.id} />
      </div>
    </div>
  );
};

export default Details;
