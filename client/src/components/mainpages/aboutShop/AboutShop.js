import React from "react";
import "./AboutShop.css";
import Image1 from "../../../Images/about/about-01.jpeg";
import Image2 from "../../../Images/about/about-02.jpeg";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { Row, Col } from "antd";

export default function AboutShop() {
  return (
    <div className="checkout-wrap">
      <Breadcrumb className="Breadcrumb">
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>About Shop</Breadcrumb.Item>
      </Breadcrumb>

      <Row gutter={16}>
        <Col className="about-content" span={14}>
          <div>
            <h1>
              <strong>Our story</strong>
            </h1>
            <p>
              On March 16, 1966, at 704 East Broadway in Anaheim, California,
              brothers Paul Van Doren and James Van Doren, Gordon C Lee, and
              Serge D’Elia opened the first Vans store under the name The Van
              Doren Rubber Company. On that first morning, twelve customers
              purchased Vans deck shoes, which are now known as “Authentic”. The
              company displayed three styles of shoes, which were priced between
              US$2.49 and US$4.99. On the opening day the company had only
              manufactured a few display models without any inventory ready to
              sell—the store rack boxes were actually empty. Nevertheless, the
              twelve customers selected the colors and styles they desired, and
              were asked to return later in the afternoon to pick up their
              purchases. Paul Van Doren and Lee then rushed to the factory to
              manufacture the selected shoes. When the customers returned that
              afternoon to pick up their shoes, Paul Van Doren and Gordon C Lee
              realized that they had forgotten to maintain a cash reserve to
              provide change to customers. The customers were therefore given
              the shoes and asked to return the following day with their
              payments. All twelve of the customers returned the following day
              to pay for their items.{" "}
            </p>
            <p>
              The original version of the Vans skateboard logo was designed in
              Costa Mesa, California in the 1970s by Mark Van Doren, the son of
              then President- and co-owner James Van Doren, at the age of 13.
              www.vans.com
            </p>
          </div>
        </Col>
        <Col className="about-image" span={10}>
          <div className="how-bor1">
            <div class="hov-img0">
              <img className="row-image image11" src={Image1} alt="IMG" />
            </div>
          </div>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 150 }}>
        <Col className="about-image" span={10}>
          <div className="how-bor1">
            <div class="hov-img0">
              <img className="row-image image22" src={Image2} alt="IMG" />
            </div>
          </div>
        </Col>
        <Col className="about-content" span={14}>
          <div>
            <h1>
              <strong>Our Mission</strong>
            </h1>
            <p>Lifestyle merchandising is our business and our passion. The goal for our brands is to build a strong emotional bond with the customer. To do this we must build lifestyle environments that appeal emotionally, and offer fashion correct products on a timely basis. Our customers are the reason and inspiration for everything we do.</p>
            <p>
            To innovate, to lead, to enhance, to provide best-value products and services to global customers.
            </p>
            <p>To make a difference through our branding to stay ahead of fashion trends, market changes.</p>
            <p>To enhance the quality of life for our business partners,customers and employees.</p>
          </div>
        </Col>
      </Row>
    </div>
  );
}
