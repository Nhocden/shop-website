import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import FiltersCategory from "./FiltersCategory";
import { Row, Col } from "antd";

function Filters() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;

  const [category, setCategory] = state.productsAPI.category;
  const [search, setSearch] = state.productsAPI.search;

  const handleCategory = (e) => {
    console.log("e.target.value",e.target.value)
    setCategory(e.target.value);
    setSearch("");
  };

  return (
    <Row style={{marginBottom:30}}>
      <Col span={12}>
        <div className="filter_menu">
          <div className="row">
            <span>Filters: </span>
            <select name="category" value={category} onChange={handleCategory}>
              <option value="">All Products</option>
              {categories.map((category) => (
                <option value={"category=" + category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Col>
      <Col span={12}>
        <FiltersCategory />
      </Col>
    </Row>
  );
}

export default Filters;
