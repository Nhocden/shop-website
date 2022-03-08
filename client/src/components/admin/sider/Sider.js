import React from "react";
import { Menu, Button } from "antd";
import {
  PieChartOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  GoldOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

export default function Sider() {
  return (
    <div>
      <Menu
        defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
      >
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to="/admin">Revenue</Link>
        </Menu.Item>
        <Menu.Item key="sub1" icon={<GoldOutlined />}>
          <Link to="/admin/categories">Category</Link>
        </Menu.Item>
        <SubMenu key="sub2" icon={<FileTextOutlined />} title="Product">
          <Menu.Item key="4">
            <Link to="/admin/create_product">New Product</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/admin/products">All Products</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" icon={<UserOutlined />} title="User">
          <Menu.Item key="6">
            <Link to="/admin/create_user">New User</Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to="/admin/users">All Users</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" icon={<ShoppingCartOutlined />} title="Order">
          {/* <Menu.Item key="8">
            <Link to="/admin/create_order">New Order</Link>
          </Menu.Item> */}
          <Menu.Item key="9">
            <Link to="/admin/orders">All Orders</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
}
