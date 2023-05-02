import React, { useEffect } from "react";
import { getAllDummyMovies } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { MovieCard } from "../Components/MovieCard";

export const DashboardMovies = () => {
  const [{ allMovies }, dispatch] = useStateValue();

  useEffect(() => {
    getAllDummyMovies().then((data) => {
      dispatch({ type: actionType.SET_ALL_MOVIES, allMovies: data.movies });
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
              {allMovies?.length}
            </p>
          </div>
        </div>

        <MoviesContainer data={allMovies} />
      </div>
    </div>
  );
};

export const MoviesContainer = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data &&
        data.map((movie, i) => (
          <MovieCard key={movie._id} data={movie} index={i} type="DummyMovie" />
        ))}
    </div>
  );
};
