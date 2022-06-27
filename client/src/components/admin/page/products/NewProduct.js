import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./NewProduct.css";
import { GlobalState } from "../../../../GlobalState";
import Loading from "../../../mainpages/utils/loading/Loading";
import { useHistory, useParams } from "react-router-dom";
import { message } from "antd";
import { Breadcrumb } from "antd";

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  quantityOfProduct: 0,
  description: "",
  content: "",
  category: "",
  _id: "",
};

function NewProduct() {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const history = useHistory();
  const param = useParams();

  const [products] = state.productsAPI.products;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.productsAPI.callback;

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImages(product.images);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [param.id, products]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return message.success("You're not an admin");
      const file = e.target.files[0];

      if (!file) return message.success("File not exist.");

      if (file.size > 1024 * 1024)
        // 1mb
        return message.success("Size too large.");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        // 1mb
        return message.success("File format is incorrect.");

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(res.data);
    } catch (err) {
      message.success(err.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return message.success("You're not an admin");
      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      message.success(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("product", product);
      if (!isAdmin) return message.error("You're not an admin.");
      if (!images) return message.error("You have not uploaded image.");
      if (!product) return message.error("you have not filled out all the fields.");
      if (product.category === "")
        return message.error("You have not selected a category.");

      if (onEdit) {
        var res = await axios.put(
          `/api/products/${product._id}`,
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
        message.success("Updated this Product success!");
      } else {
        var res = await axios.post(
          "/api/products",
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
        message.success("Create a product success!");
      }
      setCallback(!callback);
      history.push(`/admin/edit_product/${res.data._id}`);
    } catch (err) {
      message.error(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: images ? "block" : "none",
  };
  return (
    <div>
      {onEdit ? (
        <div>
          {" "}
          <div className="breadcrumb">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/admin">Home</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="/admin/products">Products</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Update Product</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <h1 className="create_title_product">Update Product</h1>
        </div>
      ) : (
        <div>
          {" "}
          <div className="breadcrumb">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/admin">Home</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="/admin/products">Products</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Create Product</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <h1 className="create_title_product">Create Product</h1>
        </div>
      )}
      <div className="create_product">
        <div className="upload">
          <input type="file" name="file" id="file_up" onChange={handleUpload} />
          {loading ? (
            <div id="file_img">
              <Loading />
            </div>
          ) : (
            <div id="file_img" style={styleUpload}>
              <img src={images ? images.url : ""} alt="" />
              <span onClick={handleDestroy}>X</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={product.title}
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              required
              value={product.price}
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              name="quantityOfProduct"
              id="quantityOfProduct"
              required
              value={product.quantityOfProduct}
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              name="description"
              id="description"
              // required
              value={product.description}
              rows="5"
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="content">Content</label>
            <textarea
              type="text"
              name="content"
              id="content"
              required
              value={product.content}
              rows="7"
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="categories">Categories: </label>
            <select
              name="category"
              style={{padding:10}}
              value={product.category}
              onChange={handleChangeInput}
            >
              <option value="">Please select a category</option>
              {categories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">{onEdit ? "Update" : "Create"}</button>
        </form>
      </div>
    </div>
  );
}

export default NewProduct;
