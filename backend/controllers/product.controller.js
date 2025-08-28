import {v2 as cloudinary} from "cloudinary";
import productModel from "../models/product.model.js";
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";
import userModel from "../models/user.model.js";


// Function for add product
const addProduct = async(req, res) =>{

    try {

        const {token} = req.headers;
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized. Token required." });
        }

        const decoded = jwt.verify(token, "mysecret");
        const userId = decoded.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.json({ success: false, message: "Invalid user ID." });
        }
        
        const {name, description, price, category, subCategory, sizes, bestseller} = req.body;
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item)=>item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path, 
                    {resource_type: 'image'});
                    return result.secure_url
            })
        )

        console.log(name, description, price, category, subCategory, sizes, bestseller);
        console.log(imagesUrl);

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            bestseller: bestseller === 'true' ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            userId: new mongoose.Types.ObjectId(userId),
            date: Date.now()
        }

        const product = new productModel(productData);
        await product.save();

        res.json({success: true, message: "Product added successfully!"});

    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message});
    }

}


// Function for List product
const listProducts = async(req, res) =>{

    try {
        const products = (await productModel.find({}).populate("userId", "name")).reverse();
        res.json({success: true, products});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }

}

// Function for remove product
const removeProduct = async(req, res) =>{

    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Product removed successfully!"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Function for single product
const singleProduct = async(req, res) =>{

    try {
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success: true, product});
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message});
    }

}

const getProductById = async (req, res) => {
    try {
      const { productId } = req.params;
  
      const product = await productModel.findById(productId).populate("userId", "name");
  
      if (!product) return res.status(404).json({ message: "Product not found" });
  
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };

export {
    listProducts,
    addProduct,
    removeProduct,
    singleProduct,
}