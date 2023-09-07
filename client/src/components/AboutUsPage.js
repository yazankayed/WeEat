import React from "react";
import "../styles/AboutUsPage.css";

const AboutUsPage = () => {
  return (
    <div className="about-us-container">
      <h1 className="about-us-heading">About We Eat</h1>
      <div className="about-us-content">
        <div className="about-us-image">
          <img src={require("../assets/breakfast.png")} alt="About Us" />
        </div>
        <div className="about-us-text">
          <h4>WeEat: Redefining Your Culinary Journey</h4>
          <p>
            WeEat is more than just a platform; it's a gastronomic adventure
            waiting to be explored. Our mission is to bring people together
            through the love of food, transcending borders and cultures. At
            WeEat, we believe that dining is an experience, a journey filled
            with flavors, textures, and stories. Whether you're a food
            enthusiast or a casual diner, WeEat is your trusted companion in
            discovering the culinary treasures of the world.
          </p> <hr/>
          <h4>A World of Flavors at Your Fingertips</h4>
          <p>
            With WeEat, your culinary journey knows no bounds. We curate a
            diverse selection of restaurants, from cozy local eateries to
            upscale international cuisines, ensuring that there's something for
            every palate. Our platform empowers you to explore and savor flavors
            from around the globe, offering a seamless dining experience right
            at your fingertips. Whether you're seeking comfort in familiar
            dishes or craving the excitement of new tastes, WeEat invites you to
            embark on a culinary adventure like no other. Join us, and let's
            savor the world together, one bite at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
