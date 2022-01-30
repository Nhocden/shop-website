import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import "./history.css";
import { Breadcrumb } from "antd";
import { Table } from "antd";
import { Row, Col } from "antd";
import { Steps } from "antd";
import { Result, Button } from "antd";

const { Step } = Steps;

function UserOrderDetails() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [orderDetails, setOrderDetails] = useState([]);
  console.log("orderDetails", orderDetails);
  const columns = [
    {
      title: "PRODUCT",
      dataIndex: "images",
      key: "images",
      align: "left",
      render: (images, record) => (
        <div>
          <Link to={`/detail/${record._id}`}>
            <img src={images.url} alt="" className="checkout-image" />{" "}
            <span style={{ marginLeft: 20 }}>{record.title}</span>
          </Link>
        </div>
      ),
    },
    {
      title: "PRICE",
      dataIndex: "price",
      align: "left",
      key: "price",
      render: (price) => <div>$ {price}</div>,
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
      align: "left",
      render: (quantity, product) => <div>{quantity}</div>,
    },
    {
      title: "TOTAL",
      dataIndex: "price",
      key: "price",
      align: "left",
      render: (quantity, product) => (
        <div>$ {product.price * product.quantity}</div>
      ),
    },
  ];

  const params = useParams();

  useEffect(() => {
    if (token) {
      if (params.id) {
        const getHistoryDetail = async (id) => {
          const res = await axios.get(`/user/history/${id}`, {
            headers: { Authorization: token },
          });
          setOrderDetails(res.data);
        };
        getHistoryDetail(params.id);
      }
    }
  }, [token, params.id]);

  return (
    <div className="checkout-wrap">
      <Breadcrumb className="Breadcrumb">
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/order">Orders</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Order Detail</Breadcrumb.Item>
      </Breadcrumb>

      {orderDetails.status !== 3 ? (
        <div className="step-order">
          <Steps progressDot current={orderDetails.status}>
            <Step title="Ordered" />
            <Step title="Packed" />
            <Step title="Delivered" />
            <Step title="Finished" />
          </Steps>
        </div>
      ) : null}
      {orderDetails.status === 3 ? (
        <div>
          <Result
            status="success"
            title="Successfully Purchased !"
            extra={[
              <Link to="/shop">
                <Button type="primary" key="console">
                  continue shopping
                </Button>
              </Link>,
            ]}
          />
        </div>
      ) : null}

      <Row gutter={20}>
        <Col span={16}>
          <Table
            columns={columns}
            dataSource={orderDetails.cart}
            pagination={false}
            bordered={true}
            rowKey="_id"
          />
        </Col>
        <Col span={8}>
          <div className="total">
            <div className="total-title">
              <h2>CART TOTALS</h2>
            </div>
            <Row className="row-phone">
              <Col span={8}>Phone<span className="span-colon">:</span></Col>
              <Col span={16}>
                <p>
                  {orderDetails.address
                    ? orderDetails.address.phone
                    : null}
                </p>
              </Col>
            </Row>
            <Row className="row-shipping1">
              <Col span={8}>Shipping <span className="span-colon">:</span></Col>
              <Col span={16}>
                <p>
                  {orderDetails.address
                    ? orderDetails.address.addressName
                    : null}
                </p>
                <p>{orderDetails.address ? orderDetails.address.city : null}</p>
              </Col>
            </Row>
            <Row className="row-total">
              <Col span={8}>Total:</Col>
              <Col span={16} style={{ color: "red" }}>
                $ {orderDetails.total}
              </Col>
            </Row>
          </div>
          <div
            style={{
              float: "right",
              margin: "30px 0px",
            }}
          >
            <Link to="/shop">
              <Button type="primary">Continue Shopping</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default UserOrderDetails;
