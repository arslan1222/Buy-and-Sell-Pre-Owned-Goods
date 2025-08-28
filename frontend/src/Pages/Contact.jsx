import React from 'react';
import Title from '../Components/Title';
import { assets } from '../assets/frontend_assets';
import NewsletterBox from '../Components/NewsletterBox';

const Contact = () => {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 pt-10">
      <div className="text-3xl text-center pt-10">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 my-12 mb-28">
        <div className="flex flex-col gap-5 md:w-2/3 text-gray-700 text-base">
          <h2 className="text-xl font-semibold text-gray-800">📍 Our Store</h2>
          <p className="text-gray-600 leading-relaxed">
            Backer Street 12<br />
            Suite 489, Rawalpindi, Pakistan
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-4">📞 Get in Touch</h3>
          <p className="text-gray-600">
            Tel: <a href="tel:+923217077229" className="hover:underline">(+92) 347 847-395-4</a><br />
            Email: <a href="mailto:arslanhaiderchand88@gmail.com" className="hover:underline">buyandsell@gmail.com</a>
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-4">💼 Careers at Buy & Sell Pre-Owned Goods</h3>
          <p className="text-gray-600">
            Learn more about our teams and job openings.
          </p>

          <button className="w-max mt-2 px-6 py-3 border border-primary rounded-lg text-primary font-medium hover:bg-primary hover:text-white transition-all duration-300">
            Explore Jobs
          </button>
        </div>

        <img
          src={assets.contact_img}
          alt="Contact"
          className="w-full md:max-w-[480px] rounded-lg shadow-md"
        />
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;
