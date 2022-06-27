import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../../GlobalState";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Table, Button } from "antd";
import { Popconfirm, message } from "antd";
import { Breadcrumb } from "antd";

export default function Home() {
  const state = useContext(GlobalState);
  const [allProducts, setAllProducts] = useState([]);
  const [token] = state.token;
  const history = useHistory();

  useEffect(() =>{
    const getAllProducts = async () => {
        const res_all = await axios.get(`/api/allproducts`)
        setAllProducts(res_all.data)
    }
    getAllProducts()
  },[])

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
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
      align: "left",
      render: (title, record) => <div>{title}</div>,
    },
    {
      title: "image",
      dataIndex: "image",
      align: "left",
      render: (images, record) => (
        <div>
          <Link to={`/admin/edit_product/${record._id}`}>
            <img
              src={record.images.url}
              alt="img"
              className="image-all-products"
            />
          </Link>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      align: "left",
      render: (price) => <div> {price} <span style={{textTransform:"lowercase"}}>đ</span></div>,
    },
    {
      title: "Quantity",
      dataIndex: "quantityOfProduct",
      align: "left",
    },
    {
      title: "Update Time",
      dataIndex: "updatedAt",
      align: "left",
      render: (updatedAt, record) => (
        <div>{new Date(record.updatedAt).toLocaleDateString()}</div>
      ),
    },
    {
      title: "Action",
      // key: "action",
      align: "left",
      width: "200px",
      render: (text, record) => (
        <div>
          <Link to={`/admin/edit_product/${record._id}`} style={{ marginRight: "10px" }}>
            <Button type="primary">Edit</Button>
          </Link>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => confirm(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const confirm = async (id) => {
    const product = allProducts.filter((product) => product._id === id);
    console.log("products",allProducts)
    allProducts.pop(product);
    console.log("===>products",allProducts)
    setAllProducts(allProducts);
    try {
      const res = await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token },
      });
      setAllProducts(allProducts);
      message.success(res.data.msg);
      history.push(`/admin/products`);
    } catch (err) {
      message.error(err.response.data.msg);
    }
  };

  return (
    <div>
      <div className="breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/admin">Home</a>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="create_product" style={{padding:"0px 40px"}}>
        <Table
          rowKey="_Id"
          columns={columns}
          dataSource={allProducts}
          pagination={true}
          bordered={true}
        />
      </div>
    </div>
  );
}

