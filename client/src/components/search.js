import React, { useState, useEffect } from "react";
import "../styles/search.css";
import Filter from "./searchpage/Filter";
import Resbox from "./searchpage/restarauntbox";
import Pagination from "./searchpage/Pagination";
import queryString from "query-string";
import parse from "html-react-parser";
import axios from "axios";

const Search = () => {
  const [render, setRender] = useState(false);
  const [text, setText] = useState('<span id="arrow">&#9662;</span>');
  const [filterData, setFilterData] = useState({
    city_name: "Nablus",
    type: undefined,
    cuisine: undefined,
    mincost: undefined,
    maxcost: undefined,
    sort: "asc", // Initial sorting order
    page: 1,
  });

  const [restaurants, setRestaurants] = useState([]);
  

  useEffect(() => {
    const values = queryString.parse(window.location.search);
    const newFilter = { ...filterData };
    newFilter.type = [values.type];
    newFilter.city_name = values.city;
    setFilterData(newFilter);
    // axiosPagesCall();
    axiosResultCall();
  }, []);

const axiosResultCall = async () => {
    try {
      const queryParams = { ...filterData, sort: filterData.sort }; // Include the sort parameter
      const response = await axios.get("http://localhost:8000/restraunt/filter", {
        params: queryParams,
      });
      setRestaurants(response.data.restaurants);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    setRender(!render);
    setText(
      render
        ? '<span id="arrow">&#9662;</span>'
        : '<span id="arrow">&#9652;</span>'
    );
  };


const renderFilterDesk = () => {
    const selCity = filterData.city_name;
    return window.innerWidth > 800 ? (
      <Filter
        onFilterDataChange={filterDataChange}
        onCostChange={costDataChange}
        onCuisineChange={cuisineDataChange}
        selectedCity={selCity}
        filterData={filterData} // Pass filterData as a prop
        setRestaurants={setRestaurants}
      />
    ) : null;
  };


  const filterDataChange = (key, value) => {
    const newFilter = { ...filterData };
    newFilter[key] = value;
    setFilterData(newFilter);
    axiosResultCall();
    // axiosPagesCall();
  };

  const costDataChange = (min, max) => {
    const newFilter = { ...filterData };
    newFilter.mincost = min;
    newFilter.maxcost = max;
    setFilterData(newFilter);
    axiosResultCall();
    // axiosPagesCall();
  };


const cuisineDataChange = (cuis, isChecked) => {
    const selectedCuisines = filterData.cuisine || [];
  
    if (isChecked) {
      selectedCuisines.push(cuis);
    } else {
      const index = selectedCuisines.indexOf(cuis);
      if (index !== -1) {
        selectedCuisines.splice(index, 1);
      }
    }
  
    const newFilter = { ...filterData };
    newFilter.cuisine = selectedCuisines.join(',');
    setFilterData(newFilter);
  
    // axiosPagesCall();
    axiosResultCall();
  };

  const selectedCity = filterData.city_name;
  const mealType = filterData.type;

  const renderFilter = () => {
    const selCity = filterData.city_name;
    return render ? (
      <Filter
      onFilterDataChange={filterDataChange}
      onCostChange={costDataChange}
      onCuisineChange={cuisineDataChange}
      selectedCity={selCity}
      selectedSort={filterData.sort} // Pass selectedSort as a prop
      />
    ) : null;
  };
  return (
    <div className="searchContainer">
      <div className="title">{mealType + " places in " + selectedCity}</div>
      <div className="leftb">
        <div className="filterStateHolder">
          <button id="filterState" onClick={handleClick}>
            Filter/Sort{parse(text)}
          </button>
        </div>
        {/* Pass filterData and relevant functions as props */}
        {renderFilter()}
        {renderFilterDesk()}
      </div>
      <div className="rigthb">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => {
            return (
              <Resbox key={restaurant.id} data={restaurant} type={mealType} />
            );
          })
        ) : (
          <div className="searchRestarantBox sorry">
            Sorry, No results found!
            {console.log(restaurants, "RESTAURANTS")}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;