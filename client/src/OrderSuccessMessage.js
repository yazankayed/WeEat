import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./styles/success.css"; // Import your CSS file for styling
import axios from "axios";

const OrderSuccessMessage = () => {
  const history = useHistory();
  const [showMessage, setShowMessage] = useState(true);

  useEffect(()=>{
    axios.get('http://localhost:8000/email')
        .then(res=>{
          console.log("sssssssssssssssssssssssssssssss")
        })
        .catch(err => console.error(err));
},[]);


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
      // Automatically navigate to the desired route ("/" in this case) after 4 seconds
      history.push("/");
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [history]);

  return (
    <div className={`order-success ${showMessage ? "show" : "hide"}`}>
      <div className="success-message">
        <h2>Your order has been placed successfully!</h2>
        <p>Thank you for your purchase.</p>
      </div>
    </div>
  );
};

export default OrderSuccessMessage;
