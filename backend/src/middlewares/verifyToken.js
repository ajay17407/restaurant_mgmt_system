import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = async(req,res,next) => {
    
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({message:"No token provided"});

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        const user = await User.findByPk(decoded.id);

        if(!user) return res.status(401).json({message: "invalid token"});

        req.user = {id: user.id,isAdmin: user.isAdmin};
        next();
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({message:"invalid token"});
    }
};

export default verifyToken;