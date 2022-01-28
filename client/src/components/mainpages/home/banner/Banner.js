import React from "react";
import { Link } from "react-router-dom";
import { Row, Col} from "antd";
import "./Banner.css";

export default function Banner() {

  return (
    <div className="banner-wrap">
      <Row gutter={20}>
        <Col span={12}>
          <div className="gutter-row banner-image1">
            <h3 >New in</h3>
            <h1>sweater</h1>
            <Link to="/shop/category/sweater"><button>shop now</button></Link> 
          </div>
        </Col>
        <Col span={12}>
          <div className="gutter-row banner-image2">
            <h3>New in</h3>
            <h1>shoes</h1>
            <Link to="/shop/category/shoes"><button>shop now</button></Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}
