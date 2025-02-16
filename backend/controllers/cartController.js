import e from "cors";
import userModel from "../models/userModel.js";

// add to cart 
const addToCart = async (req,res) => {
    try {
        const { userId, itemId, size } = req.body;

        const userData = await userModel.findById(userId);
        // console.log(userData);        
        let cartData = await userData.cartData;
        // console.log(cartData);
        

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
                
            } else {
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId,{cartData});

        res.status(200).json({
            success: true,
            message: "Item Added to Cart"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// update user cart 
const updateCart = async (req,res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId,{cartData});
        res.status(200).json({
            success: true,
            message: "Cart Updated"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// get user cart data 
const getUserCart = async (req,res) => {
    try {
        const { userId } = req.body;
// console.log(userId);

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        res.status(200).json({
            success: true,
            cartData: userData.cartData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export{
    addToCart,
    updateCart,
    getUserCart
}