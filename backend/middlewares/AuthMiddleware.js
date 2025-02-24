const jwt= require("jsonwebtoken")
const User= require("../models/UserModel")

const protect= async (req, res,next)=>{
   try {
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({message:"Not authorized , no token"})
    }

    const decoded=  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user= await User.findById(decoded.id).select("-password")
    next()
   } catch (error) {
    res.status(401).json({ message: "Not authorized, invalid token" });
   }
}

const adminOnly=  (req, res,next)=>{
    if (req.user && req.user.role=="admin"){
       next()
    }
    else{
        res.status(403).json({ message: "Access denied, admin only" });
    }
}

module.exports={protect, adminOnly}