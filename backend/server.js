import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectDB from './config/dbConnect.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRout.js';
import orderRouter from './routes/orderRoute.js';

//  App config
const app = express();
await connectDB();
const PORT = process.env.PORT || 5001;
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

//api endpoints
app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);

app.get('/ping',(req,res)=>{
    res.send("PONG!!!!!!!!!      API Working")
})

//lishten on port
app.listen(PORT, () => {
    console.log(`server started on port = ${PORT}`);
    
})