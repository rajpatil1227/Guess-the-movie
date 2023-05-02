const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv/config");
app.use(express.json());
app.use(cors());

// checking the connect of the Backend
app.get("/", (req, res) => {
  return res.json("Hello World....");
});

// user Authentication Route
const userRoute = require("./routes/userRoutes");
app.use("/api/users/", userRoute);

// All Movies Names Route
const movieNames = require("./routes/allMovieRoute");
app.use("/api/moviename/", movieNames);

// Movie details Route
const movie = require("./routes/movieRoute");
app.use("/api/movie/", movie);

// Mongo Connection
mongoose.connect(process.env.MongoDB, { useNewUrlParser: true });

mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", (e) => console.log(`ERROR: ${e}`));

// Port is 4000 if not mentioned in .env
app.listen(process.env.PORT || 4000, () => {
  console.log("Listening to port 4000");
});
