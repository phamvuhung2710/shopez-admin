import React, { useState } from "react";
import "./style.css";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import slider1 from "../../img-slider/slider1.png";
import slider2 from "../../img-slider/slider2.png";
import slider3 from "../../img-slider/slider3.png";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

function Slider() {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <div className="slider-container">
      <div
        direction="left"
        className="arrow-left"
        onClick={() => handleClick("left")}
      >
        <ChevronLeftOutlinedIcon />
      </div>
      <Wrapper slideIndex={slideIndex}>
        <div className="slide">
          <div className="img-container">
            <img className="image" src={slider1} alt=""></img>
          </div>
          <div className="info-container">
            <div className="slide-description">
              DON'T MISS OUR BIGGEST SALE!
            </div>
          </div>
        </div>

        <div className="slide">
          <div className="img-container">
            <img className="image" src={slider2} alt=""></img>
          </div>
          <div className="info-container">
            <div className="slide-description">
              UP TO 30% OFF ON NIKE SHOES!
            </div>
          </div>
        </div>

        <div className="slide">
          <div className="img-container">
            <img className="image" src={slider3} alt=""></img>
          </div>
          <div className="info-container">
            <div className="slide-description">
              IT'S TIME<br></br> TO ELEVATE YOUR RUN!
            </div>
          </div>
        </div>
      </Wrapper>
      <div
        direction="right"
        className="arrow-right"
        onClick={() => handleClick("right")}
      >
        <ChevronRightOutlinedIcon />
      </div>
    </div>
  );
}

export default Slider;
