import React from "react";
import Title from "../Components/Title";
import { assets } from "../assets/frontend_assets";
import NewsletterBox from "../Components/NewsletterBox";

const About = () => {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 pt-10">
      {/* Title */}
      <div className="text-3xl text-center pt-8">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* Main About Section */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-16 my-12 items-center">
        <img
          src={assets.about_img}
          className="w-full max-w-[450px] rounded-lg shadow-md"
          alt="About us"
        />
        <div className="flex flex-col justify-center gap-5 md:w-2/3 text-gray-700 text-base leading-relaxed">
          <p>
            Welcome to <strong className="text-primary">Buy & Sell Pre-Owned Goods</strong> - your go-to marketplace for buying and selling pre-owned goods. Whether you're looking to declutter or find budget-friendly deals, we provide a trusted platform to make it easy.
          </p>
          <p>
            We believe that second-hand doesn't mean second-best. Our community-driven platform is built to help people give new life to gently used items while saving money and reducing waste.
          </p>
          <h3 className="font-semibold text-lg text-gray-800">Our Mission</h3>
          <p>
            To create a sustainable and affordable way for people to buy and sell used products. We empower individuals to extend the lifecycle of goods and support a circular economy.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-xl py-6 text-center">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div className="bg-white border rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col gap-3">
          <h4 className="font-bold text-lg text-primary">Affordable Deals</h4>
          <p className="text-gray-600">
            Find great items at lower prices compared to new ones. Whether you're a buyer or seller, our platform helps you get value for your money.
          </p>
        </div>
        <div className="bg-white border rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col gap-3">
          <h4 className="font-bold text-lg text-primary">Easy & Secure Platform</h4>
          <p className="text-gray-600">
            List items, chat with buyers, and complete transactions smoothly. Our user-friendly design ensures hassle-free experiences for everyone.
          </p>
        </div>
        <div className="bg-white border rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col gap-3">
          <h4 className="font-bold text-lg text-primary">Eco-Friendly Choice</h4>
          <p className="text-gray-600">
            Support sustainability by extending the life of products. Every reused item helps reduce environmental impact and promotes responsible consumption.
          </p>
        </div>
      </div>

      {/* Newsletter Box */}
      <NewsletterBox />
    </div>
  );
};

export default About;
