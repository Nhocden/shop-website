import React, { useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { isLength, isMatch } from "../utils/validation/Validation";
import { message } from "antd";
import Header from "../../headers/Header";
import Footer from "../../footers/Footer";

const initialState = {
  password: "",
  cf_password: "",
};

function ResetPassword() {
  const history = useHistory();
  const [data, setData] = useState(initialState);
  const { token } = useParams();

  const { password, cf_password } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleResetPass = async () => {
    if (isLength(password))
      return message.warning("Password must be at least 6 characters.");

    if (!isMatch(password, cf_password))
      return message.warning("Password did not match.");

    console.log("password", password);

    try {
      const res = await axios.post(
        "/user/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );

      console.log("res", res);

      message.success(res.data.msg);
      history.push("/login");
    } catch (err) {
      err.response.data.msg && message.warning(err.response.data.msg);
    }
  };

  return (
    <div>
      <Header />
      <div className="fg_pass">
        <h2>Reset Your Password</h2>

        <div className="row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
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

          <button onClick={handleResetPass}>Reset Password</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ResetPassword;
