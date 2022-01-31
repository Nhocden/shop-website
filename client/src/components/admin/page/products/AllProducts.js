import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../../GlobalState";
import {Link} from "react-router-dom"
import { Table, Button } from "antd";

export default function AllProducts() {
  const state = useContext(GlobalState);
  const [allProducts] = state.productsAPI.allProducts;

  useEffect(() => {

  }, [allProducts])

  console.log("allProducts",allProducts)

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      // key: "_id",
      align: "left",
      render: (images, record) => (
        <div>
          <Link to={`/admin/edit_product/${record._id}`}>{record._id}</Link>
        </div>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      // key: "_id",
      align: "left",
      render: (title, record) => (
        <div>
          {title}
        </div>
      ),
    },
    {
      title: "image",
      dataIndex: "image",
      align: "left",
      render: (images, record) => (
        <div>
          <Link to={`/admin/edit_product/${record._id}`}><img src={record.images.url} alt="img" className="image-all-products"/></Link>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      // key: "total",
      align: "left",
      render: (price) => <div>$ {price}</div>,
    },
    {
      title: "Category",
      dataIndex: "category",
      // key: "_id",
      align: "left",
      render: (category) => (
        <div>
          <Link >{category}</Link>
        </div>
      ),
    },
    {
      title: "Update Time",
      dataIndex: "updatedAt",
      // key: "updatedAt",
      align: "left",
      render: (updatedAt, record) => (
        <div>{new Date(record.updatedAt).toLocaleDateString()}</div>
      ),
    },
    {
      title: "Action",
      // key: "action",
      align: "left",
      width:"200px",
      render: (text, record) => (
        <div>
          <Link to={`/order/${record._id}`} style={{ marginRight: "10px" }}>
            <Button type="primary">View</Button>
          </Link>
          <Link to={`/order/${record._id}`}>
            <Button type="primary" danger>Delete</Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        rowKey="_Id"
        columns={columns}
        dataSource={allProducts}
        pagination={false}
        bordered={true}
      />
    </div>
  );
}
