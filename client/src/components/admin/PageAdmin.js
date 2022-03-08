import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import HeaderAdmin from "./header/Header";
import SiderAdmin from "./sider/Sider";

import Home from "./page/home/Home";
import AllCategories from "./page/categories/AllCategories"
import NewProduct from "./page/products/NewProduct"
import UpdateProduct from "./page/products/UpdateProduct"
import AllProducts from "./page/products/AllProducts"
import NewUser from "./page/users/NewUser"
import UpdateUser from "./page/users/UpdateUser"
import AllUsers from "./page/users/AllUsers"
import NewOrder from "./page/orders/NewOrder"
import AllOrders from "./page/orders/AllOrders"
import UpdateOrder from "./page/orders/UpdateOrder"

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
            <div style={{padding:"30px 40px", minHeight:700}}>
            <Switch>
              <Route path="/admin" exact component={Home} />
              <Route path="/admin/categories" exact component={AllCategories} />
              <Route path="/admin/create_product" exact component={NewProduct} />
              <Route path="/admin/edit_product/:id" exact component={UpdateProduct} />
              <Route path="/admin/products" exact component={AllProducts} />
              <Route path="/admin/create_user" exact component={NewUser} />
              <Route path="/admin/edit_user/:id" exact component={UpdateUser} />
              <Route path="/admin/users" exact component={AllUsers} />
              <Route path="/admin/create_order" exact component={NewOrder} />
              <Route path="/admin/orders" exact component={AllOrders} />
              <Route path="/admin/edit_order/:id" exact component={UpdateOrder} />

              {/* import Categories from './categories/Categories'
              import CreateProduct from './createProduct/CreateProduct' */}

              {/* <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
            <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} /> */}
            </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
