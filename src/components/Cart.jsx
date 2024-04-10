import React from "react";
import { useDispatch, useSelector } from "react-redux";
import noorders from "../assets/noorders.png";
import { clearCart, decrement, increment, remove } from "../store/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart);

  const removeItem = (itemId) => {
    dispatch(remove(itemId));
  };

  const incrementQuantity = (itemId) => {
    dispatch(increment({ _id: itemId }));
  };

  const decrementQuantity = (itemId) => {
    dispatch(decrement({ _id: itemId }));
  };

  const clear = () => {
    dispatch(clearCart());
  };

  const subTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = (subTotal * 0.18).toFixed();
  const total = parseInt(subTotal) + parseInt(tax);

  if (items.length === 0) {
    return (
      <div className="pt-10">
        <div className="w-56 mx-auto">
          <img src={noorders} alt="" className="object-fill" />
        </div>
        <h1 className="text-center font-bold text-3xl font-Inter mt-6">
          No Items
        </h1>
      </div>
    );
  }

  return (
    <div className="mt-6 font-Inter">
      <div className="mx-4 flex justify-between items-center overflow-y-auto">
        <h1 className="text-xl font-medium">Order Items : {items.length}</h1>
        <button
          className="px-2 py-1 text-base text-red-500 font- border border-red-400 rounded active:bg-red-500 active:text-white"
          onClick={() => clear()}
        >
          Clear Cart
        </button>
      </div>
      {items.slice().reverse().map((item, idx) => {
        return (
          <div
            key={idx}
            className=" mx-4 my-2 flex p-2 border rounded-md font-Inter"
          >
            <div className="w-1/3 h-[90px]">
              <img
                src={item.image}
                alt=""
                className="object-cover h-full w-full rounded-md"
              />
            </div>
            <div className="w-2/3 ml-2 flex flex-col">
              <h1 className="text-lg">{item.name}</h1>
              <div className="flex justify-between items-center">
                <h1 className="text-base">₹{item.price}</h1>
                <div className="flex items-center gap-3 text-base mt-1 mb-2">
                  <button
                    className="bg-black/15 px-2 rounded"
                    onClick={() => decrementQuantity(item._id)}
                  >
                    -
                  </button>
                  <h1>{item.quantity}</h1>
                  <button
                    className="bg-black/15 px-2 rounded"
                    onClick={() => incrementQuantity(item._id)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="w-full text-sm px-1 py-0.5 text-red-500 font-medium border border-red-400 rounded active:bg-red-500 active:text-white"
                onClick={() => removeItem(item._id)}
              >
                Remove Item
              </button>
            </div>
          </div>
        );
      })}
      <div className="sticky bottom-0 left-0 w-full h-48 z-20 px-4 flex flex-col justify-between border-t  bg-white">
        <h1 className="text-base my-2 font-bold">Payment Summary</h1>
        <div className="flex justify-between text-base">
          <h1 className="text-black">Sub Total</h1>
          <h1>₹ {subTotal}</h1>
        </div>
        <div className="flex justify-between text-base">
          <h1 className="text-black">Tax (6%)</h1>
          <h1>₹ {tax}</h1>
        </div>
        <hr className="my-1 dashed border border-dashed border-black/50" />
        <div className="flex justify-between text-base">
          <h1 className="font-semibold">Total</h1>
          <h1 className="font-semibold">₹ {total}</h1>
        </div>
        <Link
          to="/order"
          className="my-2 py-1 text-xl w-full bg-green-500 text-white text-center rounded-md active:bg-green-700"
        >
          Processed to Order
        </Link>
      </div>
    </div>
  );
};

export default Cart;
