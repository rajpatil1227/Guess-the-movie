import React, { useEffect } from "react";
import { getAllMoviesDetails } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { MovieCard } from "../Components/MovieCard";

export const DashboardMoviesDetails = () => {
  const [{ allMoviesDetails }, dispatch] = useStateValue();

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
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="relative w-full my-4 p-4 py-16 border-4 border-black rounded-md bg-gray-100">
        <div>
          <div className="absolute top-4 left-4">
            <p className="text-xl font-bold">
              <span className="text-xl font-semibold text-textColor">
                Count:{" "}
              </span>
              {allMoviesDetails?.length}
            </p>
          </div>
        </div>

        <MoviesDetailsContainer data={allMoviesDetails} />
      </div>
    </div>
  );
};

export const MoviesDetailsContainer = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data &&
        data.map((movie, i) => (
          <MovieCard
            key={movie._id}
            data={movie}
            index={i}
            type="MovieDetails"
          />
        ))}
    </div>
  );
};
