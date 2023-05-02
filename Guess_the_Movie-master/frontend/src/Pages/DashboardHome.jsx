import React, { useEffect } from "react";
import { BiCameraMovie } from "react-icons/bi";
import { MdMovieEdit } from "react-icons/md";
import {
  getAllUsers,
  getAllDummyMovies,
  getAllMoviesDetails,
} from "../api/index";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { FaUsers } from "react-icons/fa";
import { bgColors } from "../utils/styles";

export const DashboardCard = ({ icon, name, count }) => {
  const bg_Color = bgColors[parseInt(Math.random() * bgColors.length)];
  return (
    <div
      style={{ background: `${bg_Color}` }}
      className="p-4 w-40 gap-3 h-auto rounded-lg shadow-md bg-orange-400 "
    >
      {icon}
      <div>
        <p className="text-xl text-black">{name}</p>
        <p className="text-xl text-black"> {count}</p>
      </div>
    </div>
  );
};

export const DashboardHome = () => {
  const [{ allUsers, allMovies, allMoviesDetails }, dispatch] = useStateValue();
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
        console.log(data);
        dispatch({
          type: actionType.SET_ALL_MOVIES_DETAILS,
          allMoviesDetails: data.movie,
        });
      });
    }
  }, []);

  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
      <DashboardCard
        icon={<FaUsers className="text-3xl text-black" />}
        name={"Users"}
        count={allUsers?.length > 0 ? allUsers?.length : 0}
      />
      <DashboardCard
        icon={<BiCameraMovie className="text-3xl text-black" />}
        name={"Movies"}
        count={allMoviesDetails?.length > 0 ? allMoviesDetails?.length : 0}
      />
      <DashboardCard
        icon={<MdMovieEdit className="text-3xl text-black" />}
        name={"Dummy Movies"}
        count={allMovies?.length > 0 ? allMovies.length : 0}
      />
    </div>
  );
};
