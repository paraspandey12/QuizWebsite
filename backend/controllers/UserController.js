const User = require("../models/UserModel");
const cookie= require("cookie-parser")
const jwt= require("jsonwebtoken")

const registration = async (req, res) => {
  try {
    const { name, email, password,role } = req.body;
    const existingUser =await User.findOne({email});
    if (existingUser) {
     return res.status(400).json({ message: "user already exist" });
    }
    const newRole = role === "admin" ? "admin" : "user";
    const user = new User({
      email,
      name,
      password,
      role: newRole,
    });
    await user.save();
    res.status(200).json({ message: "user registerd successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.find();
    if (user.length === 0) {
       return res.status(400).json({ message: "no user found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user= await User.findOne({email})

    if(!user){
      return res.status(400).json({message:"user does not exist"})
    }
    const isMatch= await user.isPasswordCorrect(password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    let token= user.getSignedjwtToken()
    res.cookie("token", token,{
      httpOnly: true,
      secure: true,
      sameSite:"strict",
      maxAge:3600000 
    })
    
    res.status(200).json({ message: "Login successful", 
      user: { name: user.name, email: user.email, role: user.role },
      token ,
      role:user.role});
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No token found" });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id).select("-password"); 

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


const getUserRole = async (req, res) => {
  let token = req.cookies.token || req.header("Authorization")?.split(" ")[1];
   
  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decoded);
    console.log(decoded.role);
    res.status(200).json({ role: decoded.role });
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: "Invalid token" });
  }
};


const getuserId = async (req, res) => {
  let token = req.cookies.token || req.header("Authorization")?.split(" ")[1];
   
  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log()
    res.status(200).json(decoded.id );
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: "Invalid token" });
  }
};



const makeAdmin = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "admin";
    await user.save();

    res.status(200).json({ message: "User is now an admin", user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};


const removeAdmin = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "user"; // Reverting back to normal user
    await user.save();

    res.status(200).json({ message: "Admin rights removed", user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};


module.exports= {getUser,registration, login, getUserRole,getCurrentUser,getuserId, makeAdmin, removeAdmin }