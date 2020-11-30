const router = require("express").Router();
const { User } = require("../models");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UniqueConstraintError } = require("sequelize/lib/errors");
const { Model } = require("sequelize");

//******************** (POST) Register a user ********************//
router.post('/register', async (req, res) => {
  
   let { userName, email, password } = req.body.user;

  
  try {
    const newUser = await User.create({
      userName,
      email,
      password: bcrypt.hashSync(password, 13)
    })
    res.status(201).json({
      message:"User registered!",
      user: newUser
    })
  } catch (error) {
    if(error instanceof UniqueConstraintError) {
      res.status(409).json({
        message:"Email already in use."
      })
    } else {
      res.status(500).json({
        error: "Failed to register user."
      })
    }
  }
})

//******************** (POST) Login ********************//
router.post('/login', async (req, res) => {
  let {email, password} = req.body;

  try {
    let loginUser = await User.findOne({
      where:{ email }
    })
    // console.log("loginUser", loginUser)
    if(loginUser && await bcrypt.compare(password, loginUser.password)) {

      const token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
      res.status(200).json({
        message: 'Login successful!',
        user: loginUser,
        token,
        secondMessage: console.log('user logged in')
      })
    } else {
      res.status(400).json({
        message:'Login Failed.'
      })
    }
  } catch (error) {
    res.status(500).json({
      error:'Error logging in!'
    })
    
  }
})

module.exports = router;