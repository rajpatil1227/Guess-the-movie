const mongoose = require("mongoose");

// Schema to store each gameplay (time) and (moves) of the user
const HistorySchema = new mongoose.Schema(
  {
    time: { type: String },
    moves: { type: String },
  },
  { timestamps: true }
);

// Schema where we store name, email, imageURL, user_id, auth_time, email_verified, best_time, etc. in the user database
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    auth_time: {
      type: String,
      required: true,
    },
    email_verified: {
      type: Boolean,
      required: true,
    },
    best_time: {
      type: Number,
    },
    best_moves: {
      type: Number,
    },
    best_char: {
      type: String,
    },
    history: {
      type: [HistorySchema],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
