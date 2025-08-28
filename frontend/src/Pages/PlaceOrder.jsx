import React, { useContext, useState } from "react";
import Title from "../Components/Title";
import CartTotal from "../Components/CartTotal";
import { assets } from "../assets/frontend_assets";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../Context/ShopContext";

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');  // Cash On Delivery
  const { navigate, token, setToken, cartItems, setCartItems, backendUrl, getCartAmount, deliveryFee, products } = useContext(AppContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!products) {
        console.error("Products data is not available.");
        return;
      }

      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            } else {
              console.error(`Product with ID ${items} not found.`);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee,
        paymentMethod: method,
        Date: Date.now(),
      };

      console.log("Order Data:", orderData);

      switch (method) {
        case "cod":
          const response = await axios.post(backendUrl + "/api/order/place", orderData, { headers: { token } });
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(backendUrl + "/api/order/stripe", orderData, { headers: { token } });
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(response.data.message);
          }
          break;
      }
    } catch (error) {
      console.error("Error submitting the order:", error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-8 pt-6 sm:pt-14 min-h-[80vh] border-t border-gray-300 bg-gradient-to-r from-primaryhover to-primary2 p-6 rounded-lg shadow-lg">
      {/* Left Side */}
      <div className="flex flex-col gap-6 w-full sm:max-w-[450px] bg-white p-6 rounded-lg shadow-md">
        <div className="text-2xl font-semibold text-gray-800">
          <Title text1={"Delivery"} text2={"Information"} />
        </div>
        <div className="flex gap-4">
          <input onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder="First Name" className="border border-gray-300 rounded-md py-2 px-4 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
          <input onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder="Last Name" className="border border-gray-300 rounded-md py-2 px-4 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
        </div>
        <input onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder="Email Address" className="border border-gray-300 rounded-md py-2 px-4 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
        <input onChange={onChangeHandler} name='street' value={formData.street} type="text" placeholder="Street" className="border border-gray-300 rounded-md py-2 px-4 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
        <div className="flex gap-4">
          <input onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder="City" className="border border-gray-300 rounded-md py-2 px-4 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
          <input onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder="State" className="border border-gray-300 rounded-md py-2 px-4 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
        </div>
        <div className="flex gap-4">
          <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="number" placeholder="Zip Code" className="border border-gray-300 rounded-md py-2 px-4 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
          <input onChange={onChangeHandler} name='country' value={formData.country} type="text" placeholder="Country" className="border border-gray-300 rounded-md py-2 px-4 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
        </div>
        <input onChange={onChangeHandler} name='phone' value={formData.phone} type="number" placeholder="Phone" className="border border-gray-300 rounded-md py-2 px-4 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
      </div>

      {/* Right Side */}
      <div className="w-full sm:w-[500px] mt-6 sm:mt-0 bg-white p-6 rounded-lg shadow-md">
        <CartTotal />
        <div className="mt-8">
          <Title text1={"Payment"} text2={"Method"} />
          <div className="flex gap-4 flex-col sm:flex-row mt-4">
            {/* Payment Methods */}
            <div onClick={() => setMethod('stripe')} className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${method === 'stripe' ? 'border-primaryhover' : 'border-gray-300 hover:border-primaryhover'}`}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className="h-6 mx-4" src={assets.stripe_logo} alt="Stripe" />
            </div>
            <div onClick={() => setMethod('razorpay')} className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${method === 'razorpay' ? 'border-primaryhover' : 'border-gray-300 hover:border-primaryhover'}`}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className="h-6 mx-4" src={assets.razorpay_logo} alt="Razorpay" />
            </div>
            <div onClick={() => setMethod('cod')} className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${method === 'cod' ? 'border-primaryhover' : 'border-gray-300 hover:border-primaryhover'}`}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className="text-gray-500 text-sm font-medium">Cash On Delivery</p>
            </div>
          </div>
        </div>

        <div className="w-full text-end mt-8">
          <button type="submit" className="bg-primary hover:bg-primaryhover text-white py-3 px-16 rounded-lg text-lg font-semibold transition-all">Place Order</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
