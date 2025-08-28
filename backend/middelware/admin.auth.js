// Adding and removng products

import jwt from "jsonwebtoken";

const adminAuth = async(req, res, next) => {

    try {
        const {token} = req.headers; // We will get the token from admin login
        if(!token) {
            return res.json({success: false, message: "Not authorized, login again!"})
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);  // Token decoded
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({success: false, message: "Not authorized, login again!"})
        }

        next();

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

export default adminAuth;