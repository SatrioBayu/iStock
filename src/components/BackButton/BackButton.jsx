import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ label = "Kembali", className = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className={`btn btn-outline-secondary d-inline-flex align-items-center ${className}`}
    >
      {label}
    </button>
  );
};

export default BackButton;
