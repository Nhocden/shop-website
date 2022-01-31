import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import HeaderAdmin from "./header/Header";
import SiderAdmin from "./sider/Sider";

import Home from "./page/home/Home";
import NewCategory from "./page/categories/NewCategory"
import AllCategories from "./page/categories/AllCategories"
import NewProduct from "./page/products/NewProduct"
import AllProducts from "./page/products/AllProducts"
import NewUser from "./page/users/NewUser"
import AllUsers from "./page/users/AllUsers"
import NewOrder from "./page/orders/NewOrder"
import AllOrders from "./page/orders/AllOrders"

import { Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;

export default function PageAdmin() {
  return (
    <div>
      <Layout>
        <Header>
          <HeaderAdmin />
        </Header>
        <Layout>
          <Sider><SiderAdmin /></Sider>
          <Content>
            <div style={{padding:"30px 40px",border:"1px solid red"}}>
            <Switch>
              <Route path="/admin" exact component={Home} />
              <Route path="/admin/create_category" exact component={NewCategory} />
              <Route path="/admin/categories" exact component={AllCategories} />
              <Route path="/admin/create_product" exact component={NewProduct} />
              <Route path="/admin/products" exact component={AllProducts} />
              <Route path="/admin/create_user" exact component={NewUser} />
              <Route path="/admin/users" exact component={AllUsers} />
              <Route path="/admin/create_order" exact component={NewOrder} />
              <Route path="/admin/orders" exact component={AllOrders} />
            </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
