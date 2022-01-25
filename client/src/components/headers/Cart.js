import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import { Badge } from "antd";
import { ShoppingCartOutlined, CloseCircleOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from "antd";

export default function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const removeProduct = (id) => {
    cart.forEach((item, index) => {
      if (item._id === id) {
        cart.splice(index, 1);
      }
    });

    setCart([...cart]);
  };

  const menu = () => {
    return (
      <Menu className="menu-cart">
        {cart.map((product) => (
          <Menu.Item>
            <div className="cart-item">
              <div className="cart-item-content">
                <Link to={`/detail/${product._id}`}>
                  <p>{product.title}</p>
                </Link>
                <p>
                  {product.quantity}x${product.price}
                </p>
              </div>
              <div className="cart-item-image">
                <Link to={`/detail/${product._id}`}>
                  <img
                    src={product.images.url}
                    alt=""
                    className="cart-item-img"
                  />
                </Link>
                <CloseCircleOutlined
                  style={{ marginLeft: 10 }}
                  onClick={() => removeProduct(product._id)}
                />
              </div>
            </div>
          </Menu.Item>
        ))}
        {cart.length ? <hr/> : <div></div>}
        
        <div className="cart-item-total">
          <span>Total:</span>
          <span className="cart-total-price">${total}</span>
        </div>
        <Link to="/checkout"><button className="cart-item-button">Checkout <ArrowRightOutlined /></button></Link>
      </Menu>
    );
  };

  return (
    <div>
      <Dropdown overlay={menu}>
        <span className="ant-dropdown-link">
          <Badge count={cart.length} showZero>
            <ShoppingCartOutlined className="cart-icon" />
          </Badge>
          <span className="cart-icon-span">$ {total}</span>
        </span>
      </Dropdown>
    </div>
  );
}
