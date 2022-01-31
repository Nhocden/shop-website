import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";
import { Breadcrumb } from "antd";
import { Table } from "antd";
import { Button } from "antd";
import Header from "../../headers/Header";
import Footer from "../../footers/Footer";

function UserOrderHistory() {
  const state = useContext(GlobalState);
  const [history, setHistory] = useState([]);
  // const [history, setHistory] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      // key: "_id",
      align: "left",
      render: (images, record) => (
        <div>
          <Link to={`/order/${record._id}`}>{record._id}</Link>
        </div>
      ),
    },
    {
      title: "Date of Purchased",
      dataIndex: "createdAt",
      // key: "createdAt",
      align: "left",
      render: (createdAt, record) => (
        <div>{new Date(record.createdAt).toLocaleDateString()}</div>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      // key: "total",
      align: "left",
      render: (createdAt, record) => <div>{record.total}</div>,
    },
    {
      title: "Action",
      // key: "action",
      align: "left",
      render: (text, record) => (
        <div>
          <Link to={`/order/${record._id}`} style={{ marginRight: "20px" }}>
            <Button type="primary">View</Button>
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get("/api/payment", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        } else {
          const res = await axios.get("/user/history", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        }
      };
      getHistory();
    }
  }, [token, isAdmin, setHistory]);

  console.log("history", history);

  return (
    <div>
      <Header />
      <div className="checkout-wrap">
        <Breadcrumb className="Breadcrumb">
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Orders</Breadcrumb.Item>
        </Breadcrumb>

        {history.length !== 0 ? (
          <div>
            <h4 style={{ marginBottom: 40 }}>
              You have {history.length} ordered
            </h4>

            <Table
              rowKey="_Id"
              columns={columns}
              dataSource={history}
              pagination={false}
              bordered={true}
            />
          </div>
        ) : (
          <div className="mess-no-order">
            <p>You don't have any orders !</p>
            <Link to="/shop">
              <Button type="primary">Continue shopping</Button>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default UserOrderHistory;
