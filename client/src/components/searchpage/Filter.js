import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/search.css';

const Filter = (props) => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(props.selectedCity);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedCost, setSelectedCost] = useState({});
  // const [selectedSort, setSelectedSort] = useState('');
  const [sortOrder, setSortOrder] = useState(1); // Default to ascending order (Low to High)
  

  const { filterData, onFilterDataChange, onCostChange, onCuisineChange } = props;

  // Fetch cities and update selectedCity when filterData changes
  useEffect(() => {
    axios.get('http://localhost:8000/cities')
      .then((res) => {
        setCities(res.data.cities);
        setSelectedCity(filterData.city_name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sortOrder]);

  // Handle city selection change
  const handleLocationChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    onFilterDataChange('city_name', city);
  };

  // Handle cuisine checkbox change
  const handleCuisineChange = (value, isChecked) => {
    const newSelectedCuisines = [...selectedCuisines];

    if (isChecked) {
      newSelectedCuisines.push(value);
    } else {
      const index = newSelectedCuisines.indexOf(value);
      if (index !== -1) {
        newSelectedCuisines.splice(index, 1);
      }
    }

    setSelectedCuisines(newSelectedCuisines);
    onCuisineChange(newSelectedCuisines);
  };

  // Handle cost range radio button change
  const handleCostChange = (min, max) => {
    setSelectedCost({ min, max });
    onCostChange(min, max);
  };

  const handleSort = async (order) => {
    try {
      const response = await axios.get(`/restraunt/sort/${order}`);
      props.setRestaurants(response.data.restaurants);
      setSortOrder(order);
    } catch (error) {
      console.error('Error sorting restaurants:', error);
    }
  };
  return (
    <div className="filterSelect">
      <h4 className="filtermhead">Filters</h4>
      <p className="filtershead">Change Location</p>
      <div className="custom-select-search">
        <select onChange={handleLocationChange} value={selectedCity}>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <p className="filtershead">Cuisine</p>
      {/* Render checkboxes for cuisines */}
      <input type="checkbox" id="Arabian" name="Arabian" className="checkbox" value="arabian" onChange={handleCuisineChange}/>
      <label htmlFor="Arabian" className="checkboxl"> Arabian </label>
      <br />
      <input type="checkbox" id="Italian" name="Italian" className="checkbox" value="italian" onChange={handleCuisineChange}/>
      <label htmlFor="Italian" className="checkboxl"> Italian </label>
      <br />
      <input type="checkbox" id="Chinese" name="Chinese" className="checkbox" value="chinese" onChange={handleCuisineChange}/>
      <label htmlFor="Chinese" className="checkboxl"> Chinese </label>
      <br />
      <input type="checkbox" id="FastFood" name="FastFood" className="checkbox" value="fastFood" onChange={handleCuisineChange}/>
      <label htmlFor="FastFood" className="checkboxl"> Fast Food </label>
      <br />
      <input type="checkbox" id="FastFood" name="FastFood" className="checkbox" value="fastFood" onChange={handleCuisineChange}/>
      <label htmlFor="FastFood" className="checkboxl"> Sea Food </label>
      <br />
      {/* Add more checkboxes for other cuisines */}
      
      <p className="filtershead">Cost for two</p>
      {/* Render radio buttons for cost range */}
      <input
        type="radio"
        id="cost0"
        name="cost"
        className="checkbox"
        onChange={() => handleCostChange(0, 5)}
      />
      <label htmlFor="cost0" className="checkboxl">
        Less than $5
      </label>
      <br />
      <input type="radio" id="cost1" name="cost" className="checkbox" onChange ={()=>handleCostChange(6,10)}/>
      <label htmlFor="cost1" className="checkboxl" >$5 to $10</label><br/>
      <input type="radio" id="cost2" name="cost" className="checkbox" onChange ={()=>handleCostChange(11,15)}/>
      <label htmlFor="cost2" className="checkboxl" >$10 to $15</label><br/>
      <input type="radio" id="cost3" name="cost" className="checkbox" onChange ={()=>handleCostChange(16,20)}/>
      <label htmlFor="cost3" className="checkboxl" >$15 to $20</label><br/>
      <input type="radio" id="cost4" name="cost" className="checkbox" onChange ={()=>handleCostChange(21,99999)}/>
      <label htmlFor="cost4" className="checkboxl" >$20+</label><br/>
      {/* Add more radio buttons for other cost ranges */}
      
      <h4 className="filtermhead">Sort</h4>
      {/* Render radio buttons for sorting */}
      <input
        type="radio"
        id="sort1"
        name="sort"
        className="checkbox"
        onChange={() => handleSort(1)} // Low to High
        checked={sortOrder === 1}
      />
      <label htmlFor="sort1" className="checkboxl">
        Low to High
      </label>
      <br />
      <input
        type="radio"
        id="sort2"
        name="sort"
        className="checkbox"
        onChange={() => handleSort(-1)} // High to Low
        checked={sortOrder === -1}
      />
      <label htmlFor="sort2" className="checkboxl">
        High to Low
      </label>
    </div>
  );
}

export default Filter;
