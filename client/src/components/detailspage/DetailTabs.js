import React, { useState, useContext, useEffect } from 'react';
import '../../styles/customtabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MenuModal from './MenuModal';
import '../../styles/details.css';
import AuthContext from '../../shared/authContext';
import Modal from 'react-modal';
import ContactModal from './contactModal';
import SuccessModal from './SuccessModal';
import axios from 'axios';
import style from '../../styles/modal';

const DetailTabs = (props) => {
  const [cart, setCart] = useState([]);
  const [isContactOpen, setIsContactOpen] = useState(undefined);
  // const { id, name, cuisine, cost, address } = props;
  const { isLoggedIn, openModalS } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/restraunt/id/64f76131781084ec4c2db7c5'
        );
        // setMenu(response.data.restraunt.menu);
        console.log(props.id, "kkkkkkkkkkkkkkkkkkkkkk")
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [props.id]);

  const addC = (dishS, cost) => {
    const newCart = [...cart];
    let duplicate = false;

    if (newCart.length === 0) {
      newCart.push({ res: props.name, dish: dishS, cost: cost, quantity: 1 });
    } else {
      for (let i = 0; i < newCart.length; i++) {
        if (newCart[i].res === props.name && newCart[i].dish === dishS) {
          newCart[i].quantity += 1;
          duplicate = true;
          break;
        }
      }
      if (!duplicate) {
        newCart.push({ res: props.name, dish: dishS, cost: cost, quantity: 1 });
      }
    }

    setCart(newCart);
  };

  const removeC = (dishS, cost) => {
    const newCart = [...cart];

    if (newCart.length > 0) {
      for (let i = 0; i < newCart.length; i++) {
        if (newCart[i].cost === cost && newCart[i].dish === dishS) {
          newCart[i].quantity -= 1;
          break;
        }
      }
    }

    setCart(newCart);
  };

  const paynow = () => {
    if (cart.length > 0) {
      const subTotal = cart.reduce((total, item) => total + item.cost * item.quantity, 0);

      if (subTotal > 0) {
        return (
          <div className="paynow">
            <div className='menuleft'>
              <p className='paynowpara'>{'Subtotal: $' + subTotal}</p>
            </div>
            <div className='menuright'>
              <button className='paynowbutt' onClick={payfunc}>Pay Now</button>
            </div>
          </div>
        );
      }
    }
  };

  const payfunc = () => {
    if (isLoggedIn) {
      setIsContactOpen('contact');
    } else {
      openModalS();
    }
  };

  const closeModal = () => {
    setIsContactOpen(undefined);
  };

  const placeOrder = () => {
    setIsContactOpen('success');
  };

  // console.log(props.cuisine.cuisines[0].cuisinetype);

  return (
    <React.Fragment>
      <Tabs>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Contact</Tab>
          <Tab>Place Order Online</Tab>
        </TabList>

        <TabPanel>
          <h1 className="mainhead">About this place</h1>
          <h2 className="subhead">Cuisine</h2>
          <h2 className="cuisine">{props.cuisineTypes.join(", ")}</h2>
          <h2 className="subhead">Average cost</h2>
          <h2 className="cost">{"$" + props.cost + " for two people (approx.)"}</h2>
        </TabPanel>
        <TabPanel>
          <h1 className="mainhead">Contact Details</h1>
          <h2 className="subhead">Phone</h2>
          <h2 className="phone">+970 599123123</h2>
          <h2 className="subhead">Address</h2>
          <h2 className="address">{props.address}</h2>
        </TabPanel>
        <TabPanel>
          <h1 className="mainhead">{props.name + "'s Menu"}</h1>
          
          {props.menu.map((item) => (
            <MenuModal item={item} add={addC} remove={removeC} />
          ))}
          {paynow()}
        </TabPanel>
      </Tabs>
      <Modal isOpen={isContactOpen === "contact"} style={style.customStyles}>
        <ContactModal close={closeModal} place={placeOrder} cart={cart} />
      </Modal>
      <Modal isOpen={isContactOpen === "success"} style={style.customStyles}>
        <SuccessModal close={closeModal} />
      </Modal>
    </React.Fragment>
  );
}

DetailTabs.contextType = AuthContext;

export default DetailTabs;
