import jwt from 'jsonwebtoken';

const adminAuth = async (req,res,next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Not Aothorized please login"
            })
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        if (token_decode!== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(400).json({
                success: false,
                message: "Not Aothorized please login"
            }) 
        }
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export default adminAuth;