import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { motion } from "framer-motion";
import moment from "moment";
import { getAllUsers, removeUser } from "../api";
import { MdDelete } from "react-icons/md";

export const DashboardUsers = () => {
  const [historyClicked, setHistoryClicked] = useState(false);
  const [{ allUsers }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data,
        });
      });
    }
  }, []);
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      {!historyClicked && (
        <div
          className="relative w-full py-12 min-h-[400px]
         my-4 flex flex-col items-center justify-start p-4  bg-gray-100 border-4 border-gray-900 rounded-md gap-3"
        >
          <div className="absolute top-4 left-4 ">
            <p className="text-xl font-bold">
              Count{" "}
              <span className="taxt-sm font-bold text-textColor">
                {allUsers?.length}
              </span>
            </p>
          </div>
          <div className="w-full min-w-[750px] flex items-center justify-between">
            <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
              Image
            </p>
            <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
              Name
            </p>
            <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
              Email
            </p>
            <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
              Verified
            </p>
            <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
              Created
            </p>
            <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
              History
            </p>
          </div>
          {allUsers &&
            allUsers?.map((data, i) => (
              <DashboardUserCard
                data={data}
                index={i}
                key={data.email}
                setHistoryClicked={setHistoryClicked}
              />
            ))}
        </div>
      )}
      {historyClicked && (
        <>
          <div className="w-full min-w-[750px] flex items-center justify-around">
            <p className="text-lg text-textColor flex items-center font-semibold w-275 min-w-[160px] text-center">
              Time Elapsed
            </p>
            <p className="text-lg text-textColor flex items-center font-semibold w-275 min-w-[160px] text-center">
              No. Of Moves
            </p>
            <p className="text-lg text-textColor flex items-center font-semibold w-275 min-w-[160px] text-center">
              Played At
            </p>
          </div>
          {historyClicked.history.map((data, i) => {
            <HistoryCard data={data} index={i} />;
          })}
        </>
      )}
    </div>
  );
};

export const HistoryCard = ({ data, index }) => {
  const createdAt = moment(new Date(data.createdAt)).format("MMMM Do YYYY");
  return (
    <motion.div
      key={index}
      className="relative w-full rounded-md flex items-center justify-between py-4 bg-yellowOverlay cursor-pointer hover:bg-card hover:shadow-md"
    >
      <p className="taxt-base text-textColor w-275 min-w-[160px] text-center">
        {data.time}
      </p>
      <p className="taxt-base text-textColor w-275 min-w-[160px] text-center">
        {data.moves}
      </p>
      <p className="taxt-base text-textColor w-275 min-w-[160px] text-center">
        {createdAt}
      </p>
    </motion.div>
  );
};

export const DashboardUserCard = ({ data, index, setHistoryClicked }) => {
  const [{ user, allUsers }, dispatch] = useStateValue();
  const [isUserRoleUpdated, setIsUserRoleUpdated] = useState(false);
  const createdAt = moment(new Date(data.createdAt)).format("MMMM Do YYYY");

  const deleteUser = (userId) => {
    removeUser(userId).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          });
        });
      }
    });
  };

  return (
    <motion.div
      key={index}
      className="relative w-full rounded-md flex items-center justify-between py-4 bg-yellowOverlay cursor-pointer hover:bg-card hover:shadow-md"
    >
      {user.user.email === "guessmovie02@gmail.com" &&
        data.email !== user?.user.email && (
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="absolute left-4 w-8 h-8 rounded-md flex items-center justify-center bg-grey-200"
            onClick={() => deleteUser(data.user_id)}
          >
            <MdDelete className="text-xl text-red-400 hover:text-red-500" />
          </motion.div>
        )}
      {/*user image*/}
      <div className="w-375 min-w-[160px] flex items-center justify-center">
        <img
          src={data.imageURL}
          referrerPolicy="no-referrer"
          alt=""
          className="w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md"
        />
      </div>
      <p className="taxt-base text-textColor w-275 min-w-[160px] text-center">
        {data.name}
      </p>
      <p className="taxt-base text-textColor w-275 min-w-[160px] text-center">
        {data.email}
      </p>
      <p className="taxt-base text-textColor w-275 min-w-[160px] text-center">
        {data.email_verified ? "True" : "False"}
      </p>
      <p className="taxt-base text-textColor w-275 min-w-[160px] text-center">
        {createdAt}
      </p>
      <div className="w-275 min-w-[160px] text-center flex items-center justify-center gap-6 relative">
        <p className="taxt-base text-textColor text-center">{data.role}</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="text-[15px] font-semibold text-textColor rounded-md px-6 py-2 bg-blue-300 hover:shadow-md"
          onClick={() => setHistoryClicked(data)}
        >
          History
        </motion.p>
      </div>
    </motion.div>
  );
};
