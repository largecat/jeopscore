import React, { useEffect } from 'react';
import './styles/Controls.css';

const Controls = (props) => {
  let {
    points,
    saveTurn,
    undo,
    toggleRound,
    currentRound,
    toggleDailyDouble,
    toggleFinalMode,
  } = props;

  useEffect(() => {
    console.log(currentRound);
  }, [currentRound]);

  const makePointBtn = (val) => {
    return (
      <div
        className='pointAmt'
        key={val.toString()}
        onClick={() => saveTurn(val)}
      >
        <h4>{val}</h4>
      </div>
    );
  };

  return (
    <div className='Controls'>
      <div className='pointBtns'>
        <div className='plusPointBtns'>
          {points.map((val) => {
            return makePointBtn(val);
          })}
        </div>
        <div className='minusPointBtns'>
          {points.map((val) => {
            return makePointBtn(-val);
          })}
        </div>
      </div>

      <div className='control-buttons'>
        <div className='undoBtn controlBtn' onClick={() => undo()}>
          undo
        </div>

        <div
          className='controlBtn'
          onClick={(e) => {
            toggleDailyDouble();
          }}
        >
          daily double
        </div>
        {currentRound.round === 'jeopardy' ? (
          <div className='controlBtn' onClick={() => toggleRound()}>
            double jeop
          </div>
        ) : (
          <div className='controlBtn' onClick={() => toggleRound()}>
            jeopardy
          </div>
        )}

        {currentRound.round === 'double jeopardy' ? (
          <div className='controlBtn' onClick={() => toggleFinalMode()}>
            final jeop
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Controls;
