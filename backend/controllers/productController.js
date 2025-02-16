import { v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js'


// function to add product
const addProduct = async (req,res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
        const image1 =req.files.image1 && req.files.image1[0];
        const image2 =req.files.image2 && req.files.image2[0];
        const image3 =req.files.image3 && req.files.image3[0];
        const image4 =req.files.image4 && req.files.image4[0];

        const images = [image1,image2,image3,image4].filter((item)=> item!==undefined);

        let imagesUrl = await Promise.all(
            images.map(async(item) => {
                let result = await cloudinary.uploader.upload(item.path , {resource_type:'image'});
                return result.secure_url;
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestSeller: bestseller === 'true' ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }
        
        

        const product = new productModel(productData);
        await product.save();
        
        return res.status(200).json({
            success: true,
            message: 'Product added successfully',
            productData
        })       
        
    } catch (error) {
       return res.status(400).json({
            success: false,
            message: error.message
        }) 
    }
}

// function for list product
const listProducts = async (req,res) => {
    try {
        
        const products = await productModel.find({});
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully',
            products
        })

    } catch (error) {
        res.send(400).json({
            success: false,
            message: error.message
        })
    }
}

//function for remove Product
const removeProduct = async (req,res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);

        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//function for single product info
const singleProduct = async (req,res) => {
    try {
        
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        return res.status(200).json({
            success: true,
            message: 'Product fetched successfully',
            product
        })

    } catch (error) {
        res.send(400).json({
            success: false,
            message: error.message
        })
    }
}

export{
    listProducts,
    addProduct,
    removeProduct,
    singleProduct
}