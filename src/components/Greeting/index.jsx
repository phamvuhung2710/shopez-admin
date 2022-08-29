import React from "react";
import "./style.css";
import cover from "../../img/home_background.png";
function Greeting() {
  return (
    <div className="greeting">
      <div className="greeting-container">
        <div>
          <img
            className="greeting-img"
            src={cover}
            alt="girl in shoes jumping in the air"
          />
        </div>
        <div className="greeting-text">
          CHASE <span>YOUR</span> DREAM IN OUR <span>SHOES</span>
        </div>

        <div className="greeting-gray-box"></div>
        <div className="greeting-bottom-text">Start your journey with us!</div>
        <a href="#idreview" className="greeting-button">
          Get Started
        </a>
      </div>
    </div>
  );
}

export default Greeting;
