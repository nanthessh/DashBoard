import React from "react";

const Card = ({ title, value, color }) => {
  return (
    <div className={`bg-gradient-to-r ${color} text-white p-6 rounded-lg shadow-md`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default Card;