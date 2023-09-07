import React, { useState } from 'react'
import '../styles/form.css'

const Form = (props) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleName(name);
  };

  return (
    <div className="form-container">
      <h3 className="form-header">WeEat Group Chat!</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Pick a name...</label>
          <br />
          <input
            className="form-input"
            type="text"
            placeholder="My name.."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input className="submit-button" type="submit" value="Start Chatting" />
        </div>
      </form>
    </div>
  );
};

export default Form;
