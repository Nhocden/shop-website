import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import "./Profile.css";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { Radio } from "antd";
import { DatePicker } from "antd";
import { Row, Col } from "antd";
import { message } from "antd";
import axios from "axios";
import moment from "moment"

export default function Profile() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [userInfo, setUserInfo] = state.userAPI.userInfo;
  const [avatar, setAvatar] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setAvatar(userInfo.avatar);
    form.setFieldsValue({
      name: userInfo.name ? userInfo.name : "no",
      email: userInfo.email,
      phone: userInfo.phone,
      password: userInfo.password,
      gender: userInfo.gender,
      birthday: moment(userInfo.birthday),
      city: userInfo.city,
      addressName: userInfo.addressName,
    });
  }, [form, userInfo]);

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file) return alert("File not exist.");

      if (file.size > 1024 * 1024)
        // 1mb
        return alert("Size too large!");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        // 1mb
        return alert("File format is incorrect.");

      let formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      var user = userInfo;
      user.avatar = res.data.url
      await axios.patch(
        "/user/update",
        { user },
        {
          headers: { Authorization: token },
        }
      );
      message.success("update avatar success");
  
      setAvatar(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const onFinish = async (fieldsValue) => {
    var values = {};
    var user = userInfo;
    if (fieldsValue.birthday) {
      values = {
        ...fieldsValue,
        birthday: fieldsValue["birthday"].format("YYYY-MM-DD"),
      };
    } else {
      values = fieldsValue;
    }

    const keys = Object.keys(values);
    keys.forEach((item) => {
      if (values[item]) {
        user[item] = values[item];
      }
    });
    setUserInfo(user);

    await axios.patch(
      "/user/update",
      { user },
      {
        headers: { Authorization: token },
      }
    );
    message.success("update information of profile success");
  };

  console.log("userInfo", userInfo);
  return (
    <div className="profile-wrap">
      <h1 className="profile-title">Edit Profile</h1>
      <Row>
        <Col span={8} className="profile-avatar">
          <img
            src={userInfo.avatar}
            alt=""
            className="config-image"
          />
          <div className="change-avatar">
            <Button type="primary">Change Avatar</Button>
            <input
              type="file"
              name="file"
              onChange={changeAvatar}
              id="file_upp"
            />
          </div>
        </Col>
        <Col span={16} className="profile-content">
          {userInfo !== false ? (
            <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              autoComplete="off"
              colon={false}
              onFinish={onFinish}
              form={form}
              // initialValues={{
              //   name: userInfo.name ? userInfo.name : "no1",
              //   email: userInfo.email ? userInfo.email : "no email",
              //   phone: userInfo.phone,
              //   password: userInfo.password,
              //   gender: userInfo.gender,
              //   // birthday: userInfo.birthday,
              //   city: userInfo.city,
              //   addressName: userInfo.addressName,
              // }}
            >
              <Form.Item label="Username" name="name" className="form-label">
                <Input className="input-profile" maxLength={5} />
              </Form.Item>

              <Form.Item label="Email" name="email">
                {userInfo.email}
              </Form.Item>

              <Form.Item label="Phone Number" name="phone">
                <Input
                  value={userInfo.phone}
                  className="input"
                  className="input-profile"
                />
              </Form.Item>

              <Form.Item label="Password" name="password">
                <Link to="change-password">Change Password</Link>
              </Form.Item>

              <Form.Item label="Gender" name="gender">
                <Radio.Group >
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item label="Date Of Birth" name="birthday">
                <DatePicker  />
              </Form.Item>

              <Form.Item label="City" name="city">
                <Input
                  placeholder="input your city"
                  className="input-profile"
                  value={userInfo.city}
                />
              </Form.Item>

              <Form.Item label="Address" name="addressName">
                <Input
                  placeholder="input your address"
                  value={userInfo.addressName}
                  maxLength={300}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          ) : null}
        </Col>
      </Row>
    </div>
  );
}
