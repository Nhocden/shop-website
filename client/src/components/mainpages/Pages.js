import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './home/Home'
import AboutShop from './aboutShop/AboutShop'
import Products from './products/Products'
import DetailProduct from './products/detailProduct/DetailProduct'
import Category from './products/category/Category'
import Login from './auth/Login'
import Register from './auth/Register'
import Profile from './profile/Profile'
import UserOrderHistory from './history/UserOrderHistory'
import AdminOrderHistory from './admin/history/AdminOrderHistory'
import UserOrderDetails from './history/UserOrderDetails'
import AdminOrderDetails from './admin/history/AdminOrderDetails'
import Checkout from './checkout/Checkout'
import NotFound from './utils/not_found/NotFound'
import Categories from './categories/Categories'
import CreateProduct from './createProduct/CreateProduct'

import {GlobalState} from '../../GlobalState'


function Pages() {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin

    return (
        <div >
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={AboutShop} />
            <Route path="/shop" exact component={Products} />
            <Route path="/shop/category/:id" exact component={Category} />
            <Route path="/detail/:id" exact component={DetailProduct} />

            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/profile" exact component={Profile} />

            <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
            <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />

            <Route path="/order" exact component={isAdmin ? AdminOrderHistory : UserOrderHistory} />
            <Route path="/order/:id" exact component={isAdmin ? AdminOrderDetails : UserOrderDetails} />

            <Route path="/checkout" exact component={Checkout} />


            <Route path="*" exact component={NotFound} />
        </Switch>
        </div>
    )
}

export default Pages
