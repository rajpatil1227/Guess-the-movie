const mongoose = require("mongoose");

// Storing the movie name
const MoviesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageURL: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("movie", MoviesSchema);
