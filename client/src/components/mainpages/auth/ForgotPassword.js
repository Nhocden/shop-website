import React, { useState } from "react";
import axios from "axios";
import { isEmail } from "../utils/validation/Validation";
import { message } from "antd";
import Header from "../../headers/Header";
import Footer from "../../footers/Footer";

const initialState = {
  email: "",
};

function ForgotPassword() {
  const [data, setData] = useState(initialState);

  const { email } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const forgotPassword = async () => {
    if (!isEmail(email)) return message.warning("Invalid emails.");

    try {
      const res = await axios.post("/user/forgot", { email });
      console.log("res", res);
      return message.success(res.data.msg);
    } catch (err) {
      console.log("err", err);
      err.response.data.msg && message.warning(err.response.data.msg);
    }
  };

  return (
    <div>
      <Header />
      <div className="fg_pass">
        <h2>Forgot Your Password?</h2>

        <div className="row">
          <label htmlFor="email">Enter your email address</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleChangeInput}
          />
          <button onClick={forgotPassword}>Verify your email</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ForgotPassword;
