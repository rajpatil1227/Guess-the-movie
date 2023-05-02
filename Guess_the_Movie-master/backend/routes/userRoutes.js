const { Router, response } = require("express");
const router = require("express").Router();
const user = require("../models/userModel");
const admin = require("../config/firebase.config");

// login through google will take token from frontend
router.get("/login", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ message: "Invalid Token" });
  }
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    
    if (!decodeValue) {
      return res.status(505).json({ message: "UnAuthorized" });
    } else {
      const userExists = await user.findOne({ user_id: decodeValue.user_id });
      if (!userExists) {
        newUserData(decodeValue, req, res);
      } else {
        updateNewUserData(decodeValue, req, res);
      }
    }
  } catch (e) {
    return res.status(505).json({ message: e });
  }
});

// creating new user if not exist
const newUserData = async (decodeValue, req, res) => {
  const newUser = new user({
    name: decodeValue.name,
    email: decodeValue.email,
    imageURL: decodeValue.picture,
    email_verified: decodeValue.email_verified,
    user_id: decodeValue.user_id,
    auth_time: decodeValue.auth_time,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).send({ user: savedUser });
  } catch (e) {
    res.status(400).send({ success: false, msg: e });
  }
};

// updating the current auth_Time of user to maintain the data
const updateNewUserData = async (decodeValue, req, res) => {
  const filter = { user_id: decodeValue.user_id };
  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await user.findOneAndUpdate(
      filter,
      {
        auth_time: decodeValue.auth_time,
      },
      options
    );
    res.status(200).send({ user: result });
  } catch (e) {
    res.status(400).send({ success: false, msg: e });
  }
};

// get all users data
router.get("/getUsers", async (req, res) => {
  const cursor = await user.find();
  if (cursor) {
    res.status(200).send({ success: true, data: cursor });
  } else {
    res.status(400).send({ success: false, msg: "No Data Found" });
  }
});

// delete the users by ID
router.delete("/deleteUser/:userId", async (req, res) => {
  const filter = { user_id: req.params.userId };
  const result = await user.deleteOne(filter);
  if (result.deletedCount === 1) {
    return res
      .status(200)
      .send({ success: true, msg: "User Removed Successfully", data: result });
  } else {
    return res.status(400).send({ success: false, msg: "User Not Found" });
  }
});

// Update the best moves, Time, Movie by user_ID that is provided by Google Auth
router.put("/updateBestTime/:userId", async (req, res) => {
  const filter = { user_id: req.params.userId };
  const best_time = req.body.best_time;
  const best_moves = req.body.best_moves;
  const best_char = req.body.best_char;
  if (best_char === "" && best_moves && best_time) {
    res
      .status(400)
      .send({ success: false, msg: "Please provide valid details" });
  }

  try {
    const result = await user.findOneAndUpdate(filter, {
      best_time: best_time,
      best_moves: best_moves,
      best_char: best_char,
    });
    res.status(200).send({ user: result });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});

// Update the History of the user by user_ID that is provided by Google Auth
router.put("/updateHistory/:id", async (req, res) => {
  const filter = { user_id: req.params.id };
  const options = {
    upsert: true,
    new: true,
  };
  if (req.body.history === []) {
    return res
      .status(400)
      .send({ success: false, msg: "Please Provide Valid Data" });
  }
  try {
    const result = await movie.findOneAndUpdate(
      filter,
      {
        history: req.body.history,
      },
      options
    );
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

module.exports = router;
