const express = require("express");
const route = express.Router();
const userSchema = require("../models/user");

//create a user
route.post("/addUser", async (req, res) => {
  const newUser = new userSchema({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
  });

  try {
    const savedUser = await newUser.save();
    return res.send(savedUser);
  } catch (err) {
    return res.send(err);
  }
});

//get user by id

route.get("/:id", async (req, res) => {
  const user = await userSchema.findById(req.params.id);
  if (user) return res.json({ user: user });
  return res.send("unable to find user");
});

//update a user

route.put("/update/:id", async (req, res) => {
  const user = await userSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  });
  try {
    return res.status(200).json({ message: "user updated", user });
  } catch (err) {
    return res.send(err);
  }
});

//delete a user

route.delete("/delete/:id", async (req, res) => {
  const deleteUser = await userSchema.findByIdAndDelete(req.params.id);
  if (deleteUser) {
    return res.json({ message: "post deleted" });
  } else {
    return res.json({ message: "failed to delete post" });
  }
});

//get all users

route.get("/", async (req, res) => {
  const allUsers = await userSchema.find();
  try {
    return res.status(200).json({ message: "all users", allUsers });
  } catch (err) {
    res.send(err);
  }
});

module.exports = route;
