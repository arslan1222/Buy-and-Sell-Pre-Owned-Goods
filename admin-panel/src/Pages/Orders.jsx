import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">📦 All Orders</h3>
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 p-6 border rounded-xl shadow-sm bg-white"
          >
            {/* Icon */}
            <img src={assets.parcel_icon} alt="parcel" className="w-10 h-10 mx-auto" />

            {/* Item Info & Address */}
            <div>
              <div className="mb-2 space-y-1">
                {order.items.map((item, idx) => (
                  <p key={idx} className="text-sm text-gray-700">
                    {item.name} × {item.quantity} <span className="text-gray-500">({item.size})</span>
                  </p>
                ))}
              </div>
              <p className="font-semibold text-gray-800">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className="text-gray-600 text-sm mt-1 space-y-1">
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                </p>
                <p className="font-medium text-gray-700">{order.address.phone}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-1 text-sm text-gray-700">
              <p><span className="font-medium">Items:</span> {order.items.length}</p>
              <p><span className="font-medium">Method:</span> {order.paymentMethod}</p>
              <p>
                <span className="font-medium">Payment:</span>{" "}
                <span className={order.payment ? "text-green-600" : "text-red-600"}>
                  {order.payment ? "Done" : "Pending"}
                </span>
              </p>
              <p><span className="font-medium">Date:</span> {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Amount */}
            <div className="text-sm font-semibold text-gray-800">
              {currency}{order.amount}
            </div>

            {/* Status Selector */}
            <div>
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
                className="w-full p-2 border rounded-md text-sm bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Order Placed">Order</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
