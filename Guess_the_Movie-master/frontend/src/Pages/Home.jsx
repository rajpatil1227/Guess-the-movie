import React, { useEffect } from "react";
import { Navbar } from "../Components/Navbar";
import { useState } from "react";
import { Timer } from "../Components/Timer";
import { PlayArea } from "../Components/PlayArea";
import { Spin } from "antd";
import axios from "axios";
import {
  getAllUsers,
  getAllDummyMovies,
  getAllMoviesDetails,
} from "../api/index";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

export const Home = () => {
  const [startGame, setStartGame] = useState(true);
  const [{ movie, allUsers, allMovies, allMoviesDetails }, dispatch] =
    useStateValue();

  const getRandomMovieData = async () => {
    console.log("called");
    await axios
      .get("https://guessthemovie.onrender.com/api/moviename/getone")
      .then((data) => {
        console.log("I am the one", data);
        dispatch({
          type: actionType.SET_MOVIE,
          movie: data.data.movie[0],
        });
      });
  };

  const getAllMovieData = async () => {
    await axios
      .get("https://guessthemovie.onrender.com/api/moviename/getAll")
      .then((data) => {
        console.log("I am the two", data);
        dispatch({
          type: actionType.SET_ALL_MOVIES,
          allMovies: data.data.movie,
        });
      });
  };

  useEffect(() => {
    getRandomMovieData();
    getAllMovieData();
  }, []);

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({ type: actionType.SET_ALL_USERS, allUsers: data.data });
      });
    }
    if (!allMovies) {
      getAllDummyMovies().then((data) => {
        dispatch({ type: actionType.SET_ALL_MOVIES, allMovies: data.movies });
      });
    }
    if (!allMoviesDetails) {
      getAllMoviesDetails().then((data) => {
        // console.log(data);
        dispatch({
          type: actionType.SET_ALL_MOVIES_DETAILS,
          allMoviesDetails: data.movie,
        });
      });
    }
  }, []);

  return (
    <div className=" h-screen w-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <Navbar />
      <div className="flex">
        <section className="w-2/5 h-[calc(100vh-70px)] grid place-items-center">
          {startGame ? (
            <>
              <div className="text-white text-3xl">Try to Guess The Movie</div>
            </>
          ) : (
            <>
              <Timer />
            </>
          )}
        </section>
        <section className="w-3/5 h-[calc(100vh-70px)] grid place-items-center">
          {startGame ? (
            <>
              <button
                onClick={() => setStartGame(false)}
                className="bg-white px-3 py-2 rounded-xl border-2 border-indigo-600"
              >
                Start the Game
              </button>
            </>
          ) : (
            <>
              <div className="bg-white h-3/5 w-2/5 rounded-xl border-2 border-indigo-600">
                <PlayArea />
              </div>
            </>
          )}
        </section>
        {/* <section>
          <Spin tip="Loading" size="small">
            <div className="content" />
          </Spin>
        </section> */}
      </div>
    </div>
  );
};
