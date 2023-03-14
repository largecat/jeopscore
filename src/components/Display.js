import React from 'react';
import './styles/Display.css';

const Display = (props) => {
  const { score } = props;

  return (
    <div className='Display'>
      <h1 className='score'>{score}</h1>
    </div>
  );
};
export default Display;
