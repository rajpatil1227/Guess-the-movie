import React, { useEffect, useState } from "react";
import Loogo from "../assets/logo.webp";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import { useStateValue } from "../context/StateProvider";
import { app } from "../config/firebase.config";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";
import Login from "../Pages/Login";
import { actionType } from "../context/reducer";

export const Navbar = () => {
  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);
  const navigate = useNavigate();

  const logOut = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("authMovie", "false");
        navigate("/login");
      })
      .catch((e) => {
        console.log(e);
        navigate("/login", { replace: true });
      });
  };

  return (
    <header className="flex items-center w-full p-2 bg-black">
      <div
        className="flex flex-row cursor-pointer gap-4 text-4xl text-white font-serif "
        onClick={() => {
          navigate("/", { replace: true });
        }}
      >
        <img src={Loogo} alt="Logo" className="w-12" />
        <p>One-Movie</p>
      </div>

      <div
        onMouseEnter={() => setIsMenu(true)}
        onMouseLeave={() => setIsMenu(false)}
        className="flex items-center ml-auto cursor-pointer gap-2 relative"
      >
        <img
          src={user?.user.imageURL}
          className="w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg"
          alt=""
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <p className=" text-lg px-4 py-2 hover:text-headingColor font-semibold text-gray-200">
            {user?.user?.name}
          </p>
        </div>

        {isMenu && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute z-10 top-12 right-8 w-225 p-4 gap-4 bg-white bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col"
          >
            {user?.user?.email === "guessmovie02@gmail.com" && (
              <NavLink to={"/dashboard/home"}>
                <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                  Dashboard
                </p>
              </NavLink>
            )}
            <p
              className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out"
              onClick={logOut}
            >
              Sign out
            </p>
          </motion.div>
        )}
      </div>
    </header>
  );
};
