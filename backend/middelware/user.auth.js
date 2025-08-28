import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: "Not authorized, Login Again" });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ Ensure req.body exists
        if (!req.body) req.body = {};

        req.body.userId = tokenDecode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Invalid or expired token" });
    }
};


export default authUser;