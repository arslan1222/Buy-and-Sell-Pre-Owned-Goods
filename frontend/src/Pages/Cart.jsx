import React, { useContext, useEffect, useState } from "react";
import Title from "../Components/Title";
import { assets } from "../assets/frontend_assets";
import CartTotal from "../Components/CartTotal";
import { AppContext } from "../Context/ShopContext";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(AppContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="pt-16 px-4 sm:px-8">
      <div className="text-3xl mb-6 font-semibold text-center text-gray-800">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div className="space-y-4">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="p-4 bg-white shadow-md rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  className="w-20 h-20 object-cover rounded-md"
                  src={productData.image[0]}
                  alt={productData.name}
                />
                <div>
                  <p className="text-base font-medium text-gray-900">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="text-gray-600">
                      {currency}
                      {productData.price}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 border rounded-full text-gray-700">
                      {item.size}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <input
                  onChange={(event) =>
                    event.target.value === "" || event.target.value === "0"
                      ? null
                      : updateQuantity(
                          item._id,
                          item.size,
                          Number(event.target.value)
                        )
                  }
                  className="w-16 px-3 py-1 border rounded-md text-center focus:outline-none focus:ring-2 focus:ring-primary"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="w-5 cursor-pointer hover:scale-110 transition"
                  src={assets.bin_icon}
                  alt="Remove"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-12">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-primary hover:bg-primary/90 transition text-white text-sm font-medium px-6 py-3 rounded-lg mt-6"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
