import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoTrash } from "react-icons/io5";
import { getAllDummyMovies, getAllMoviesDetails } from "../api/index";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { deleteMovieDetailsById, deleteMoviesById } from "../api/index";
export const MovieCard = ({ data, index, type }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [{ user, allMovies, allMoviesDetails }, dispatch] = useStateValue();

  const deleteData = (data) => {
    console.log(data);
    if (type === "MovieDetails") {
      deleteMovieDetailsById(data._id).then((res) => {
        if (res.data) {
          dispatch({ type: actionType.SET_ALERT_TYPE, actionType: "success" });
        }
      });
      setTimeout(() => {
        dispatch(
          {
            type: actionType.SET_ALERT_TYPE,
            alertType: null,
          },
          3000
        );
        getAllMoviesDetails().then((data) => {
          console.log(data);
          dispatch({
            type: actionType.SET_ALL_MOVIES_DETAILS,
            allMoviesDetails: data.movie,
          });
        });
      });
    } else {
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      });
      setTimeout(() => {
        dispatch(
          {
            type: actionType.SET_ALERT_TYPE,
            alertType: null,
          },
          3000
        );
      });
    }

    if (type === "DummyMovie") {
      deleteMoviesById(data._id).then((res) => {
        if (res.data) {
          dispatch({ type: actionType.SET_ALERT_TYPE, actionType: "success" });
        }
      });
      setTimeout(() => {
        dispatch(
          {
            type: actionType.SET_ALERT_TYPE,
            alertType: null,
          },
          3000
        );
        getAllDummyMovies().then((data) => {
          dispatch({ type: actionType.SET_ALL_MOVIES, allMovies: data.movies });
        });
      });
    } else {
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      });
      setTimeout(() => {
        dispatch(
          {
            type: actionType.SET_ALERT_TYPE,
            alertType: null,
          },
          3000
        );
      });
    }
  };
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative w-46 min-w-210 px-2 py-4 cursor-pointer hover:bg-blue-100 bg-white shadow-md rounded-lg flex flex-col items-center hover:shadow-2xl border border-black"
    >
      <div className="w-20 h-20 min-w-[160px] min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={data?.imageURL}
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
      <p className="text-base text-center text-headingColor font-semibold my-2">
        {data.movie_name?.length > 20
          ? `${data.movie_name.slice(0, 20)}..`
          : data.movie_name}
        {data?.name && (
          <span className=" text-sm text-center text-gray-400 flex items-center justify-between my-1">
            {data.name?.length > 10 ? `${data.name.slice(0, 10)}..` : data.name}
          </span>
        )}
      </p>
      {user.user.email === "guessmovie02@gmail.com" && (
        <div className="w-full absolute bottom-2 right-2 flex items-center justify-between px-4">
          <motion.i
            whileTap={{ scale: 0.75 }}
            className="text-base text-red-400 drop-shadow-md hover:text-red-600"
            onClick={() => setIsDelete(true)}
          >
            <IoTrash />
          </motion.i>
        </div>
      )}
      {isDelete && (
        <motion.div
          className="absolute inset-0 backdrop-blur-md bg-cardOverlay flex items-center flex-col justify-center px-4 py-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-lg text-headingColor font-semibold text-center">
            Are you sure do you want to delete it?
          </p>
          <div className="flex items-center gap-4">
            <motion.button
              className="px-3 py-2 text-sm uppercase text-white bg-green-700 rounded-md cursor-pointer"
              whileTap={{ scale: 0.75 }}
              onClick={() => deleteData(data)}
            >
              Yes
            </motion.button>
            <motion.button
              className="px-3 py-2 text-sm uppercase text-white bg-red-700 rounded-md cursor-pointer"
              whileTap={{ scale: 0.75 }}
              onClick={() => {
                setIsDelete(false);
              }}
            >
              No
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
