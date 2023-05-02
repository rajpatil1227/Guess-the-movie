import React, { Suspense } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { useStateValue } from "../context/StateProvider.js";
import { Navbar } from "./Navbar";
import { DashboardHome } from "../Pages/DashboardHome";
import { DashboardMovies } from "../Pages/DashboardMovies";
import { DashboardUsers } from "../Pages/DashboardUsers";
import { DashboardMoviesDetails } from "../Pages/DashboardMoviesDetails";
import { LoadingSpinner } from "../utils/LoadingSpinner";
import { Alert } from "./Alert";

export const Dashboard = () => {
  const [{ alertType, user }, dispatch] = useStateValue();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <Navbar />
      <div className="w-[60%] my-2 p-4 flex items-center justify-evenly">
        <NavLink
          to={"/dashboard/home"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/dashboard/users"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          Users
        </NavLink>

        <NavLink
          to={"/dashboard/movies"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          MoviesDetails
        </NavLink>
        <NavLink
          to={"/dashboard/dummymovies"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          Movies
        </NavLink>
      </div>
      <div className="my-4 w-full p-4">
        <Suspense
          fallback={
            <div className="center">
              <LoadingSpinner />
            </div>
          }
        >
          <Routes>
            <Route path="/home" element={<DashboardHome />} />
            <Route path="/users" element={<DashboardUsers />} />
            <Route path="/dummymovies" element={<DashboardMovies />} />
            <Route path="/movies" element={<DashboardMoviesDetails />} />
          </Routes>
        </Suspense>
        {alertType && <Alert type={alertType} />}
      </div>
    </div>
  );
};
