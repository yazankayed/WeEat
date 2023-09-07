import React from 'react';
import '../../styles/search.css';
import { useHistory } from 'react-router-dom';

const Resbox = (props) => {
  const history = useHistory();

  // Converting array of cuisine data to string
  const cuisines = props.data.Cuisine.cuisines ? props.data.Cuisine.cuisines.map((cuisine) => cuisine.name).join(', ') : '';

  // Opening details page on click
  const showDetails = (id) => {
    history.push("/details/" + props.data._id);
  };
  
  const resName = props.data.name;
  const resArea = props.data.locality;
  const mealType = props.type;
  const cost = props.data.cost;
  const resadd = props.data.contact_number;
  const resId = props.data._id;

  return (
    <div className="searchRestarantBox" onClick={() => showDetails(resId)}>
      <div className="img">
        <img src={props.data.thumb} alt="Img not found" className="restrauntImg" />
      </div>

      <div className="details">
        <p className="resnameSearch">{resName}</p>
        <p className="area">{resArea}</p>
        <p className="addr">{resadd}</p>
      </div>

      <div className="que">
        CUISINES:
        <br />
        COST FOR TWO:
      </div>

      <div className="ans">
        {cuisines}
        <br />
        {"$" + cost.toString()}
      </div>
    </div>
  );
}

export default Resbox;
