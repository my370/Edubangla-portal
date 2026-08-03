const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const authMiddleware = require("../middleware/authMiddleware");
const { sendEmail } = require("../utils/email");


// Register
router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser =
      await User.findOne({ email });


    if (existingUser) {

      return res.status(400).json({
        message: "User already exists"
      });

    }


    const hashedPassword =
      await bcrypt.hash(password, 10);


    const user =
      await User.create({

        name,
        email,
        password: hashedPassword,
        role: "User"

      });


    res.status(201).json({

      success: true,

      message: "User registered successfully",

      user: {

        id: user._id,
        name: user.name,
        email: user.email

      }

    });


  } catch(error) {

    res.status(500).json({
      message: error.message
    });

  }

});




// Login
router.post("/login", async (req,res)=>{

  try {


    const {email,password}=req.body;


    const user =
      await User.findOne({email});


    if(!user){

      return res.status(400).json({
        message:"Invalid email or password"
      });

    }



    const match =
      await bcrypt.compare(
        password,
        user.password
      );



    if(!match){

      return res.status(400).json({
        message:"Invalid email or password"
      });

    }



    const token =
      jwt.sign(

        {
          id:user._id,
          role:user.role
        },

        process.env.JWT_SECRET,

        {
          expiresIn:"7d"
        }

      );



    res.json({

      success:true,

      token,

      user:{

        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role

      }

    });



  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }


});





// Forgot Password
router.post("/forgot-password", async(req,res)=>{


  try{


    const {email}=req.body;


    const user =
      await User.findOne({email});



    if(!user){

      return res.status(404).json({

        message:"User not found"

      });

    }



    const resetToken =
      crypto
      .randomBytes(32)
      .toString("hex");



    user.resetPasswordToken =
      crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");



    user.resetPasswordExpire =
      Date.now() + 15 * 60 * 1000;



    await user.save();



    const resetURL =
      `${process.env.APP_URL}/reset-password/${resetToken}`;



    await sendEmail({

      to:user.email,

      subject:"Reset Password",

      html:`

      <h2>Education Portal</h2>

      <p>
      Click below to reset your password
      </p>

      <a href="${resetURL}">
      Reset Password
      </a>

      <p>
      Link expires in 15 minutes
      </p>

      `

    });



    res.json({

      success:true,

      message:
      "Reset email sent"

    });



  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }


});





// Reset Password
router.post(
"/reset-password/:token",
async(req,res)=>{


  try{


    const hashedToken =
      crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");



    const user =
      await User.findOne({

        resetPasswordToken:hashedToken,

        resetPasswordExpire:{
          $gt:Date.now()
        }

      });



    if(!user){

      return res.status(400).json({

        message:
        "Invalid or expired token"

      });

    }



    user.password =
      await bcrypt.hash(
        req.body.password,
        10
      );



    user.resetPasswordToken = undefined;

    user.resetPasswordExpire = undefined;



    await user.save();



    res.json({

      success:true,

      message:
      "Password reset successful"

    });



  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }


});





// Profile
router.get(
"/profile",
authMiddleware,
async(req,res)=>{


  res.json({

    success:true,

    user:req.user

  });


});




module.exports = router;
