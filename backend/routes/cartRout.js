import express from 'express';
import { addToCart,updateCart,getUserCart } from '../controllers/cartController.js';
import authUser from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.route('/add').post( authUser , addToCart);
cartRouter.route('/update').post( authUser , updateCart);
cartRouter.route('/get').post( authUser , getUserCart);

export default cartRouter;