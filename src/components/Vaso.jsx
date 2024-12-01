import React from 'react';

const Vaso = ({ pos, hasBall, onClick }) => {
  return (
    <div className="vaso" onClick={onClick}>
      {hasBall && <div className="pelota"></div>}
      <p>Vaso {pos}</p>
    </div>
  );
};

export default Vaso;
