import React from "react";

const SpinnerItem = ({ delay }) => (
  <div className="spinner-grow" role="status" style={{ animationDelay: delay }}>
    <span className="visually-hidden">Loading...</span>
  </div>
);

function Spinner({ text = "Loading", count = 3 }) {
  const delays = Array.from({ length: count }, (_, i) => `${i * 0.2}s`);

  return (
    <div className="text-center flex flex-col items-center gap-4">
      <h6 className="font-medium text-gray-700">{text}</h6>
      <div className="flex gap-3">
        {delays.map((delay, idx) => (
          <SpinnerItem key={idx} delay={delay} />
        ))}
      </div>
    </div>
  );
}

export default Spinner;
