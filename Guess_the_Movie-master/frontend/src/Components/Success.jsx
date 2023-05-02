import React from "react";
import { Button, Result } from "antd";

export const Success = ({ showsuccess, setsuccess }) => {
  return (
    <div className="absolute top-0 left-0 h-screen w-screen grid place-items-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <div className="bg-white rounded-md">
        <Result
          status="success"
          title="Guessed the Character Correctly"
          subTitle={`Your Guessed Movie is : ${showsuccess}`}
          extra={[
            <Button
              onClick={() => {
                window.location.reload();
              }}
            >
              Close
            </Button>,
          ]}
        />
      </div>
    </div>
  );
};
