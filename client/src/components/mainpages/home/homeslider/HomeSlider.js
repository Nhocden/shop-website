import React from "react";
import { Link } from "react-router-dom";
import Slider1 from "../../../../Images/slider/slide5.jpg";
import Slider2 from "../../../../Images/slider/sweaterbg.jpg";
import Slider3 from "../../../../Images/slider/slide8.jpg";
import { Carousel } from "antd";
import { Button } from "antd";

const contentStyle1 = {
  height: "600px",
  width: "100%",
  color: "#fff",
  background: `url(${Slider1})`,
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  backgroundPosition: "center",
  textTransform: "uppercase",
};

const contentStyle2 = {
  height: "600px",
  width: "100%",
  color: "#fff",
  background: `url(${Slider2})`,
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  backgroundPosition: "center",
  textTransform: "uppercase"
};

const contentStyle3 = {
  height: "600px",
  width: "100%",
  color: "#fff",
  background: `url(${Slider3})`,
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  backgroundPosition: "center",
  textTransform: "uppercase"
};

export default function HomeSlider() {
  return (
    <div>
      <Carousel autoplay>
        <div>
          <div style={contentStyle1}>
            <h3 className="slider-title">You're Looking Good</h3>
            <h1 className="slider-content"> Tailored Look </h1>
            <Link to="/shop">
              <Button className="slider-button">Discover More</Button>
            </Link>
          </div>
        </div>
        <div>
          <div style={contentStyle2}>
            <h3 className="slider-title">Wardrobe Upgrade</h3>
            <h1 className="slider-content"> Fresh Style </h1>
            <Link to="/shop">
              <Button className="slider-button">Discover More</Button>
            </Link>
          </div>
        </div>
        <div>
          <div style={contentStyle3}>
            <h3 className="slider-title">Vibrant Colors</h3>
            <h1 className="slider-content"> Get Started </h1>
            <Link to="/shop">
              <Button className="slider-button">Discover More</Button>
            </Link>
          </div>
        </div>
      </Carousel>
    </div>
  );
}
