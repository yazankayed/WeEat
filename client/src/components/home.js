import React, { useState, useEffect } from "react";
import Widgets from "./homepage/Widgets";
import "../styles/home.css";
import Optionbox from "./homepage/OptionBox";
import axios from "axios";

const Home = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(undefined);
  const [resinCity, setResinCity] = useState([]);
  const [filteredRes, setFilteredRes] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/cities")
      .then((res) => {
        setCities(res.data.cities);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLocationChange = (event) => {
    setSelectedCity(event.target.value);

    axios
      .get(`http://localhost:8000/restraunt/city/${event.target.value}`)
      .then((res) => {
        setResinCity(res.data.restraunts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const automate = (event) => {
    const allRes = resinCity;
    const key = event.target.value;
    const filteredRes = allRes.filter(
      (res) => res.name.toLowerCase().indexOf(key.toLowerCase()) > -1
    );

    setFilteredRes(filteredRes);
    setShowOptions(true);
  };

  const showOption = () => {
    if (showOptions) {
      if (filteredRes.length === 0) {
        return <div className="autooptions">--no results found--</div>;
      } else {
        return (
          <div className="autooptions">
            {filteredRes.map((fil) => (
              <Optionbox
                key={fil._id}
                img={fil.thumb}
                name={fil.name}
                area={fil.locality}
                id={fil._id}
              />
            ))}
          </div>
        );
      }
    } else {
      return null;
    }
  };

  const closeOption = () => {
    setShowOptions(false);
  };

  return (
    <React.Fragment>
      <div className="imgholder">
        <div className="layer">
          <div className="edu">
          </div>
          <div className="des">Find the best restaurants & cafés</div>
          <div className="drops">
            <div className="search1">
              <select name="cars" id="cars" onChange={handleLocationChange}>
                <option value="" hidden>
                  Select city
                </option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="search2">
              <div className="input-icons">
                <i className="fa fa-search icon"></i>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Search restaurants"
                  onChange={automate}
                  onBlur={closeOption}
                />
                {showOption()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Widgets selCity={selectedCity || "Nablus"} />
    </React.Fragment>
  );
};

export default Home;
