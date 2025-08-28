import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/frontend_assets";
import RelatedProducts from "../Components/RelatedProducts";
import { AppContext } from "../Context/ShopContext";
import ReviewSection from "./ReviewSection";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(AppContext);

  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    } else {
      console.log("Product not found");
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="pt-10 transition-opacity ease-in duration-500 opacity">
      {/* Product Display Section */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Image Gallery */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                onClick={() => setImage(item)}
                alt="product"
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%] mt-4 relative">
            <img
              src={image}
              alt="selected product"
              className="w-full h-auto rounded-lg shadow-xl object-cover transition-transform transform hover:scale-105 hover:shadow-2xl duration-300"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-semibold text-3xl sm:text-4xl mt-2 text-gray-800">
            {productData.name}
          </h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="star" className="w-4" />
            <img src={assets.star_icon} alt="star" className="w-4" />
            <img src={assets.star_icon} alt="star" className="w-4" />
            <img src={assets.star_icon} alt="star" className="w-4" />
            <img src={assets.star_dull_icon} alt="star" className="w-4" />
            <p className="pl-2 text-gray-600">122 Reviews</p>
          </div>
          <p className="mt-5 text-3xl font-semibold text-primary">
            {currency}
            {productData.price}
          </p>
          <p className="mt-4 text-gray-700">{productData.description}</p>

          {/* Size Selection */}
          <div className="my-6">
            <p className="text-lg font-medium text-gray-800">Select Size</p>
            <p>Seller: {productData.userId ? productData.userId.name : 'Loading...'}</p>
            <div className="flex gap-3 mt-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-3 px-6 bg-gray-200 rounded-lg font-semibold text-gray-700 transition-all duration-300 transform hover:scale-105 ${
                    item === size ? "border-orange-500 bg-orange-100" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-primary text-white px-10 py-4 text-lg font-medium rounded-lg shadow-md hover:bg-primary-dark transition-all duration-300"
          >
            ADD TO CART
          </button>
        </div>
      </div>

      {/* Product Info */}
      <hr className="mt-8 sm:w-4/5" />
      <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
        <p>100% Original Product</p>
        <p>Cash on delivery on this product.</p>
        <p>Easy return and exchange policy within 7 days.</p>
      </div>

      {/* Product Review Section */}
      <div className="mt-20 sm:w-4/5">
        <ReviewSection productId={productData._id} />
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
