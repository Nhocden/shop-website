import React, { useState } from "react";
import { Link } from "react-router-dom"
import BtnRender from "./BtnRender";
import { Rate } from "antd";
import { HeartFilled, HeartOutlined } from '@ant-design/icons'


function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {

  return (
    <div className="product-card">
      <div className="product-card-image">
        <Link to={`/detail/${product._id}`}><img src={product.images.url} alt=""  className="product-image"/></Link>
        <HeartOutlined className="product-heart product-heart-out"onClick={(e)=>{return <HeartFilled />}}/>
        <HeartFilled className="product-heart product-heart-fill"/>  
      </div>

      <div className="product-card-content">
        <Rate allowHalf defaultValue={product.rate} />
        <Link to={`/detail/${product._id}`}><h2 title={product.title}>{product.title}</h2></Link>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>

      {/* <BtnRender product={product} deleteProduct={deleteProduct} /> */}
    </div>
  );
}

export default ProductItem;
