import { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/infor", {
            headers: { Authorization: token },
          });

          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

          setUserInfo(res.data);
          setCart(res.data.cart);
        } catch (err) {
          alert(err);
        }
      };

      getUser();
    }
  }, [token]);

  const addCart = async (product, quantity = 1, size = "M") => {
    if (!isLogged) return alert("Please login to continue buying");

    console.log("quantity", quantity, "size", size)

    const exitsProduct = cart.find((item) => {
      return item._id === product._id && item.size === size;
    });

    if (exitsProduct) {
      exitsProduct.quantity += quantity
      
    } else {
      cart.push({ ...product, quantity: quantity, size: size });
    }

    setCart([...cart]);

    message.success("add product to cart success");
    await axios.patch(
      "/user/addcart",
      { cart: [...cart] },
      {
        headers: { Authorization: token },
      }
    );
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    history: [history, setHistory],
    userInfo: [userInfo, setUserInfo],
  };
}

export default UserAPI;
