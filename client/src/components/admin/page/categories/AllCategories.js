import React, { useState, useContext } from "react";
import { GlobalState } from "../../../../GlobalState";
import axios from "axios";
import { Link } from "react-router-dom";
import "./categories.css";
import { Popconfirm, message } from "antd";
import { Breadcrumb } from "antd";

function AllCategories() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = useState("");
  const [token] = state.token;
  const [callback, setCallback] = state.categoriesAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/category/${id}`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        message.success(res.data.msg);
      } else {
        const res = await axios.post(
          "/api/category",
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        message.success(res.data.msg);
      }
      setOnEdit(false);
      setCategory("");
      setCallback(!callback);
    } catch (err) {
      message.error(err.response.data.msg);
    }
  };

  const editCategory = async (id, name) => {
    setID(id);
    setCategory(name);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token },
      });
      message.success(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      message.error(err.response.data.msg);
    }
  };

  function confirm(e) {
    console.log(e);
    message.success("Click on Yes");
  }

  function cancel(e) {
    console.log(e);
    message.error("Click on No");
  }

  return (
    <div>
      <div >
        <Breadcrumb className="Breadcrumb">
          <Breadcrumb.Item>
            <Link to="/admin">Home</Link>
          </Breadcrumb.Item>
          {onEdit ? <Breadcrumb.Item>Update Category</Breadcrumb.Item> : <Breadcrumb.Item>Create Category</Breadcrumb.Item>}
        </Breadcrumb>
      </div>
      <div className="categories">
        <form onSubmit={createCategory}>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          />

          <button type="submit">{onEdit ? "Update" : "Create"}</button>
        </form>

        <div className="col">
          {categories.map((category) => (
            <div className="row" key={category._id}>
              <p>{category.name}</p>
              <div>
                <button
                  onClick={() => editCategory(category._id, category.name)}
                >
                  Edit
                </button>
                <Popconfirm
                  title="Are you sure to delete this category?"
                  onConfirm={() => deleteCategory(category._id)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <button>Delete</button>
                </Popconfirm>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllCategories;
