import React, { useState, useEffect } from "react";

import MetaData from "../../components/layout/MetaData";
import Sidebar from "./Sidebar";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  getProductDetails,
  clearErrors,
} from "../../actions/productActions";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);

  const [oldImages, setOldImages] = useState([]);
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const match = useParams();

  const { error, product } = useSelector((state) => state.productDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const productId = match.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setSeller(product.seller);
      setStock(product.stock);
      setOldImages(product.images);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate("/admin/products");
      toast.success("Product updated successfully");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    toast,
    error,
    isUpdated,
    navigate,
    updateError,
    product,
    productId,
  ]);

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

    dispatch(updateProduct(product._id, formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

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
      <MetaData title={"Update Product"} />
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
                <h1 className="mb-4">Update Product</h1>

                <div className="form-group" style={{ textAlign: "center" }}>
                  <label htmlFor="name_field" style={{ fontWeight: "bold" }}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control wrapper__admin_form__input"
                    style={{ textAlign: "center" }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ textAlign: "center" }}>
                  <label htmlFor="price_field">Price</label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control wrapper__admin_form__input"
                    style={{ textAlign: "center" }}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ textAlign: "center" }}>
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control wrapper__admin_form__input"
                    style={{ textAlign: "center" }}
                    id="description_field"
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-group" style={{ textAlign: "center" }}>
                  <label htmlFor="category_field">Category</label>
                  <select
                    className="form-control wrapper__admin_form__input"
                    style={{ textAlign: "center" }}
                    id="category_field"
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
                <div className="form-group" style={{ textAlign: "center" }}>
                  <label htmlFor="stock_field">Stock</label>
                  <input
                    type="number"
                    id="stock_field"
                    className="form-control wrapper__admin_form__input"
                    style={{ textAlign: "center" }}
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ textAlign: "center" }}>
                  <label htmlFor="seller_field">Seller Name</label>
                  <input
                    type="text"
                    id="seller_field"
                    className="form-control wrapper__admin_form__input"
                    style={{ textAlign: "center" }}
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ textAlign: "center" }}>
                  <label>Images</label>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="product_images"
                      className="custom-file-input "
                      id="customFile"
                      onChange={onChange}
                      multiple
                    />
                    <label
                      className="custom-file-label wrapper__admin_form__input"
                      style={{ textAlign: "center" }}
                      htmlFor="customFile"
                    >
                      Choose Images
                    </label>
                  </div>

                  {oldImages &&
                    oldImages.map((img) => (
                      <img
                        key={img}
                        src={img.url}
                        alt={img.url}
                        className="mt-3 mr-2"
                        width="55"
                        height="52"
                      />
                    ))}

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
                  className="btns btn-block py-3"
                  disabled={loading ? true : false}
                >
                  UPDATE
                </button>
              </form>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
