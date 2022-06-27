import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Result, Button } from "antd";
import Header from "../../headers/Header";
import Footer from "../../footers/Footer";

function ActivationEmail() {
  const { activation_token } = useParams();

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post("/user/activation", {
            activation_token,
          });
        } catch (err) {
          console.log(err.response.data.msg);
        }
      };
      activationEmail();
    }
  }, [activation_token]);

  return (
    <div>
      <Header />
      <div className="checkout-wrap" style={{ marginTop: 50 }}>
        <Result
          status="success"
          title="account verification successful"
          subTitle="You can now log in to start using the service"
          extra={[
            <Link to="/login">
              <Button type="primary" key="console">
                Start Login
              </Button>
            </Link>,
          ]}
        />
      </div>
      <Footer />
    </div>
  );
}

export default ActivationEmail;
