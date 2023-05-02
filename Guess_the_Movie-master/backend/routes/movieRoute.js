const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const movie = require("../models/moviesModel");

// Saving all Movies data
router.post("/save", async (req, res) => {
  const newMovie = new movie({
    name: req.body.name,
    imageURL: req.body.imageURL,
  });

  try {
    const savedMovie = await newMovie.save();
    return res.status(200).send({ success: true, movies: savedMovie });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

// Get All data of movies
router.get("/getAll", async (req, res) => {
  const data = await movie.find();
  if (data) {
    return res.status(200).send({ success: true, movies: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data Not Found" });
  }
});

// deleting the movie by id
router.delete("/deleteMovie/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const result = await movie.deleteOne(filter);
  if (result.deletedCount === 1) {
    return res
      .status(200)
      .send({ success: true, msg: "Movie Removed Successfully", data: result });
  } else {
    return res.status(400).send({ success: false, msg: "User Not Found" });
  }
});

// update movies data by id
router.put("/update/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const options = {
    upsert: true,
    new: true,
  };
  if (req.body.name === "" && req.body.imageURL === "") {
    return res
      .status(400)
      .send({ success: false, msg: "please provide name of the movie" });
  }

  try {
    const result = await movie.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
      },
      options
    );
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

module.exports = router;
