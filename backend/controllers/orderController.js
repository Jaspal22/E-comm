
// Placing order using COD Method

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req, res) => {

    try {
        
        const { userId, items, amount, address } = req.body;
        
        const orderData = {
            userId,
            items,
            amount,
            address,
            status: 'Order Placed',
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }
        
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // console.log("Entered in cod payment block");

        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        res.status(200).json({
            success: true,
            message: 'Order Placed Successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Placing order using Stripe Method

const placeOrderStripe = async (req, res) => {

}

// Placing order using Razorpay Method

const placeOrderRazorpay = async (req, res) => {

}

// All orders data for admin panel

const allOrders = async (req, res) => {
    try {
        
        const orders = await orderModel.find({});
        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// User order data for frontend

const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Update order status for admin panel

const updateStatus = async (req, res) => {
    try {
        
        const {orderId, status }  = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status});
        res.status(200).json({
            success: true,
            message: 'Status Updated Successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus
}