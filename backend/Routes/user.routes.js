const express = require("express");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Modals/user.model");

//for registering a new user
userRouter.post("/register", async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const userinDb = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (userinDb) {
      return res.status(400).json({ msg: "Username or email already used" });
    }
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({ msg: "some internal errror" });
      }
      const user = new UserModel({
        email,
        password: hash,
        username,
      });
      await user.save();
      res.status(201).send({ msg: "Registered successfully!!!" });
    });
  } catch (err) {
    res.status(401).send({ msg: "some internal error" });
  }
});

//for login  user
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        msg: `User not found`,
      });
    }
    bcrypt.compare(password, user.password, async (err, result) => {
      if (result) {
        await user.save();
        const token = jwt.sign({ userId: user._id }, "secret");
        res
          .status(201)
          .send({ msg: "Logged in Successfully", token, data: user });
      } else {
        res.status(401).send({
          msg: `Wrong Password `,
        });
      }
    });
  } catch (e) {
    res.status(500).send({ msg: "some internal error" });
  }
});

module.exports = { userRouter };
