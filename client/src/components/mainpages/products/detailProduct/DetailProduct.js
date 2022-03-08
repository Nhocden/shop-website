import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";
import axios from "axios";
import moment from "moment";
import ProductItem from "../../utils/productItem/ProductItem";
import { Select } from "antd";
import { Row, Col } from "antd";
import { Image } from "antd";
import { Rate, Button } from "antd";
import { Breadcrumb, InputNumber } from "antd";
import { Tabs } from "antd";
import { Input } from "antd";
import { message } from "antd";
import { Carousel } from "@trendyol-js/react-carousel";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Header from "../../../headers/Header";
import Footer from "../../../footers/Footer";

const { TextArea } = Input;

const { TabPane } = Tabs;

const { Option } = Select;

function DetailProduct() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [allProducts] = state.productsAPI.allProducts;
  const [userInfo] = state.userAPI.userInfo;
  const [isLogged] = state.userAPI.isLogged;
  const [token] = state.token;
  const [search, setSearch] = state.productsAPI.search;
  const addCart = state.userAPI.addCart;
  const [detailProduct, setDetailProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");
  const [rate, setRate] = useState(5);
  const [newcomment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [relateProducts, setRelateProducts] = useState([]);

  useEffect(() => {
    if (params.id) {
      console.log("params.id", params.id);
      allProducts.forEach((product) => {
        if (product._id === params.id) {
          setDetailProduct(product);
        }
      });
    }
    if (detailProduct) {
      for (let relate of allProducts) {
        if (relate.category === detailProduct.category) {
          let relateProduct = relateProducts;
          relateProduct.push(relate);
          setRelateProducts(relateProduct);
        }
      }
    }
    setSearch("");
  }, [params.id, allProducts, detailProduct, relateProducts, setSearch]);

  console.log("allProducts", allProducts);
  console.log("detailProduct", detailProduct);
  console.log("relateProducts", relateProducts);

  if (detailProduct.length === 0) return null;
  // if (relateProducts.length === 0) return null;

  function onChangeSize(value) {
    setSize(value);
  }

  function onChangeQuantity(value) {
    setQuantity(value);
  }

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity - 1 < 0) setQuantity(0);
    else setQuantity(quantity - 1);
  };

  const handleChangeRate = (value) => {
    setRate(value);
  };

  const onChangeComment = (e) => {
    setNewComment(e.target.value);
  };

  const submitComment = async () => {
    if (!isLogged) return message.error("Please login to continue comment")

    if (newcomment.length === 0)
      return message.error("you have not commented yet");

    let newcomments = detailProduct.comments;
    var time_comment = moment().format("YYYY/MM/DD HH:mm");
    newcomments.unshift({
      rate: rate,
      comment: newcomment,
      userInfo: userInfo,
      time: time_comment,
    });

    setComments(newcomments);
    console.log("add 12414dsnflk")
    console.log("comments", newcomments);

    const res = await axios.patch(
      `/api/products/comment/${detailProduct._id}`,
      { comments: newcomments },
      {
        headers: { Authorization: token },
      }
    );

    if (res) {
      message.success("Add a comment success");
      setComments(detailProduct.comments);
      setRate(5);
      setNewComment("");
    }
  };


  return (
    <div>
      <Header />
      <div>
        <div className="checkout-wrap">
          <Breadcrumb className="Breadcrumb">
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/shop">Shop</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Product Detail</Breadcrumb.Item>
          </Breadcrumb>
          {detailProduct ? (
            <Row>
              <Col span={12}>
                <Image
                  width={500}
                  src={detailProduct.images.url}
                  className="detail-image-product"
                />
              </Col>
              <Col span={12}>
                <div className="box-detail">
                  <div className="row">
                    <h2>{detailProduct.title.toUpperCase()}</h2>
                  </div>
                  <div>
                    <Rate disabled defaultValue={detailProduct.rate} />
                  </div>
                  <p>
                    {detailProduct.sold}{" "}
                    <span className="span-sold-product">Sold</span>{" "}
                    {detailProduct.comments.length}{" "}
                    <span style={{ color: "rgb(144, 146, 148)" }}>
                      Comments
                    </span>
                  </p>
                  <span>{detailProduct.price} đ</span>
                  <p>{detailProduct.description}</p>

                  <Row style={{ marginBottom: 20 }}>
                    <Col span={5} className="quantity-detail-product">
                      <p>Size</p>
                    </Col>
                    <Col span={19}>
                      <Select defaultValue={size} onChange={onChangeSize}>
                        <Option value="S">S</Option>
                        <Option value="M">M</Option>
                        <Option value="L">L</Option>
                        <Option value="XL">XL</Option>
                      </Select>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={5} className="quantity-detail-product">
                      <p>Quantity</p>
                    </Col>
                    <Col span={19}>
                      <div className="quantity-detail-product">
                        <Button onClick={decrement}>-</Button>
                        <InputNumber
                          min={0}
                          value={quantity}
                          onChange={onChangeQuantity}
                          style={{ width: 50 }}
                          type="number"
                        />
                        <Button onClick={increment}>+</Button>
                      </div>
                    </Col>
                  </Row>

                  <Button
                    type="primary"
                    className="button-detail-product"
                    onClick={() => addCart(detailProduct, quantity, size)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Col>
            </Row>
          ) : null}

          <div className="tabs">
            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="Description" key="1">
                <p>{detailProduct.content}</p>
              </TabPane>
              <TabPane tab="Comments" key="2">
                <div className="tabs-comments">
                  {detailProduct &&
                    detailProduct.comments.map((comment) => (
                      <div className="row-comment" key={detailProduct._id}>
                        <Row>
                          <Col span={3}>
                            <img
                              className="avatar-comment"
                              src={comment.userInfo.avatar}
                              alt="img"
                            />
                          </Col>
                          <Col span={21}>
                            <div>
                              <b className="name-comment">
                                {comment.userInfo.name}
                              </b>
                            </div>
                            <Rate
                              disabled
                              value={comment.rate}
                              className="star"
                            />
                            <p className="time-comment">{comment.time}</p>
                            <p>{comment.comment}</p>
                          </Col>
                        </Row>
                      </div>
                    ))}
                </div>
                <div className="add-comment">
                  <h3>Add a review</h3>
                  <p>
                    Your email address will not be published. Required fields
                    are marked *
                  </p>
                  <div>
                    <div>
                      Your Rating{" "}
                      <span style={{ marginLeft: 20 }}>
                        <Rate
                          onChange={handleChangeRate}
                          value={rate}
                          className="star"
                        />
                      </span>
                    </div>
                    <p>Your review</p>
                    <TextArea
                      rows={4}
                      onChange={onChangeComment}
                      value={newcomment}
                    />
                    <Button
                      type="primary"
                      onClick={submitComment}
                      style={{ marginTop: 30 }}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
        <div className="relate-wrap">
          <h3>Related Products</h3>
        </div>
        <div className="checkout-wrap">
          {/* <Carousel
            rightArrow={
              <button className="button-collection -right">
                <RightOutlined />
              </button>
            }
            leftArrow={
              <button className="button-collection -left">
                <LeftOutlined />
              </button>
            }
            show={4}
            slide={1}
            swiping={true}
            responsive={true}
          > */}
            {/* {relateProducts.map((product) => (
              <div key={product._id} style={{ marginRight: 20 }}>
                <ProductItem key={product._id} product={product} />
              </div>
            ))} */}
          {/* </Carousel> */}
          <Row gutter={24}>
          {relateProducts.map((product) => 
              <Col className="column_product" span={6} key={product._id}>
                <ProductItem
                  key={product._id}
                  product={product}
                />
              </Col>
          )}
        </Row>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DetailProduct;
