import React, { useContext } from "react";
import { GlobalState } from "../../../../GlobalState";
import "./Collections.css";
import { Tabs } from "antd";
import { Carousel } from "@trendyol-js/react-carousel";
import ProductItem from "../../utils/productItem/ProductItem";
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

const { TabPane } = Tabs;

export default function Collections() {
  const state = useContext(GlobalState);
  const [allProducts] = state.productsAPI.allProducts;
  const [categories] = state.categoriesAPI.categories;
  const [isAdmin] = state.userAPI.isAdmin;
  

  const deleteProduct = () => {
    console.log("delete");
  };

  const handleCheck = () => {
    console.log("handle");
  };

  const ListProducts = (categories) => {
    const products = allProducts.filter(
      (product) => product.category === categories
    );
    return (
      <div>
        <Carousel
          rightArrow={<button className="button-collection -right"><RightOutlined /></button>}
          leftArrow={<button className="button-collection -left"><LeftOutlined /></button>}
          show={4}
          slide={1}
          swiping={true}
          responsive={true}
        >
          {products.map((product) => (
            <div key={product._id} style={{marginRight:20}}>
              <ProductItem
                key={product._id}
                product={product}
                isAdmin={isAdmin}
                deleteProduct={deleteProduct}
                handleCheck={handleCheck}
              />
            </div>
          ))}
        </Carousel>
      </div>
    );
  };

  return (
    <div className="collections-wrap">
      <h1>our shop</h1>
      <Tabs centered className="tab-common">
        {categories &&
          categories.map((categories) => {
            return (
              <TabPane
                defaultActiveKey={categories._id}
                tab={categories.name}
                key={categories._id}
                className="tabpane-title"
              >
                {ListProducts(categories._id)}
              </TabPane>
            );
          })}
      </Tabs>
    </div>
  );
}
