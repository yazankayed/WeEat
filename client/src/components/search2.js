import React, { useState, useEffect } from "react";
import "../styles/search.css";
import Filter from "./searchpage/Filter";
import Resbox from "./searchpage/restarauntbox";
// import Pagination from "./searchpage/Pagination";
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
    sort: undefined,
    // page: 1,
  });
  // const [pagination, setPagination] = useState({
  //   restarants: [],
  //   pages: [],
  // });
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

// const axiosPagesCall = async () => {
//   try {
//     const response = await axios.post(
//       "http://localhost:8000/restraunt/pages",
//       filterData
//     );

//     const pagesArray = Array.from({ length: response.data.pages }, (_, i) => i + 1);
//     const restaurantArray = Array.from({ length: response.data.restaraunts }, (_, i) => i + 1);

//     setPagination({ restarants: restaurantArray, pages: pagesArray });
//   } catch (err) {
//     console.log(err);
//   }
// };


  // const axiosResultCall = () => {
  //   axios({
  //     method: "post",
  //     url: "http://localhost:8000/restraunt/filter",
  //     headers: { "Content-Type": "application/json" },
  //     data: JSON.stringify(filterData),
  //   })
  //     .then((res) => {
  //       setRestaurants(res.data.restraunts);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

const axiosResultCall = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8000/restraunt/filter",
      filterData
    );

    setRestaurants(response.data.restraunts);
    console.log(response.data.restraunts, "This is fixed me");
    console.log(filterData, "Filter data")
  } catch (err) {
    console.log(err);
  }
};

  // useEffect(() => {
  //   axios.post(
  //     "http://localhost:8000/restraunt/filter",
  //     filterData
  //   )
  //     .then((res) => {
  //       setRestaurants(res.data.restraunts);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [restaurants]);

  const handleClick = () => {
    setRender(!render);
    setText(
      render
        ? '<span id="arrow">&#9662;</span>'
        : '<span id="arrow">&#9652;</span>'
    );
  };

  const renderFilter = () => {
    const selCity = filterData.city_name;
    return render ? (
      <Filter
        onFilterDataChange={filterDataChange}
        onCostChange={costDataChange}
        onCuisineChange={cuisineDataChange}
        selectedCity={selCity}
      />
    ) : null;
  };

  const renderFilterDesk = () => {
    const selCity = filterData.city_name;
    return window.innerWidth > 800 ? (
      <Filter
        onFilterDataChange={filterDataChange}
        onCostChange={costDataChange}
        onCuisineChange={cuisineDataChange}
        selectedCity={selCity}
      />
    ) : null;
  };

  // const pageChange = (pageno) => {
  //   const newFilter = { ...filterData };
  //   newFilter.page = pageno;
  //   setFilterData(newFilter);
  //   axiosResultCall();
  // };

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

  const cuisineDataChange = (cuis, current) => {
    if (filterData.cuisine) {
      if (current === 0) {
        const newFilter1 = { ...filterData };
        newFilter1.cuisine.push(cuis);
        setFilterData(newFilter1);
      } else if (current === 1) {
        const newFilter2 = { ...filterData };
        const arr = newFilter2.cuisine;
        const removedarr = arr.filter((e) => e !== cuis);
        if (removedarr.length === 0) {
          newFilter2.cuisine = undefined;
        } else {
          newFilter2.cuisine = removedarr;
        }
        setFilterData(newFilter2);
      }
    } else {
      const newFilter3 = { ...filterData };
      newFilter3.cuisine = [cuis];
      setFilterData(newFilter3);
    }
    // axiosPagesCall();
    axiosResultCall();
  };

  const selectedCity = filterData.city_name;
  const mealType = filterData.type;

  return (
    <div className="searchContainer">
      <div className="title">{mealType + " places in " + selectedCity}</div>
      <div className="leftb">
        <div className="filterStateHolder">
          <button id="filterState" onClick={handleClick}>
            Filter/Sort{parse(text)}
          </button>
        </div>
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
            {console.log(restaurants)}
          </div>
        )}
        {/* {pagination.pages.length > 0 ? (
          <Pagination
            pages={pagination.pages}
            onChangePage={pageChange}
            onFilterDataChange={filterDataChange}
          />
        ) : null} */}
      </div>
    </div>
  );
}

export default Search;
