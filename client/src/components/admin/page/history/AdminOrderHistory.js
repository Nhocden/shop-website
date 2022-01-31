import React, { useContext, useEffect } from "react";
import { GlobalState } from "../../../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";
import { Breadcrumb } from "antd";
import { Table } from "antd";
import { Button } from "antd";


function AdminOrderHistory() {
  const state = useContext(GlobalState);
  const [history, setHistory] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      align: "left",
      render: (images, record) => (
        <div>
          <Link to={`/order/${record._id}`}>{record._id}</Link>
        </div>
      ),
    },
    {
      title: "User",
      dataIndex: "name",
      key: "name",
      align: "left",
      render: (images, record) => <div>{record.name}</div>,
    },
    {
      title: "Gmail",
      dataIndex: "email",
      key: "email",
      align: "left",
      render: (images, record) => (
        <div>
          <Link to="/profile">{record.email}</Link>
        </div>
      ),
    },
    {
      title: "Date of Purchased",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "left",
      render: (createdAt, record) => (
        <div>{new Date(record.createdAt).toLocaleDateString()}</div>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      align: "left",
      render: (createdAt, record) => <div>{record.total}</div>,
    },
    {
      title: "Action",
      key: "action",
      align: "left",
      render: (text, record) => (
        <div>
          <Link to={`/order/${record._id}`} style={{marginRight:"20px"}}>
            <Button type="primary">View</Button>
          </Link>
          <Link to={`/order/${record._id}`}>
            <Button type="primary" danger>
              Delete
            </Button>
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
    <div className="checkout-wrap">
      <Breadcrumb className="Breadcrumb">
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Check out</Breadcrumb.Item>
      </Breadcrumb>

      <h4>You have {history.length} ordered</h4>

      {/* <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Date of Purchased</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {history.map((items) => (
            <tr key={items._id}>
              <td>{items.paymentID}</td>
              <td>{new Date(items.createdAt).toLocaleDateString()}</td>
              <td>
                <Link to={`/order/${items._id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <Table
        columns={columns}
        dataSource={history}
        pagination={false}
        bordered={true}
      />
    </div>
  );
}

export default AdminOrderHistory;
