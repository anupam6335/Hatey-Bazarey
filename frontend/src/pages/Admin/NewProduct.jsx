import React, { useState, useEffect } from "react";

import { MetaData } from "../../components/allComponents";
import Sidebar from "./Sidebar";
import "./Alladmin.css";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { newProduct, clearErrors } from "../../actions/productActions";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate, useParams } from "react-router-dom";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "MenClothes",
    "WomenClothes",
    "shoe",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const match = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/admin/products");
      toast.success("Product created successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, toast, error, success, match.id]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", stock);
    formData.set("seller", seller);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(newProduct(formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <MetaData title={"New Product"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <>
            <div className="wrapper__admin my-5">
              <form
                className="shadow-lg wrapper__admin_form"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <h1 className="mb-4">New Product</h1>

                <div className="form-group" style={{ textAlign: "center" }}>
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control wrapper__admin_form__input"
                    style={{ textAlign: "center" }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div
                  className="d-flex justify-content-between"
                  style={{ gap: "20px", textAlign: "center" }}
                >
                  <div className="form-group">
                    <label htmlFor="price_field">Price</label>
                    <input
                      type="text"
                      id="price_field"
                      className="form-control wrapper__admin_form__input"
                      style={{ width: "30rem", textAlign: "center" }}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="stock_field">Stock</label>
                    <input
                      type="number"
                      id="stock_field"
                      className="form-control wrapper__admin_form__input"
                      value={stock}
                      style={{ width: "30rem", textAlign: "center" }}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ textAlign: "center" }}>
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control wrapper__admin_form__input"
                    id="description_field"
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div
                  className="d-flex justify-content-between"
                  style={{ gap: "20px", textAlign: "center" }}
                >
                  <div className="form-group">
                    <label htmlFor="category_field">Category</label>
                    <select
                      className="form-control wrapper__admin_form__input"
                      id="category_field"
                      style={{ width: "30rem", textAlign: "center" }}
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="seller_field">Seller Name</label>
                    <input
                      type="text"
                      id="seller_field"
                      className="form-control wrapper__admin_form__input"
                      style={{ width: "30rem", textAlign: "center" }}
                      value={seller}
                      onChange={(e) => setSeller(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ textAlign: "center" }}>
                  <label>Images</label>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="product_images"
                      className="custom-file-input wrapper__admin_form__input"
                      id="customFile"
                      onChange={onChange}
                      multiple
                    />
                    <label
                      className="custom-file-label wrapper__admin_form__input"
                      htmlFor="customFile"
                    >
                      Choose Images
                    </label>
                  </div>

                  {imagesPreview.map((img) => (
                    <img
                      src={img}
                      key={img}
                      alt="Images Preview"
                      className="mt-3 mr-2"
                      width="55"
                      height="52"
                    />
                  ))}
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btns"
                  style={{
                    fontWeight: "bold",
                    width: "50%",
                    marginLeft: "15rem",
                  }}
                  disabled={loading ? true : false}
                >
                  CREATE
                </button>
              </form>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
