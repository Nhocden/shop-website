import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../../GlobalState";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Table, Button } from "antd";
import { Popconfirm, message } from "antd";
import { Breadcrumb } from "antd";

export default function AllUsers() {
  const state = useContext(GlobalState);
  const [allUsers, setAllUsers] = useState([]);
  const [token] = state.token;
  const history = useHistory();

  useEffect(() =>{
    const getallUsers = async () => {
        const res_all = await axios.get(`/user/getAllUsers`)
        console.log("res_all",res_all.data)
        setAllUsers(res_all.data)
    }
    getallUsers()
  },[])

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      align: "left",
      render: (images, record) => (
        <div>
          <Link to={`/admin/edit_user/${record._id}`}>{record._id}</Link>
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      align: "left",
      render: (name, record) => <div>{name}</div>,
    },
    {
      title: "avatar",
      dataIndex: "avatar",
      align: "left",
      render: (avatar, record) => (
        <div>
          <Link to={`/admin/edit_user/${record._id}`}>
            <img
              src={record.avatar}
              alt="img"
              className="image-all-products"
            />
          </Link>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "left",
      render: (email) => <div> {email}</div>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      align: "left",
      render: (phone) => <div> {phone}</div>,
    },
    {
      title: "Gender",
      dataIndex: "gender",
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
          <Link to={`/admin/edit_user/${record._id}`} style={{ marginRight: "10px" }}>
            <Button type="primary">Edit</Button>
          </Link>
          <Popconfirm
            title="Are you sure to delete this User?"
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
    try {
      const res = await axios.delete(`/user/detailUser/${id}`);
      if(res){
        const user = allUsers.filter((user) => user._id === res.data._id);
        console.log("users",allUsers)
        allUsers.pop(user);
        console.log("===>users",allUsers)
        setAllUsers(allUsers);
        message.success("Delete a User success!");
        history.push(`/admin/users`);
      }
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
          <Breadcrumb.Item>All Users</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="create_product" style={{padding:"0px 40px"}}>
        <Table
          rowKey="_Id"
          columns={columns}
          dataSource={allUsers}
          pagination={true}
          bordered={true}
        />
      </div>
    </div>
  );
}

