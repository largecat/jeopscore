import React, { useEffect } from 'react';
import './styles/Wager.css';

const Wager = (props) => {
  const {
    score,
    wager,
    setWager,
    setHistory,
    history,
    toggleDailyDouble,
    currentRound,
    finalMode,
    endGame,
  } = props;

  const handleFinalSubmit = (targetBtn) => {
    if (targetBtn === 'correct-btn') {
      setHistory([...history, parseInt(wager)]);
      endGame();
      console.log('congrats you win', score);
    } else {
      setHistory([...history, parseInt(-wager)]);
      console.log('gameover', score);
    }
  };

  const handleWagerSubmit = async (e) => {
    e.preventDefault();

    e.target.className === 'correct-btn'
      ? await setHistory([...history, parseInt(wager)])
      : await setHistory([...history, parseInt(-wager)]);

    // if (e.target.className === 'correct.btn') {
    //   !finalMode
    //     ? setHistory([...history, parseInt(wager)])
    //     : handleFinalSubmit(e.target.className);
    //   // : setHistory([...history, parseInt(-wager)]);
    // } else {
    //   !finalMode
    //     ? setHistory([...history, parseInt(-wager)])
    //     : handleFinalSubmit(e.target.className);
    // }

    // !finalMode
    //   ? e.target.className === 'correct-btn'
    //     ? setHistory([...history, parseInt(wager)])
    //     : setHistory([...history, parseInt(-wager)])
    //   : handleFinalSubmit(e);
    setWager(0);
    toggleDailyDouble();
  };

  const isWagerValid = (wager) => {
    let max = currentRound.round === 'jeopardy' ? 1000 : 2000;

    if (wager && score < max && wager > max) {
      console.log('wager must be less than 1k if score is less than 1k');
      return false;
    } else if (score > max && wager > score) {
      console.log('wager cant be higher than what you have');
      return false;
    } else if (wager > score && score > max) {
      console.log('wager is not valid. too high');
      return false;
    } else {
      return true;
    }
  };

  const handleWagerChange = (e) => {
    let value = e.target.parentElement[0].value;
    setWager(value);
  };

  return (
    <div className='Wager'>
      <form className='wager-form'>
        <label htmlFor='wager-input'>Your wager:</label>
        <input
          type='number'
          htmlFor='wager-input'
          placeholder='~~wager~~'
          className='wager-input'
          onChange={(e) => {
            handleWagerChange(e);
          }}
        ></input>

        {wager && isWagerValid(wager) ? (
          <div className='wagerBtns'>
            <div
              onClick={(e) => {
                handleWagerSubmit(e);
              }}
              className={'correct-btn'}
            >
              correct
            </div>
            <div
              onClick={(e) => {
                handleWagerSubmit(e);
              }}
              className='incorrect-btn'
            >
              incorrect
            </div>
          </div>
        ) : (
          <div>enter a valid wager please</div>
        )}
      </form>
    </div>
  );
};

export default Wager;
