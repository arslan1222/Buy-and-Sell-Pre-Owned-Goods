import express from "express"
import adminAuth from "../middelware/admin.auth.js";
import { allOrders, placeOrder, placeOrderPayoneer, placeOrderStripe, updateStatus, userOrders, verifyStripe } from "../controllers/order.controller.js";
import authUser from "../middelware/user.auth.js";



const orderRouter = express.Router();

// Admin features
orderRouter.post('/list',adminAuth, allOrders);
orderRouter.post('/status',adminAuth, updateStatus);

// Payment features
orderRouter.post('/place',authUser, placeOrder);
orderRouter.post('/stripe',authUser, placeOrderStripe);
orderRouter.post('/payneer',authUser, placeOrderPayoneer);


// User features
orderRouter.post('/userorders', authUser, userOrders);

// Verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe)

export default orderRouter;

