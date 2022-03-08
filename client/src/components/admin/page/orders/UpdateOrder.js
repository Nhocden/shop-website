import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
// import PaypalButton from "./PaypalButton";
import { Row, Col } from "antd";
import { Table } from "antd";
import { Button } from "antd";
import { Breadcrumb } from "antd";
import { message } from "antd";
import { Result } from "antd";
import { Form, Input } from "antd";

function UpdateOrder() {
  const state = useContext(GlobalState);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState({});
  const [userInfo,setUserInfo] = useState({});
  const [token] = state.token;
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();

  const history = useHistory();
  const param = useParams();

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
      render: (price) => <div>{price} <span style={{textTransform:"lowercase"}}>đ</span></div>
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
      width: '200px',
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
    const getOrder = async () => {
      console.log("param.id",param.id)
      const res = await axios.get(`/api/detailPayment/${param.id}`)
      console.log("res", res.data);
      const total = res.data.cart.reduce((prev, item) => {
        return prev + item.quantity * item.price;
      }, 0);

      setTotal(total);
      setCart(res.data.cart)
      setOrder(res.data)
      form.setFieldsValue({
        phone: res.data.address.phone,
        city: res.data.address.city,
        addressName: res.data.address.addressName,
      });
    };

    getOrder();
  }, [param.id]);

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
    order["address"] = address
    const res = await axios.put(
      `/api/detailPayment/${param.id}`,
      {order:order},
    );
    setOrder(res.data)
    // // setCart([]);
    // // addToCart([]);
    console.log("res",res.data)
    message.success("Update a Order success");
    // history.push(`/admin/edit_order/${res.data._id}`);
  };

  return (
    <div>
      <div>
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
                   {total} <span>đ</span>
                </Col>
              </Row>

              <p>Shipping</p>

              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={Cash_on_Delivery}
                autoComplete="off"
                colon={false}
                form={form}
              >
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    { required: true, message: "Please input your phone!" },
                  ]}
                >
                  <Input placehoder="input your phone" />
                </Form.Item>

                <Form.Item
                  label="Address"
                  name="addressName"
                  rules={[
                    { required: true, message: "Please input your address!" },
                  ]}
                >
                  <Input placehoder="input your address" />
                </Form.Item>

                <Form.Item
                  label="City"
                  name="city"
                  rules={[
                    { required: true, message: "Please input your city!" },
                  ]}
                >
                  <Input size="small" placehoder="input your city" />
                </Form.Item>

                <div className="diot-checkout"></div>

                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button type="primary" htmlType="submit" block>
                    Edit Order
                  </Button>
                </Form.Item>
              </Form>

              {/* <PaypalButton total={total} tranSuccess={tranSuccess} /> */}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default UpdateOrder;

