import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";
import Loading from "../utils/loading/Loading";
import { Link } from "react-router-dom";
import axios from "axios";
import Filters from "./Filters";
import LoadMore from "./LoadMore";
import { Row, Col } from "antd";
import { Breadcrumb } from "antd";
import Header from "../../headers/Header";
import Footer from "../../footers/Footer";

function Products() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [category, setCategory] = state.productsAPI.category;
  const [search, setSearch] = state.productsAPI.search;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCategory("");
    setSearch("");
  }, []);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
      const destroyImg = axios.post(
        "/api/destroy",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteProduct = axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token },
      });

      await destroyImg;
      await deleteProduct;
      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <div>
      <Header />
      <div className="checkout-wrap">
        <Breadcrumb className="Breadcrumb">
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Shop</Breadcrumb.Item>
        </Breadcrumb>

        <Filters />

        <Row gutter={24}>
          {products.map((product) => {
            return (
              <Col className="column_product" span={6} key={product._id}>
                <ProductItem
                  key={product._id}
                  product={product}
                  isAdmin={isAdmin}
                  deleteProduct={deleteProduct}
                  handleCheck={handleCheck}
                />
              </Col>
            );
          })}
        </Row>

        <LoadMore />
        {products.length === 0 && <Loading />}
      </div>
      <Footer />
    </div>
  );
}

export default Products;
