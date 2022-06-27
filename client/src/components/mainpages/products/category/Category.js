import React, { useContext, useEffect } from "react";
import { GlobalState } from "../../../../GlobalState";
import "./Category.css";
import axios from "axios";
import ProductItem from "../../utils/productItem/ProductItem";
import Loading from "../../utils/loading/Loading";
import LoadMore from "../LoadMore";
import FiltersCategory from "../FiltersCategory";
import { Breadcrumb } from "antd";
import { Link, useParams } from "react-router-dom";
import { Row, Col } from "antd";
import { Result, Button } from "antd";
import Header from "../../../headers/Header";
import Footer from "../../../footers/Footer";

export default function Category() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [category, setCategory] = state.productsAPI.category;
  const [products] = state.productsAPI.products;
  console.log("products", products, products.length);
  console.log("category", category);

  useEffect(() => {
    const getProductList = async (id) => {
      const res = await axios.get(`/api/category/${id}`);
      setCategory("category=" + res.data._id);
    };
    getProductList(params.id);
  }, [params.id, setCategory]);

  return (
    <div>
      <Header />
      <div>
        <div className="category-title">
          <h1>
            <span style={{ color: "rgb(180, 178, 51)" }}>{params.id}</span>{" "}
            Store
          </h1>
        </div>

        <div className="checkout-wrap">
          <Breadcrumb className="Breadcrumb">
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/shop">Shop</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{params.id}</Breadcrumb.Item>
          </Breadcrumb>

          {products && products.length > 0 ? (
            <div>
              <Row style={{ marginBottom: 40 }}>
                <Col span={12}></Col>
                <Col span={12}>
                  <FiltersCategory />
                </Col>
              </Row>

              <Row gutter={24}>
                {products.map((product) => {
                  return (
                    <Col key={product._id} className="column_product" span={6}>
                      <ProductItem key={product._id} product={product} />
                    </Col>
                  );
                })}
              </Row>

              <LoadMore />
              {products.length === 0 && <Loading />}
            </div>
          ) : (
            <Result
              icon={
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCoG7CLzw7zyi3hzzeT9VlhZXp8f1rUYSDpw&usqp=CAU"
                  alt="img"
                />
              }
              title={
                <i>This product is coming soon. Discover more products !</i>
              }
              extra={
                <Link to="/shop">
                  <Button type="primary">Continue shopping</Button>
                </Link>
              }
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
