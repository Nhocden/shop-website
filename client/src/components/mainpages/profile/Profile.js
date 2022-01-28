import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import "./Profile.css";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { Radio } from "antd";
import { DatePicker } from "antd";
import moment from "moment";
import { Row, Col } from "antd";
import axios from "axios";

export default function Profile() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [userInfo] = state.userAPI.userInfo;
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState(false);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [addressName, setAddressName] = useState("");
  console.log("user", user);
  console.log("token", token);

  useEffect(() => {
    setUser(userInfo);
    setAvatar(userInfo.avatar);
    setName(userInfo.name);
  }, [userInfo]);

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
      setAvatar(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const onChangeGender = (e) => {
    console.log("radio checked", e.target.value);
    setUser(user, ...{ gender: e.target.value });
  };

  const onChangeName = (e) => {
    console.log("name", e.target.value);
    setName(e.target.value);
  };

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };

  const HandleChangeCity = (e) => {
    setCity(e.target.value);
  };

  const HandleChangeAddressName = (e) => {
    setAddressName(e.target.value);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div className="profile-wrap">
      <h1 className="profile-title">Edit Profile</h1>
      <Row>
        <Col span={8} className="profile-avatar">
          <img
            src={avatar ? avatar : userInfo.avatar}
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
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            colon={false}
            onFinish={onFinish}
          >
            <Form.Item label="Username" name="name" className="form-label">
              <Input
                value={user.name}
                className="input"
                onChange={onChangeName}
              />
              {/* {name} */}
            </Form.Item>

            <Form.Item label="Email" name="email">
              {user.email}
            </Form.Item>

            <Form.Item label="Phone Number" name="phone">
              <Input value={user.phone} className="input" />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Link to="change-password">Change Password</Link>
            </Form.Item>

            <Form.Item label="Gender" name="gender">
              <Radio.Group onChange={onChangeGender} value={user.gender}>
                <Radio value={1}>Male</Radio>
                <Radio value={2}>Female</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Date Of Birth" name="birthday">
              <DatePicker
                onChange={onChangeDate}
                value={user.birthday ? moment(user.birthday, "DD/MM/YYYY") : ""}
                format="DD/MM/YYYY"
              />
            </Form.Item>

            <Form.Item label="Address" name="address">
              <Row gutter={8}>
                <Col span={5}>
                <Input
                  placeholder="input city"
                  className="input-address"
                  name="city"
                  onChange={HandleChangeCity}
                  value={city}
                />
                </Col>
                <Col span={8}>
                <Input
                  placeholder="input address"
                  className="input-address"
                  name="addressName"
                  value={addressName}
                  onChange={HandleChangeAddressName}
                />
                </Col>
              </Row>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
