import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const { token } = req.headers;
    console.log(token);
    
    if (!token) {
        return res.status(401).
            json({
                success: false,
                message: 'Not Aurthorized Login Again'
            });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401)
            .json({
                success: false,
                message: error.message
            });
    }
}

export default authUser;