import React, { useState, useEffect } from "react";
import { QuestionModel } from "./QuestionModel";
import { GuessMovie } from "./GuessMovie";
import { Success } from "./Success";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { getAllMoviesDetails } from "../api";
export const PlayArea = () => {
  const [{ movie }, dispatch] = useStateValue();
  const [showsuccess, setsuccess] = useState(false);
  // console.log(movie);
  useEffect(() => {
    getAllMoviesDetails().then((data) => {
      console.log(data);
      dispatch({
        type: actionType.SET_ALL_MOVIES_DETAILS,
        allMoviesDetails: data.movie,
      });
    });
  }, []);

  return (
    <div className="flex h-full gap-8 flex-col p-8 items-center justify-center">
      <div>
        <p className="text-xl font-bold">Description :</p> {movie?.description}
      </div>
      <GuessMovie setsuccess={setsuccess} />
      <QuestionModel />
      {showsuccess && (
        <Success showsuccess={showsuccess} setsuccess={setsuccess} />
      )}
    </div>
  );
};
