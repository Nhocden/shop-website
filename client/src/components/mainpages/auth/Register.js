import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  isEmpty,
  isEmail,
  isLength,
  isMatch,
} from "../utils/validation/Validation";
import { message } from "antd";
import Header from "../../headers/Header";
import Footer from "../../footers/Footer";

const initialState = {
  name: "",
  email: "",
  password: "",
  cf_password: "",
};

function Register() {
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

      message.success(res.data.msg);

      localStorage.setItem("firstLogin", true);

      history.push("/");
    } catch (err) {
      message.error(err.response.data.msg);
    }
  };

  return (
    <div>
      <Header />
      <div className="login_page">
        <h2>Register</h2>

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
            <button type="submit">Register</button>
          </div>
        </form>

        <p>
          Already an account? <Link to="/login">Login</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
