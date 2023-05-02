import React, { useState, useRef } from "react";
import { Modal, Button } from "antd";
import { Select } from "antd";
import { Questions } from "../models";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { notification } from "antd";

export const QuestionModel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [{ hintsUsed, movie }, dispatch] = useStateValue();

  let questionno = -1;

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    dispatch({
      type: actionType.SET_HINT_USED,
      hintsUsed: hintsUsed + 1,
    });
    openNotification();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openNotification = () => {
    notification.open({
      message: movie.options[questionno].question,
      description: movie.options[questionno].answer,
    });
  };

  return (
    <div>
      <button
        onClick={showModal}
        className="bg-white px-3 py-1 rounded-xl border-2 border-indigo-600"
      >
        I want some Hints
      </button>
      <Modal
        title="Select the  Question you want to ask"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button
            onClick={() => {
              handleOk();
            }}
          >
            Ask
          </Button>,
        ]}
      >
        <Select
          className="w-full border-2 border-indigo-600 rounded-lg"
          defaultValue="Select Question"
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={(e) => (questionno = e)}
          //   onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={movie.options.map((qa, i) => {
            return {
              value: i,
              label: qa.question,
            };
          })}
        />
      </Modal>
    </div>
  );
};
