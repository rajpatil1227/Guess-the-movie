const mongoose = require("mongoose");

// Question schema where both question and answers will be provided by the frontend in the form of object but in array
const QuestionSchema = new mongoose.Schema({
  answer: { type: String },
  question: { type: String },
});

// MovieName, MovieIMG and Description of the movie
const MovieDetailsSchema = new mongoose.Schema({
  movie_name: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  options: {
    type: [QuestionSchema],
  },
});

module.exports = mongoose.model("movieDetails", MovieDetailsSchema);
