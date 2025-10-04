import React from "react";

function Spinner() {
  return (
    <div className="text-center">
      <h6>Loading</h6>
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
