import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Breadcrumb } from "antd";
import {
  isEmpty,
  isEmail,
  isLength,
  isMatch,
} from "../../../mainpages/utils/validation/Validation";
import { message } from "antd";

const initialState = {
  name: "",
  email: "",
  password: "",
  cf_password: "",
};

function NewUser() {
  const history = useHistory();
  const [user, setUser] = useState(initialState);
  const { name, email, password, cf_password } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(name) || isEmpty(password))
      return message.error("Please fill in all fields.");

    if (!isEmail(email)) return message.error("Invalid emails.");

    if (isLength(password))
      return message.error("Password must be at least 6 characters.");

    if (!isMatch(password, cf_password))
      return message.error("Password did not match.");

    try {
      const res = await axios.post("/user/register", { name, email, password });

      message.success(`Successfully created an account and sent information to email ${email}`);

      localStorage.setItem("firstLogin", true);

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
          <Breadcrumb.Item>
            <a href="/admin/users">Users</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Create User</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="login_page" style={{border:"none"}}>
        <h2 style={{textAlign:"center"}}>Create User</h2>

        <form onSubmit={registerSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              id="name"
              value={name}
              name="name"
              onChange={handleChangeInput}
            />
          </div>

          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              placeholder="Enter email address"
              id="email"
              value={email}
              name="email"
              onChange={handleChangeInput}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              id="password"
              value={password}
              name="password"
              onChange={handleChangeInput}
            />
          </div>

          <div>
            <label htmlFor="cf_password">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              id="cf_password"
              value={cf_password}
              name="cf_password"
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <button type="submit" style={{margin:"auto", marginTop:20}}>Create User</button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default NewUser;

