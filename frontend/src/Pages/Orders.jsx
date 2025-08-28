import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../Context/ShopContext';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(AppContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return null;

      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          });
        });

        // Latest first
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Failed to load orders", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="pt-16 px-4 sm:px-8 bg-gray-50 min-h-screen">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 uppercase">🛒 Your Orders</h2>
        <p className="text-sm text-gray-600 mt-2">Browse through your purchased products and track their status.</p>
        <div className="w-24 h-1 mx-auto bg-primary mt-2 rounded-full"></div>
      </div>

      <div className="space-y-6">
        {orderData.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md border p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              {/* Product Info */}
              <div className="flex items-start gap-5 w-full md:w-2/3">
                <img src={item.image[0]} alt="Product" className="w-20 h-20 object-cover rounded-md border" />
                <div>
                  <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                  <div className="text-sm text-gray-600 mt-1 space-y-1">
                    <p>
                      <span className="font-medium text-gray-700">Price:</span> {currency}{item.price}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Quantity:</span> {item.quantity}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Size:</span> {item.size}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Date:</span>{" "}
                      {new Date(item.date).toDateString()}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Payment:</span> {item.paymentMethod}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="w-full md:w-1/3 flex justify-between items-center mt-2 md:mt-0">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      item.status === 'Delivered'
                        ? 'bg-green-500'
                        : item.status === 'Shipped'
                        ? 'bg-yellow-400'
                        : 'bg-blue-400'
                    }`}
                  ></div>
                  <span className="capitalize">{item.status}</span>
                </div>
                <button
                  onClick={loadOrderData}
                  className="ml-4 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
