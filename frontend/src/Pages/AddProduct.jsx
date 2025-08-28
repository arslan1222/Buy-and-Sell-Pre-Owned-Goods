import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { AppContext } from '../Context/ShopContext';
import { assets } from '../assets/frontend_assets';

const AddProduct = () => {
  const { backendUrl } = useContext(AppContext);
  const [token, setToken] = useState(localStorage.getItem("token") || false);

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestSeller);
      formData.append('sizes', JSON.stringify(sizes));
      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
        setSizes([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (!token && savedToken) setToken(savedToken);
  }, []);

  return (
    <div className="flex justify-center py-8 px-4">
      <form onSubmit={onSubmitHandler} className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>

        <div>
          <p className='font-medium mb-2'>Upload Images</p>
          <div className='flex flex-wrap gap-4'>
            {[{ img: image1, setter: setImage1, id: 'image1' },
              { img: image2, setter: setImage2, id: 'image2' },
              { img: image3, setter: setImage3, id: 'image3' },
              { img: image4, setter: setImage4, id: 'image4' }].map(({ img, setter, id }) => (
                <label key={id} htmlFor={id} className="cursor-pointer">
                  <img className='w-24 h-24 object-cover border rounded-lg shadow' src={!img ? assets.upload_area : URL.createObjectURL(img)} alt="upload" />
                  <input onChange={(e) => setter(e.target.files[0])} type="file" id={id} hidden />
                </label>
              ))}
          </div>
        </div>

        <div>
          <label className='block font-medium mb-1'>Product Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Type here..." />
        </div>

        <div>
          <label className='block font-medium mb-1'>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Write description here..." />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <div>
            <label className='block font-medium mb-1'>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black'>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div>
            <label className='block font-medium mb-1'>Subcategory</label>
            <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black'>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
          <div>
            <label className='block font-medium mb-1'>Price</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black'
              placeholder='300' />
          </div>
        </div>

        <div>
          <p className='font-medium mb-2'>Available Sizes</p>
          <div className='flex flex-wrap gap-3'>
            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
              <button
                key={size}
                type="button"
                onClick={() =>
                  setSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])
                }
                className={`px-4 py-1 rounded-full text-sm ${
                  sizes.includes(size) ? 'bg-primaryhover text-white' : 'bg-gray-200 text-gray-800'
                } hover:scale-105 transition-transform`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="w-full sm:w-40 py-3 bg-primary text-white rounded-md hover:bgprimaryhover transition">
          Add Product
        </button>
      </form>
    </div>
  )
}

export default AddProduct;
