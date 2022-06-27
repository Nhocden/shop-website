import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";
import { Breadcrumb } from "antd";
import { Popconfirm, message } from "antd";
import { Table } from "antd";
import { Button } from "antd";

function Allorders() {
  const state = useContext(GlobalState);
  const [history, setHistory] = useState([]);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      align: "left",
      render: (images, record) => (
        <div>
          <Link to={`/admin/edit_order/${record._id}`}>{record._id}</Link>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "left",
      render: (email, record) => (
        <div>
          <Link to={`/admin/edit_user/${record.user_id}`}>{email}</Link>
        </div>
      ),
    },
    {
      title: "Date of Purchased",
      dataIndex: "createdAt",
      align: "left",
      render: (createdAt, record) => (
        <div>{new Date(record.createdAt).toLocaleDateString()}</div>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      align: "left",
      render: (createdAt, record) => (
        <div>
          {record.total}
          <span style={{ textTransform: "lowercase" }}> đ</span>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "left",
      render: (status, record) => (
        <div>
         { status == 0 ? <span>Ordered</span> : null }
         { status == 1 ? <span>Packed</span> : null }
         { status == 2 ? <span>Delivered</span> : null }
         { status == 3 ? <span>Finished</span> : null }
        </div>
      ),
    },
    {
      title: "Action",
      align: "left",
      render: (text, record) => (
        <div>
          <Link to={`/admin/edit_order/${record._id}`} style={{ marginRight: "20px" }}>
            <Button type="primary">Edit</Button>
          </Link>
          <Popconfirm
            title="Are you sure to delete this order?"
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

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        const res = await axios.get("/api/payment", {
          headers: { Authorization: token },
        });
        console.log("res.data", res.data);
        setHistory(res.data);
      };
      getHistory();
    }
  }, [token, isAdmin, setHistory]);

  const confirm = async (id) => {
    try {
      console.log("id",id)
      const order = history.filter((order) => order._id !== id);
      console.log("===>users",order)
      const res = await axios.delete(`/api/detailPayment/${id}`);
      setHistory(order)
      message.success(res.data.msg);
      history.push(`/admin/orders`);
    } catch (err) {
      message.error(err.response.data.msg);
    }
  };

  return (
    <div>
      {/* <div className="checkout-wrap"> */}
      <Breadcrumb className="Breadcrumb">
        <Breadcrumb.Item>
          <Link to="/admin">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Orders</Breadcrumb.Item>
      </Breadcrumb>

      {history.length !== 0 ? (
        <div>
          <h4 style={{ marginBottom: 40 }}>
            You have {history.length} ordered
          </h4>
          <div  style={{ padding: "0px 40px" }}>
            <Table
              rowKey="_Id"
              columns={columns}
              dataSource={history}
              pagination={false}
              bordered={true}
            />
          </div>
        </div>
      ) : (
        <div className="mess-no-order">
          <p>You don't have any orders !</p>
        </div>
      )}
      {/* </div> */}
    </div>
  );
}

export default Allorders;
