import React, { useContext } from 'react';
import Modal from 'react-modal';
import AuthContext from '../shared/authContext';
import '../styles/navbar.css';
import Signupmodal from './navbar/signupmodal';
import Loginmodal from './navbar/loginmodal';
import { Link } from 'react-router-dom';

const style = require('../styles/modal');

const Navbar = () => {
  const { isLoggedIn, openedModal, userName, closeModal, openModalS, openModalL, logout } = useContext(AuthContext);

  return (
    <div className="topnav">
      <ul className="navul">
      <li className="e logo">
  <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
    <img className="imggg" src="https://i.imgur.com/kCCNUfp.png" alt="logo" />
  </Link>
</li>
        <li className='left'>
          <Link to="/chat" style={{ textDecoration: 'none', color: 'white', fontSize: '15px', marginRight:'20px' }}>
            Chat
          </Link>
        </li>

        {isLoggedIn ? (
          <li className="right">
            <button className="border" onClick={logout}>
              Log Out
            </button>
          </li>
        ) : (
          <li className="right">
            <button className={openedModal === 'login' ? 'border' : ''} onClick={openModalL}>
              Login
            </button>
          </li>
        )}

        {isLoggedIn ? (
          <li className="right">
            <button>{userName}</button>
          </li>
        ) : (
          <li className="right">
            <button className={openedModal === 'signup' ? 'border' : ''} onClick={openModalS}>
              Create Account
            </button>
          </li>
        )}
      </ul>

      <Modal isOpen={openedModal === 'signup'} style={style.customStyles}>
        <Signupmodal close={closeModal} change={openModalL} />
      </Modal>

      <Modal isOpen={openedModal === 'login'} style={style.customStyles}>
        <Loginmodal close={closeModal} change={openModalS} />
      </Modal>
    </div>
  );
}

export default Navbar;
