import React from "react";
import PageHader from "../PageHader/PageHader";
import { MdDeleteOutline } from "react-icons/md";

import "./Cart.css";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import MetaData from "../MetaData";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { addItemToCart, removeItemFromCart } from "../../../actions/cartActions";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id))
  };
  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (newQty > stock) return;

    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;

    if (newQty <= 0) return;

    dispatch(addItemToCart(id, newQty));
  };
  const checkoutHandler = () => {
    navigate('/login?redirect=shipping')
}

  return (
    <>
      <MetaData title={`${cartItems.length} Product in cart`} />
      <PageHader title="Cart" />

      <section id="cart" className="section__p1">
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    {cartItems.length === 0 ? (
                      <h5 className="mb-0">No items</h5>
                    ) : (
                      <h5 className="mb-0">Cart - {cartItems.length} items</h5>
                    )}
                  </div>
                  <div className="card-body">
                    {/* <!-- Single item --> */}
                    {cartItems.map((item, idx) => (
                      <>
                        <div className="row" key={idx}>
                          <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                            {/* <!-- Image --> */}
                            <Link to={`/product/${item.product}`}>
                              <div
                                className="bg-image hover-overlay hover-zoom ripple rounded"
                                data-mdb-ripple-color="light"
                              >
                                <img src={item.image} className="w-50" />
                              </div>
                            </Link>
                            {/* <!-- Image --> */}
                          </div>

                          <div className="col-lg-5 col-md-6 mb-4 mb-lg-0 d-flex justify-content-around align-content-center">
                            {/* <!-- Data --> */}
                            <Link to={`/product/${item.product}`} style={{textDecoration: 'none'}}>
                              <p>
                                <strong className="itemNameCart">{item.name}</strong>
                              </p>
                            </Link>
                            <button
                              type="button"
                              className="btn btn-sm me-1 mb-2 deleteCart"
                              data-mdb-toggle="tooltip"
                              title="Remove item"
                              style={{ background: "#f13333" }}
                              onClick={() =>
                                removeCartItemHandler(item.product)
                              }
                            >
                              <MdDeleteOutline
                                style={{
                                  color: "#fff",
                                  fontSize: "2rem",
                                  fontWeight: "bold",
                                }}
                              />
                            </button>
                            {/* <!-- Data --> */}
                          </div>

                          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                            {/* <!-- Quantity --> */}
                            <div
                              className="d-flex mb-4"
                              style={{ maxWidth: "300px" }}
                            >
                              <button
                                className="btn  px-3 me-2 quan__min"
                                onClick={() =>
                                  decreaseQty(item.product, item.quantity)
                                }
                              >
                                <AiOutlineMinusCircle />
                              </button>

                              <div className="form-outline quan__pizza">
                                <input
                                  id="form1"
                                  name="quantity"
                                  value={item.quantity}
                                  readOnly
                                  type="number"
                                  className="form-control quan__input ml-2"
                                />
                                <label className="form-label quan" htmlFor="form1">
                                  Quantity
                                </label>
                              </div>

                              <button
                                className="btn  px-3 me-2 quan__plus"
                                onClick={() =>
                                  increaseQty(
                                    item.product,
                                    item.quantity,
                                    item.stock
                                  )
                                }
                              >
                                <AiOutlinePlusCircle />
                              </button>
                            </div>
                            {/* <!-- Quantity --> */}

                            {/* <!-- Price --> */}
                            <p className="text-start text-md-center">
                              <strong>${item.price}</strong>
                            </p>
                            {/* <!-- Price --> */}
                          </div>
                        </div>
                        <hr className="my-4" />
                      </>
                    ))}
                    {/* <!-- Single item --> */}
                  </div>
                </div>
              </div>
              <div className={`col-md-4 `}>
              <div className="card mb-4 orderSummaryCart">
                <div className="card-header py-3">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush ">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 ul">
                     <h4> {cartItems.length}  (Units)</h4>
                      <span className="unit__number" style={{marginTop: '15px', fontWeight: 'bold'}}>{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} items</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div className="mt-5">
                        <strong>Total amount</strong>
                        <strong>
                          <p className="mb-0"></p>
                        </strong>
                      </div>
                      <span className="unit__number mt-5">
                        <strong style={{marginTop: '25px'}}>${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</strong>
                      </span>
                    </li>
                  </ul>
                  
                  {cartItems.length === 0 ? '' : <button
                    type="button"
                    className={`btns`}
                    style={{marginLeft: '90px', background: '#104d1a', color: '#fff'}}
                    onClick={checkoutHandler}
                  >
                    Checkout
                  </button>}
                  
                </div>
              </div>
            </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Cart;
