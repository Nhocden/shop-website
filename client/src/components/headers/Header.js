import React, { useContext, useEffect } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";
import Cart from "./Cart";
// import WishList from "./WishList";
import {
  FacebookFilled,
  InstagramFilled,
  TwitterCircleFilled,
  GlobalOutlined,
  PhoneOutlined,
  DownOutlined,
  SearchOutlined,
  UserOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import { Menu, Dropdown } from "antd";
import { ReactComponent as Logo } from "../../Images/logo1.svg";
import { AutoComplete } from "antd";
const { Option } = AutoComplete;

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [userInfo] = state.userAPI.userInfo;
  const [search, setSearch] = state.productsAPI.search;
  const [category, setCategory] = state.productsAPI.category;
  const [products] = state.productsAPI.products;

  useEffect(() => {
    setCategory("");
    setSearch("");
  }, []);

  const logoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.removeItem("firstLogin");

    window.location.href = "/";
  };

  const handleSearch = (value) => {
    console.log("value", value);
    setSearch(value.toLowerCase());
  };

  const menuLanguages = (
    <Menu>
      <Menu.Item>
        <a href="/">English</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/">Japanese</a>
      </Menu.Item>
    </Menu>
  );

  const menuAccount = (
    <Menu>
      <Menu.Item>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/order">Orders</Link>
      </Menu.Item>
      {isAdmin ? <Menu.Item>
        <Link to="/admin">product management</Link>
      </Menu.Item>:null}
      <Menu.Item>
        <Link to="/" onClick={logoutUser}>
          Logout
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="header-top">
        <div className="header-left">
          <div className="phone">
            <a href="tel:#">
              <PhoneOutlined />: call 0838117705 | 
            </a>
          </div>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/emoeror.kushcash"
              className="social-icon"
              rel="noreferrer"
            >
              <FacebookFilled />
            </a>
            <a
              href="https://twitter.com/_iankuria?lang=en"
              className="social-icon"
              rel="noreferrer"
            >
              <TwitterCircleFilled />
            </a>
            <a
              href="https://www.instagram.com/_iankuria/?hl=en"
              className="social-icon"
              title="Instagram"
            >
              <InstagramFilled />
            </a>
          </div>
        </div>
        <div className="header-right">
          {/* <Dropdown overlay={menuLanguages}>
            <span className="languages">
              <GlobalOutlined /> Languages <DownOutlined />
            </span>
          </Dropdown> */}
          {isLogged ? (
            <Dropdown overlay={menuAccount}>
              <span className="account">
                <Avatar
                  src={userInfo.avatar}
                  size={25}
                />
                <span style={{ marginLeft: 10 }}>{userInfo.name}</span>
              </span>
            </Dropdown>
          ) : (
            <span>
              <Link to="/login" className="account">
                {" "}
                Login |
              </Link>
              <Link to="/register" className="account">
                {" "}
                Resgister
              </Link>
            </span>
          )}
        </div>
      </div>
      <header className="header">
        <div className="header-middle">
          <div className="search">
            <SearchOutlined style={{ fontSize: 25 }} />
            <AutoComplete
              onSearch={handleSearch}
              placeholder="Search product..."
              dropdownMatchSelectWidth={false}
              value={search}
              notFoundContent="No results were found !"
              bordered={false}
            >
              {search &&
                products.map((product) => (
                  <Option key={product._id}>
                    <div  style={{ padding:"0px 10px" }}>
                      <Link to={`/detail/${product._id}`}>
                        <img
                          src={product.images.url}
                          alt=""
                          className="cart-item-img"
                          style={{ width: 60, height: 60 }}
                        />
                        <span style={{color:"black",marginLeft:10}}>{product.title}</span>
                      </Link>
                    </div>
                  </Option>
                ))}
            </AutoComplete>
          </div>
          <div>
            <Link to="/" className="logo">
              <Logo />
            </Link>
          </div>
          <div className="cart-icons">
            {/* <WishList /> */}
            <div style={{ width: 100 }}></div>
            <Cart />
          </div>
        </div>
        <div className="header-bottom">
          <div className="menu-header">
            <ul className="menu-header-ul">
              <li className="menu-header-item">
                <Link to="/">HOME</Link>
              </li>
              <li className="menu-header-item">
                <Link to="/shop">SHOP</Link>
              </li>
              <li className="menu-header-item">
                <Link to="/about">ABOUT</Link>
              </li>
            </ul>
          </div>
          <div className="howdy">
            <SmileOutlined
              className="header-smile-icon"
              style={{ marginRight: 10, fontSize: 20 }}
            />{" "}
            HOWDY, {`${userInfo.name}`.toUpperCase()} !
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
