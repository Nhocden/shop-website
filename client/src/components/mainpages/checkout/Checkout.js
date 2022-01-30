import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
// import PaypalButton from "./PaypalButton";
import { Row, Col } from "antd";
import { Table } from "antd";
import { Button } from "antd";
import { Breadcrumb } from "antd";
import { message } from "antd";
import { useHistory } from "react-router-dom";
import { Result } from "antd";
import { Form, Input } from "antd";

function Cart() {
  const history = useHistory();
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [userInfo] = state.userAPI.userInfo;
  const [token] = state.token;
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState({
    addressName: "",
    city: "",
    phone: "",
  });
  console.log("userInfo", userInfo);
  console.log("address", address);

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
      title: "SIZE",
      dataIndex: "size",
      key: "size",
      align: "left",
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      align: "left",
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
      align: "left",
      render: (quantity, record) => (
        <div>
          <Button
            onClick={() => decrement(record._id, record.size)}
            type="primary"
            danger
            ghost
            className="button-quantity decrement"
          >
            {" "}
            -{" "}
          </Button>
          <span>{record.quantity}</span>
          <Button
            onClick={() => increment(record._id, record.size)}
            type="primary"
            ghost
            className="button-quantity increment"
          >
            {" "}
            +{" "}
          </Button>
        </div>
      ),
    },
    {
      title: "TOTAL",
      dataIndex: "price",
      key: "price",
      align: "left",
      render: (text, product) => <div>{product.price * product.quantity}</div>,
    },
  ];

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.quantity * item.price;
      }, 0);

      setTotal(total);
      if (userInfo.address) setAddress(...userInfo.address);
    };

    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id, size) => {
    cart.forEach((item) => {
      if (item._id === id && item.size === size) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id, size) => {
    cart.forEach((item) => {
      if (item._id === id && item.size === size) {
        item.quantity === 1 ? removeProduct(id, size) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id, size) => {
    if (window.confirm("Do you want to delete this product?")) {
      cart.forEach((item, index) => {
        if (item._id === id && item.size === size) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart(cart);
    }
  };

  const HandleChange = (e) => {
    console.log(e.target.value, e.target.name);
    const name = e.target.name;
    const value = e.target.value;

    setAddress({ ...address, name: value });
  };

  // const tranSuccess = async (payment) => {
  //   const { address } = payment;

  //   await axios.post(
  //     "/api/payment",
  //     { cart, address },
  //     {
  //       headers: { Authorization: token },
  //     }
  //   );

  //   setCart([]);
  //   addToCart([]);
  //   alert("You have successfully placed an order.");
  // };

  const Cash_on_Delivery = async (address) => {
    setAddress(address)
    const res = await axios.post(
      "/api/payment",
      { cart, address, total },
      {
        headers: { Authorization: token },
      }
    );

    setCart([]);
    addToCart([]);
    message.success("Order Success !!");
    history.push(`/order/${res.data._id}`);
  };

  if (cart.length === 0)
    return (
      <div className="checkout-wrap">
        <Breadcrumb className="Breadcrumb">
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Check out</Breadcrumb.Item>
        </Breadcrumb>
        <div className="cart-empty">
          <Result
            icon={
              <img
                className="cart-empty-image"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSnLrK6ZKKqBnuCbsSveh5j2UKv3enaV74MQ&usqp=CAU"
                alt="img"
              />
            }
            title={<i>Your shopping cart is empty. Discover more products !</i>}
            extra={
              <Link to="/shop">
                <Button type="primary">Continue shopping</Button>
              </Link>
            }
          />
        </div>
      </div>
    );

  return (
    <div className="checkout-wrap">
      <Breadcrumb className="Breadcrumb">
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Check out</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={20}>
        <Col span={16}>
          <Table
            rowKey="_id"
            columns={columns}
            dataSource={cart}
            pagination={false}
            bordered={true}
          />
        </Col>
        <Col span={8}>
          <div className="total">
            <div className="total-title">
              <h2>CART TOTALS</h2>
            </div>
            <Row className="row-total">
              <Col span={8}>Total:</Col>
              <Col span={16} style={{ color: "red" }}>
                $ {total}
              </Col>
            </Row>

            <p>Shipping</p>

            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={Cash_on_Delivery}
              autoComplete="off"
              colon={false}
              // labelAlign="left"
            >
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: "Please input your phone!" },
                ]}
              >
                <Input placehoder="input your phone" value={address.phone}/>
              </Form.Item>

              <Form.Item
                label="Address"
                name="addressName"
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}
              >
                <Input placehoder="input your address" value={address.addressName}/>
              </Form.Item>

              <Form.Item
                label="City"
                name="city"
                rules={[
                  { required: true, message: "Please input your city!" },
                ]}
              >
                <Input size="small" placehoder="input your city" value={address.city}/>
              </Form.Item>

              <div className="diot-checkout"></div>

              <Form.Item wrapperCol={{ span: 24 }}>
                <Button type="primary" htmlType="submit" block>
                  Submit
                </Button>
              </Form.Item>
            </Form>

            {/* <PaypalButton total={total} tranSuccess={tranSuccess} /> */}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Cart;
