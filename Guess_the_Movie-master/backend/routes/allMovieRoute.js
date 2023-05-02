const router = require("express").Router();
const movie = require("../models/allMovieModel");

// Saving the movie Details
router.post("/save", async (req, res) => {
  const newMovie = movie({
    movie_name: req.body.movie_name,
    imageURL: req.body.imageURL,
    description: req.body.description,
    options: req.body.options,
  });
  try {
    const savedMovie = await newMovie.save();
    return res.status(200).send({ success: true, movie: savedMovie });
  } catch (e) {
    return res.status(400).send({ success: false, msg: e });
  }
});

// Randomly getting any one of the movie details
router.get("/getOne", async (req, res) => {
  const data = await movie.aggregate([{ $sample: { size: 1 } }]);

  if (data) {
    return res.status(200).send({ success: true, movie: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data Not Found" });
  }
});

router.get("/getAll", async (req, res) => {
  const data = await movie.find();
  if (data) {
    return res.status(200).send({ success: true, movie: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data Not Found" });
  }
});

// updating the movie details by id
router.put("/update/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const options = {
    upsert: true,
    new: true,
  };
  if (
    req.body.movie_name === "" &&
    req.body.description === "" &&
    req.body.imageURL === "" &&
    req.body.options === []
  ) {
    return res
      .status(400)
      .send({ success: false, msg: "Please Provide Valid Data" });
  }
  try {
    const result = await movie.findOneAndUpdate(
      filter,
      {
        movie_name: req.body.movie_name,
        description: req.body.description,
        imageURL: req.body.imageURL,
        options: req.body.options,
      },
      options
    );
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

// deleting the movie and it's details by id
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

module.exports = router;
