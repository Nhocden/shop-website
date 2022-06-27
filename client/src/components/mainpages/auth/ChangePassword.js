import React, { useState, useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import { useHistory } from "react-router";
import { isLength, isMatch } from "../utils/validation/Validation";
import { message } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../../headers/Header";
import Footer from "../../footers/Footer";

const initialState = {
  oldPassword: "",
  newPassword: "",
  cf_password: "",
};

export default function ChangePassword() {
  const history = useHistory();
  const [data, setData] = useState(initialState);
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [userInfo] = state.userAPI.userInfo;
  const { newPassword, oldPassword, cf_password } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const updatePassword = async () => {
    console.log("data", data);

    if (isLength(newPassword) || isLength(oldPassword))
      return message.error("Password must be at least 6 characters.");

    if (!isMatch(newPassword, cf_password))
      return message.error("Password did not match.");

    try {
      const res = await axios.post(
        "/user/change_password",
        { newPassword, oldPassword },
        {
          headers: { Authorization: token },
        }
      );

      message.success(res.data.msg);
      history.push("/profile");
    } catch (err) {
      message.error(err.response.data.msg);
    }
  };

  return (
    <div>
      <Header />
      <div className="fg_pass">
        <h2>Change Your Password</h2>

        <div className="row">
          <label htmlFor="password">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            id="oldPassword"
            value={oldPassword}
            onChange={handleChangeInput}
          />

          <label htmlFor="password">New Password</label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={newPassword}
            onChange={handleChangeInput}
          />

          <label htmlFor="cf_password">Confirm Password</label>
          <input
            type="password"
            name="cf_password"
            id="cf_password"
            value={cf_password}
            onChange={handleChangeInput}
          />
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <button onClick={updatePassword}>Change Password</button>
            <span style={{ float: "right", top: 30 }}>
              <Link to="/forgot_password">Forgot password</Link>
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
