import validator from 'validator';
import bycript from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';
import userModel from '../models/user.model.js';

// In this user controller all the user activities like register, login, getProfile, update profile book appointment and payment gateway etc..


// Api for user register
export const registerUser = async (req, res) => {

    try {
        
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.json({success: true, message: "Missing Credentials"});
        }

        // Validator for validate email
        if(!validator.isEmail(email)) {
            return res.json({success: false, message: "Enter a valid email"});
        }

        // Validadate password by length
        if(password.length < 6) {
            return res.json({success: false, message: "Enter a strong password"});
        }

        // Now, hashing the user password
        const salt = await bycript.genSalt(10); // Now we can hash the password by using the salt
        const hashedPassword = await bycript.hash(password, salt);

        // Now save this hashed password in database
        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        // Create token

        const token = jwt.sign({id: user._id}, "mysecret");

        res.json({success: true, token})


    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

// User Login api

export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({email});

        if(!user) {
            return res.json({success: false, message: "User does not exists"});
        }

        const isMatch = await bycript.compare(password, user.password);

        if(isMatch) {
            const token = jwt.sign({id: user._id}, "mysecret");
            res.json({success: true, token});
        } else {
            res.json({success: false, message: "Invalid Credentials"});
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// Api to get user profile data 

export const getProfile = async (req, res) => {

    try {

        const {userId} = req.body;  // By using the token we will get the user Id

        const userData = await userModel.findById(userId).select('-password');
        
        res.json({success: true, userData});
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// API for updating user pfrofile

export const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file; // Get image

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing!" });
        }

        

        // Update user details first
        await userModel.findByIdAndUpdate(userId, { name, phone, address, dob, gender });

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            const imageUrl = imageUpload.secure_url;

            // Save image URL to user database
            await userModel.findByIdAndUpdate(userId, { image: imageUrl });
        }

        return res.json({ success: true, message: "Profile Updated!" });

    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password'); // Exclude passwords
        res.json({ success: true, users });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const adminLogin = async(req, res) => {

    try {
        const {email, password} = req.body;
        if(email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success: true, token})
        } else {
            res.json({success: false, message: "Invalid credentials!"})
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

