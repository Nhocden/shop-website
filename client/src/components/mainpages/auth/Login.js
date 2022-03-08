import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import Header from "../../headers/Header";
import Footer from "../../footers/Footer";

function Login() {
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    console.log("uesr", user);
    if (!user.email || !user.password)
      return message.error("You have not entered all the fields.")
    try {
      const res = await axios.post("/user/login", { ...user });

      localStorage.setItem("firstLogin", true);
      message.success(res.data.msg);
      window.location.href = "/";
    } catch (err) {
      message.error(err.response.data.msg);
    }
  };

  const responseGoogle = async (response) => {
    try {
      console.log("response.tokenId", response.tokenId);
      const res = await axios.post("/user/google_login", {
        tokenId: response.tokenId,
      });

      setUser({ ...user, error: "", success: res.data.msg });

      console.log("res", res);
      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  const responseFacebook = async (response) => {
    try {
      const { accessToken, userID } = response;
      const res = await axios.post("/user/facebook_login", {
        accessToken,
        userID,
      });

      setUser({ ...user, error: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div>
      <Header />
      <div className="login_page">
        <h2>Login</h2>
        <form onSubmit={loginSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              placeholder="Enter email address"
              id="email"
              value={user.email}
              name="email"
              onChange={onChangeInput}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              id="password"
              value={user.password}
              name="password"
              onChange={onChangeInput}
            />
          </div>

          <div className="row">
            <button type="submit">Login</button>
            <Link to="/forgot_password">Forgot your password?</Link>
          </div>
        </form>

        <div className="hr">Or Login With</div>

        <div className="social">
          <GoogleLogin
            clientId="158731381309-68h8igf5uf7tba290u2up5q1kbi68o0g.apps.googleusercontent.com"
            buttonText="Login with google"
            onSuccess={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          <FacebookLogin
            appId="5277098125638184"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
          />
        </div>

        <p>
          New Customer? <Link to="/register">Register</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
