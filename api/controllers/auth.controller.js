import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password ,supname,
    contname,
    contactN,
    headAddress,
    factoryAddress,
    counuty,
    businessNumber,
    taxnumber } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newUser = new User({
    username,
    email,
    password,
    supname,
    contname,
    contactN,
    headAddress,
    factoryAddress,
    counuty,
    businessNumber,
    taxnumber


  });

  try {
    await newUser.save();
    res.json("Signup succes");
  } catch (error) {
    next(error);
  }
};





export const signgin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).json({ message: "user Not found" });
    }

    const token = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httponly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};



//user update
export const updateUser = async (req, res, next) => {
  
 

 
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            password: req.body.password,
            supname: req.body.supname,
            contname: req.body.contname,
            contactN: req.body.contactN,
            headAddress: req.body.headAddress,
            factoryAddress: req.body.factoryAddress,
            counuty: req.body.counuty,
            businessNumber: req.body.businessNumber,
            taxnumber: req.body.taxnumber,
            


          },
        },
        { new: true }
      );

      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  
};







export const singOut = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    next(error);
  }
};
