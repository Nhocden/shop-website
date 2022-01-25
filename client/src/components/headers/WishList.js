import React from "react";
import { Badge } from "antd";
import { HeartOutlined } from "@ant-design/icons";

export default function WishList() {
  return (
    <div>
      <Badge count={1}>
        <HeartOutlined className="cart-icon" />
      </Badge>
      <span className="cart-icon-span">My Wishlist</span>
    </div>
  );
}
