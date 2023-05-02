import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { Select, message } from "antd";
import { Movies } from "../models";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

export const GuessMovie = ({ setsuccess }) => {
  const [{ allMovies, movie, guessedtimes }, dispatch] = useStateValue();
  const [isModalOpen, setIsModalOpen] = useState(false);

  let selectedmovie = "";
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    dispatch({
      type: actionType.SET_GUESSED_TIMES,
      guessedtimes: guessedtimes + 1,
    });
    if (movie.movie_name === selectedmovie) {
      setsuccess(selectedmovie);
    } else message.error("Wrong guess");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={showModal}
        className="bg-white px-3 py-1 rounded-xl border-2 border-indigo-600"
      >
        I can Guess the Movie
      </button>
      <Modal
        title="Select the Movie you are guessing"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button
            onClick={() => {
              handleOk();
            }}
          >
            Select
          </Button>,
        ]}
      >
        <Select
          className="w-full border-2 border-indigo-600 rounded-lg"
          defaultValue="Select Movie"
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={(e) => (selectedmovie = e)}
          //   onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={allMovies.map((movie) => {
            return {
              value: movie.movie_name,
              label: movie.movie_name,
            };
          })}
        />
      </Modal>
    </div>
  );
};
