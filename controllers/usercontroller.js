const router = require("express").Router();
const { User } = require("../models");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UniqueConstraintError } = require("sequelize/lib/errors");
const { Model } = require("sequelize");

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



module.exports = router;
