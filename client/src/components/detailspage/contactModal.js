import React, { useState, useContext } from 'react';
import AuthContext from '../../shared/authContext';
import axios from 'axios';
import style from '../../styles/modal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ContactModal = (props) => {
  const [name, setName] = useState(undefined);
  const [mobileno, setMobileno] = useState(undefined);
  const [address, setAddress] = useState(undefined);
  // const [orderPlaced, setOrderPlaced] = useState(false);
  const { cart, close, place } = props;
  const { token } = useContext(AuthContext);
  const history = useHistory()

  const handleInputChange = (type, val) => {
    if (type === 'name') {
      setName(val);
    } else if (type === 'mobileno') {
      setMobileno(val);
    } else if (type === 'address') {
      setAddress(val);
    }
  };

  const closeModal = () => {
    close();
  };

  const orderState = () => {
    history.push("/success");
    // const newcart = cart.filter((item) => item.quantity !== 0);

    // axios({
    //   method: 'post',
    //   url: 'http://localhost:8000/order',
    //   headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    //   data: {
    //     name: name, mobile: mobileno, address: address, items: newcart,
    //   },
    // })
    //   .then(() => {
    //     place();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <React.Fragment>
      <div style={{ "width": "100%" }}><button onClick={closeModal} style={style.customStyles.closebar}>×</button></div>
      <h6 style={style.customStyles.signUp}>Contact Details</h6>
      <input type='text' style={style.customStyles.modalinput} placeholder="Name" onInput={(e) => handleInputChange('name', e.target.value)}></input>
      <input type='text' style={style.customStyles.modalinput} placeholder="Mobile no." onInput={(e) => handleInputChange('mobileno', e.target.value)}></input>
      <textarea style={style.customStyles.modaltextarea} placeholder="Address" onInput={(e) => handleInputChange('address', e.target.value)} rows="4"></textarea>
      <div style={{ "text-align": "center" }}><button style={style.customStyles.signupbutton} onClick={orderState}>Place Order</button></div>
    </React.Fragment>
  );
}

export default ContactModal;
