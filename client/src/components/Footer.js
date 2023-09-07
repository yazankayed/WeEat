import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3 ><Link style={{color: 'white', style:'none'}} to={"/About"}>About Us</Link></h3>
            <p>Welcome to We-Eat, your go-to destination for food! We-Eat is a community-driven platform that connects food enthusiasts from all over the world. Our mission is to inspire, share, and celebrate the joy of food.</p>
          </div>
          <div className="footer-column">
            <h3>Contact</h3>
            <p>Email: WeEat@Axsos.com</p>
            <p>Phone: +970 599123123</p>
          </div>
          <div className="footer-column">
            <h3>Social Media</h3>
            <ul className="social-icons">
              <li><a href="#"><i className="fab fa-facebook"></i></a></li>
              <li><a href="#"><i className="fab fa-twitter"></i></a></li>
              <li><a href="#"><i className="fab fa-instagram"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} We Eat. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;