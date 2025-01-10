import React from "react";

const Alert = ({ alert }) => {
  return (
    alert !== "" && (
      <p className="flex items-start mb-2 space-x-2">
        <span>😁</span>
        <span className="flex-1 text-base font-semibold leading-7">
          <strong>{alert}</strong>
        </span>
      </p>
    )
  );
};

export default Alert;
