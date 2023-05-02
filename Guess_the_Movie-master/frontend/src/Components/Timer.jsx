import React, { useEffect, useRef } from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

export const Timer = () => {
  const [{ hintsUsed, guessedtimes }, dispatch] = useStateValue();
  const timerref = useRef();

  useEffect(() => {
    let t = 1;
    setInterval(() => {
      if (timerref.current.innerHTML)
        timerref.current.innerHTML = "Time Elapsed : " + t + " seconds";
      t++;
    }, 1000);
  }, []);
  return (
    <div>
      <div className="text-white text-3xl" ref={timerref}>
        Starting Timer...
      </div>
      <div className="text-white text-3xl">Hints Asked : {hintsUsed}</div>
      <div className="text-white text-3xl">
        No. of Times Guessed : {guessedtimes}
      </div>
    </div>
  );
};
