import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/user.route.js';
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js';
import orderRouter from './routes/order.route.js';
import reviewRouter from './routes/review.route.js';

// import userRouter from './routes/user.route.js'
// import userRouter from './routes/user.route.js'



const app = express();
const PORT = process.env.PORT;
connectDB();
connectCloudinary();

// All middelwares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


// Api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/order', orderRouter);


app.get('/', (req, res)=>{
    res.send(`Hello World`);
});

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
    
})