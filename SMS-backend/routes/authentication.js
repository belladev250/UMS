const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const authSchema = require("../models/auth");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//validate schema with  joi

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  username: Joi.string().min(3).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

router.get("/", (req, res) => {
  res.send("welcome to ums");
});

//registration api
router.post("/register", async (req, res) => {
  //validate req.body
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if the user is already in the db
  const emailExists = await authSchema.findOne({ email: req.body.email });
  if (emailExists) res.json({ message: "email already exists" });

  //hash password
  const salt = 10;
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //create a new user
  const newUser = new authSchema({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
  });

  // save the new created user
  try {
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// login api

router.post("/login", async (req, res) => {
  //check for errors
  const { error } = loginSchema.validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  //check the user logging in
  const user = await authSchema.findOne({ email: req.body.email });
  if (!user) res.send("user does not exist");

  //check if the password is wrong
  const validate = await bcrypt.compare(req.body.password, user.password);
  if (!validate) res.send("username or password is wrong");

  //create a payload

  const payload = {
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
  };
  //create a jwt
  const token = jwt.sign(payload, process.env.SECRET_KEY);
  if (!token) res.status(404).json({ message: "access denied" });
  res.header("auth-token", token).send(token);

  const verified = jwt.verify(token, process.env.SECRET_KEY);
  if (!verified)
    res
      .status(404)
      .json({ message: "token verification failed,access denied" });
});

module.exports = router;
