  import React from "react";
import { Row, Col } from "antd";
import { Typography } from "antd";
import { BackTop } from "antd";

const { Title } = Typography;

export default function Footer() {
  const style = {
    height: 40,
    width: 40,
    lineHeight: "40px",
    borderRadius: 4,
    backgroundColor: "#AAAAAA",
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    flex: "right",
  };
  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        color: "white",
        padding: "80px 80px",
        marginTop: "50px",
      }}
    >
      <Row>
        <Col span={6}>
          <Title level={5} style={{ color: "white", marginBottom: "30px" }}>
            ABOUT SHOP
          </Title>
          <p>
            A modern fashion store where design meets aeshetics, elegance and
            sophistication
          </p>
        </Col>
        <Col span={6}>
          <Title level={5} style={{ color: "white", marginBottom: "30px" }}>
            USEFUL LINKS
          </Title>
          <ul>
            <li style={{ marginBottom: "8px" }}>
              <a href="/" style={{ color: "rgb(178, 178, 178)" }}>
                About Shop
              </a>
            </li>
            <li style={{ marginBottom: "8px" }}>
              <a href="/" style={{ color: "rgb(178, 178, 178)" }}>
                Contact us
              </a>
            </li>
            <li style={{ marginBottom: "8px" }}>
              <a href="/" style={{ color: "rgb(178, 178, 178)" }}>
                FAQ
              </a>
            </li>
          </ul>
        </Col>
        <Col span={6}>
          <Title level={5} style={{ color: "white", marginBottom: "30px" }}>
            CUSTOMER SERVICE
          </Title>
          <ul>
            <li style={{ marginBottom: "8px" }}>
              <a href="/" style={{ color: "rgb(178, 178, 178)" }}>
                Money-back guarantee!
              </a>
            </li>
            <li style={{ marginBottom: "8px" }}>
              <a href="/" style={{ color: "rgb(178, 178, 178)" }}>
                Returns
              </a>
            </li>
            <li style={{ marginBottom: "8px" }}>
              <a href="/" style={{ color: "rgb(178, 178, 178)" }}>
                Shipping
              </a>
            </li>
          </ul>
        </Col>
        <Col span={6}>
          <Title level={5} style={{ color: "white", marginBottom: "30px" }}>
            MY ACCOUNT
          </Title>
          <ul>
            <li style={{ marginBottom: "8px" }}>
              <a href="/" style={{ color: "rgb(178, 178, 178)" }}>
                View Cart
              </a>
            </li>
            <li style={{ marginBottom: "8px" }}>
              <a href="/" style={{ color: "rgb(178, 178, 178)" }}>
                Track My Order
              </a>
            </li>
            <li style={{ marginBottom: "8px" }}>
              <a href="/" style={{ color: "rgb(178, 178, 178)" }}>
                Help
              </a>
            </li>
          </ul>
        </Col>
      </Row>
      <BackTop style={{right:0, height:0}}>
        <div style={style}>UP</div>
      </BackTop>
    </div>
  );
}
