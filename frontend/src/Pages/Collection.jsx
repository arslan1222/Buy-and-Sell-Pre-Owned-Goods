import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets";
import Title from "../Components/Title";
import ProductItem from "../Components/ProductItem";
import { AppContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";

const Collection = () => {
  const [filterProducts, setFilterProducts] = useState([]);
  let { products, search, showSearch, currency } = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);

  // State Variables for categories
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const [sortType, setSortType] = useState("relavent");

  // Toggle Category
  const toggleCategory = (event) => {
    if (category.includes(event.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== event.target.value));
    } else {
      setCategory((prev) => [...prev, event.target.value]);
    }
  };

  // Toggle SubCategory
  const toggleSubCategory = (event) => {
    if (subCategory.includes(event.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== event.target.value));
    } else {
      setSubCategory((prev) => [...prev, event.target.value]);
    }
  };

  // Search & Filter
  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  // Sorting
  const sortProduct = () => {
    let filteredCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(filteredCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(filteredCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="px-4 sm:px-8">
      <div className='flex flex-col items-center w-full mt-8 mb-5'>
        <div className='flex flex-col items-end w-max mb-5'>
          <p className='text-3xl font-medium uppercase'>Top Products to Buy</p>
          <div className='w-24 h-0.5 bg-primary rounded-full'></div>
        </div>
        <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted products.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-4">
        {/* Filters */}
        <div className="min-w-60">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="my-2 text-xl flex items-center cursor-pointer gap-2"
          >
            FILTERS
            <img
              className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
              src={assets.dropdown_icon}
              alt=""
            />
          </p>

          {/* Category Filter */}
          <div
            className={`rounded-xl shadow-md bg-white p-5 mb-6 transition-all ${
              showFilter ? "block" : "hidden"
            } sm:block`}
          >
            <h3 className="text-base font-semibold text-gray-800 mb-4">Categories</h3>
            <div className="flex flex-col gap-3">
              {["Men", "Women", "Kids"].map((cat) => (
                <label key={cat} className="inline-flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    value={cat}
                    onChange={toggleCategory}
                    className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                  />
                  <span className="text-sm text-gray-700">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Subcategory Filter */}
          <div
            className={`rounded-xl shadow-md bg-white p-5 mb-6 transition-all ${
              showFilter ? "block" : "hidden"
            } sm:block`}
          >
            <h3 className="text-base font-semibold text-gray-800 mb-4">Type</h3>
            <div className="flex flex-col gap-3">
              {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
                <label key={type} className="inline-flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    value={type}
                    onChange={toggleSubCategory}
                    className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                  />
                  <span className="text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Product Display */}
        <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
            <select
              onChange={(event) => setSortType(event.target.value)}
              className="border-2 border-gray-300 text-sm px-4 py-2 rounded-lg w-1/3 sm:w-1/4 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            >
              <option value="relavent">Sort by: Relevance</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProducts.map((item, index) => (
              <Link
                key={index}
                className="border w-full border-gray-300 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                to={`/product/${item._id}`}
              >
                <img
                  className="w-full h-60 object-cover"
                  src={item.image[0]}
                  alt={item.name}
                />
                <div className="p-4 bg-primary2">
                  <div className="flex items-center gap-2 text-sm text-center text-green-500">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p>Available</p>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                  <p className="text-gray-900 text-sm">
                    {currency}
                    {item.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
