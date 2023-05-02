import React, { useEffect } from "react";
import { app } from "../config/firebase.config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Loogo from "../assets/logo.webp";
import { validateUser } from "../api/index";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

export const Login = ({ setAuth }) => {
  const provider = new GoogleAuthProvider();
  const firebaseAuth = getAuth();
  const navigate = useNavigate();

  const [{ user }, dispatch] = useStateValue();

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
     
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("authMovie", "true");

        firebaseAuth.onAuthStateChanged((userAuth) => {
          if (userCred) {
            navigate("/", { replace: true });
            userAuth.getIdToken().then((token) => {
            
              validateUser(token).then((data) => {
                dispatch({
                  type: actionType.SET_USER,
                  user: data,
                });
              });
            });
          } else {
            setAuth(false);
            dispatch({
              type: actionType.SET_USER,
              user: null,
            });
            navigate("/login");
          }
        });
      }
    });
  };

  useEffect(() => {
    if (window.localStorage.getItem("authMovie") === "true") {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className="relative min-w-[300px] w-screen h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <div className="absolute inset-0 bg-darkOverlay  flex items-center justify-center p-4 border border-black border-spacing-3">
        <div className="w-96 h-56 md:w-375 p-4 gap-4 border-white border-solid rounded-md border-2 shadow-2xl  bg-opacity-50 backdrop-filter backdrop-blur-md flex flex-col items-center justify-center">
          <div className="gap-2 flex items-center">
            <img src={Loogo} alt="Logo" className="w-16" />
            <p className="gap-4 text-lg text-white">Login into One-Movie</p>
          </div>
          <hr />
          <div
            className="flex items-center text-white h-12 w-60 justify-center gap-4 px-4 py-2 rounded-md border-white border-solid  border-2 bg-opacity-50 backdrop-filter backdrop-blur-md cursor-pointer hover:bg-gray-400 hover:shadow-md duration-500 ease-in-out transition-all border border-black"
            onClick={loginWithGoogle}
          >
            <FcGoogle className="text-xl " />
            Sign in with Google
          </div>
        </div>
      </div>
    </div>
  );
};
