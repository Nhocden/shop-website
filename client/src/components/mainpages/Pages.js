import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Header from "./../headers/Header";
import Footer from "./../footers/Footer";
import PageAdmin from "../admin/PageAdmin";

import Home from "./home/Home";
import AboutShop from "./aboutShop/AboutShop";
import Products from "./products/Products";
import DetailProduct from "./products/detailProduct/DetailProduct";
import Category from "./products/category/Category";
import Login from "./auth/Login";
import ChangePassword from "./auth/ChangePassword";
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import ActivationEmail from "./auth/ActivationEmail";
import Profile from "./profile/Profile";
import UserOrderHistory from "./history/UserOrderHistory";
import UserOrderDetails from "./history/UserOrderDetails";
import Checkout from "./checkout/Checkout";
import NotFound from "./utils/not_found/NotFound";

import { GlobalState } from "../../GlobalState";

function Pages() {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const [isLogged] = state.userAPI.isLogged;

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={AboutShop} />
          <Route path="/shop" exact component={Products} />
          <Route path="/shop/category/:id" exact component={Category} />
          <Route path="/detail/:id" exact component={DetailProduct} />

          <Route path="/login" exact component={Login} />
          <Route path="/change-password" exact component={ChangePassword} />
          <Route path="/register" exact component={Register} />
          <Route path="/forgot_password" component={ForgotPassword} exact />
          <Route path="/user/reset/:token" component={ResetPassword} exact />
          <Route
            path="/user/activate/:activation_token"
            component={ActivationEmail}
            exact
          />
          <Route path="/profile" exact component={Profile} />
          <Route path="/order" exact component={UserOrderHistory} />
          <Route path="/order/:id" exact component={UserOrderDetails} />
          <Route path="/checkout" exact component={Checkout} />
          {/* <Route path="*" exact component={NotFound} /> */}

          <PageAdmin />
        </Switch>
      </Router>
    </div>
  );
}

export default Pages;
