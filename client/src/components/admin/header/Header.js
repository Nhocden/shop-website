import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import "./Header.css";
import axios from "axios";
import { Link } from "react-router-dom"
import { Menu, Dropdown } from "antd";
import { Avatar } from "antd";


export default function Header() {
  const state = useContext(GlobalState);
  const [userInfo] = state.userAPI.userInfo;
  const menuAccount = (
    <Menu>
      <Menu.Item>
        <Link to="/">go to main page</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header-admin">
      <Link to="/"><h1 style={{ color: "white" }}> Admin</h1></Link>
      <Dropdown overlay={menuAccount}>
        <span className="account">
          <Avatar src={userInfo.avatar} size={25} />
          <span style={{ marginLeft: 10 }}>{userInfo.name}</span>
        </span>
      </Dropdown>
    </div>
  );
}
