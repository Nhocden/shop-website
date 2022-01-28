import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
// import PaypalButton from "./PaypalButton";
import { Row, Col } from "antd";
import { Table} from "antd";
import { Button } from "antd";
import { Input } from "antd";
import { Breadcrumb } from "antd";
import { message} from 'antd';
import { useHistory } from 'react-router-dom';

function Cart() {
  const history = useHistory();
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);
  const [city, setCity] = useState("");
  const [addressName, setAddressName] = useState("");

  const columns = [
    {
      title: "PRODUCT",
      dataIndex: "images",
      key: "images",
      align: "left",
      render: (images, record) => (
        <div>
          <Link to={`/detail/${record._id}`}><img src={images.url} alt="" className="checkout-image" /> <span style={{marginLeft:20}}>{record.title}</span></Link> 
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
      render: (text, product) => (
        <div>{product.price * product.quantity}</div>
      ),
    },
  ];

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.quantity * item.price;
      }, 0);

      setTotal(total);
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

  const HandleChangeCity = (e) => {
    setCity(e.target.value);
  };

  const HandleChangeAddressName = (e) => {
    setAddressName(e.target.value);
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

  const Cash_on_Delivery = async () => {
    const address = { addressName: addressName, city: city };
    console.log({ cart, address, total });
    const res = await axios.post(
      "/api/payment",
      { cart, address, total },
      {
        headers: { Authorization: token },
      }
    );

    setCart([]);
    addToCart([]);
    message.success('Order Success !!');
    history.push(`/order/${res.data._id}`);

  };

  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>
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
            <Row className="row-shipping">
              <Col span={8}>Shipping:</Col>
              <Col span={16}>
                <Input
                  placeholder="input city"
                  className="input-address"
                  name="city"
                  onChange={HandleChangeCity}
                  value={city}
                />
                <Input
                  placeholder="input address"
                  className="input-address"
                  name="addressName"
                  value={addressName}
                  onChange={HandleChangeAddressName}
                />
              </Col>
            </Row>
            <Row className="row-total">
              <Col span={8}>Total:</Col>
              <Col span={16} style={{ color: "red" }}>
                $ {total}
              </Col>
            </Row>
            {/* <PaypalButton total={total} tranSuccess={tranSuccess} /> */}
            <Button
              type="primary"
              block
              className="button-order"
              onClick={Cash_on_Delivery}
            >
              Cash on Delivery
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Cart;
