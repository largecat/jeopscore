import React, { useState, useEffect } from 'react';
import './App.css';
import StartPage from './components/StartPage';
import Display from './components/Display';
import Controls from './components/Controls';
import Wager from './components/Wager';

function App() {
  let [score, setScore] = useState(0);

  const [currentRound, setCurrentRound] = useState({
    round: 'jeopardy',
    points: [200, 400, 600, 800, 1000],
  });

  const [points, setPoints] = useState(currentRound.points);

  const [history, setHistory] = useState([]);
  const [dailyDoubleMode, setDailyDoubleMode] = useState(false);
  const [finalMode, setFinalMode] = useState(false);
  const [wager, setWager] = useState(0);

  useEffect(() => {
    const updateScore = () => {
      let newScore = history.reduce((a, b) => a + b, 0);
      setScore(newScore);
    };
    updateScore();
  }, [history]);

  // const ddHandleWagerSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('submit dd wager');
  // };

  const toggleFinalMode = () => {
    finalMode ? setFinalMode(!finalMode) : setFinalMode(true);
  };

  const toggleDailyDouble = () => {
    setDailyDoubleMode(!dailyDoubleMode);
    // dailyDoubleMode
    //   ? setDailyDoubleMode(!dailyDoubleMode)
    //   : setDailyDoubleMode(true);
  };

  const toggleRound = () => {
    let { round, points } = currentRound;
    round === 'jeopardy'
      ? setCurrentRound({
          ...currentRound,
          round: 'double jeopardy',
          points: [400, 800, 1200, 1600, 2000],
        })
      : setCurrentRound({
          ...currentRound,
          round: 'jeopardy',
          points: [200, 400, 600, 800, 1000],
        });
  };

  const undo = () => {
    let updated = history.slice(0, -1);
    setHistory([...updated]);
  };

  const saveTurn = (val) => {
    setHistory([...history, val]);
  };

  const endGame = () => {
    console.log('~~~GAME OVER~~~');
    console.log('final score: ', score);
    toggleFinalMode();
  };

  return (
    <div className='App'>
      {/* <StartPage /> */}
      <Display score={score} setScore={setScore} points={points} />

      {dailyDoubleMode ? (
        // || finalMode
        <Wager
          score={score}
          setScore={setScore}
          // ddHandleWagerSubmit={ddHandleWagerSubmit}
          points={points}
          setPoints={setPoints}
          wager={wager}
          setWager={setWager}
          setHistory={setHistory}
          history={history}
          toggleDailyDouble={toggleDailyDouble}
          toggleFinalMode={toggleFinalMode}
          dailyDoubleMode={dailyDoubleMode}
          finalMode={finalMode}
          currentRound={currentRound}
          endGame={endGame}
        />
      ) : null}

      <Controls
        setPoints={setPoints}
        saveTurn={saveTurn}
        undo={undo}
        toggleRound={toggleRound}
        currentRound={currentRound}
        round={currentRound.round}
        points={currentRound.points}
        toggleDailyDouble={toggleDailyDouble}
        toggleFinalMode={toggleFinalMode}
      />
    </div>
  );
}

export default App;
