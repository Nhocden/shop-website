import React, { useContext } from "react";
import { Link } from "react-router-dom"
// import BtnRender from "./BtnRender";
import { Rate } from "antd";
import { Button } from 'antd';
import {GlobalState} from '../../../../GlobalState'


function ProductItem({ product }) {
  const state = useContext(GlobalState)
  const addCart = state.userAPI.addCart

  return (
    <div className="product-card">
      <div className="product-card-image">
        <Link to={`/detail/${product._id}`}><img src={product.images.url} alt=""  className="product-image"/></Link>
        <Button  block className="button-add-card" value="large" onClick={() => addCart(product)}>Add to Cart</Button>
      </div>

      <div className="product-card-content">
        <Rate allowHalf defaultValue={product.rate} disabled className="star"/>
        <Link to={`/detail/${product._id}`}><h2 title={product.title} style={{fontSize:16}}>{product.title}</h2></Link>
        <p className="price-product">{product.price} <span>đ</span></p>
        <p>{product.description}</p>
      </div>
    </div>
  );
}

export default ProductItem;
