import React, { useState, useEffect } from 'react';
import Questionnaire from './components/Questionnaire';
import storage from './storage';
import './App.css'

const App = () => {
  const [showQuestionnaire, setShowQuestionnaire] = useState(true);
  const [latestScore, setLatestScore] = useState(null);
  const [averageScore, setAverageScore] = useState(null);

  useEffect(() => {
    const fetchScores = () => {
      const scores = storage.getScores();
      if (scores.length > 0) {
        const total = scores.reduce((acc, score) => acc + score, 0);
        setAverageScore(total / scores.length);
      }
    };

    fetchScores();
  }, [latestScore]);


  const handleComplete = (score) => {
    setLatestScore(score);
    setShowQuestionnaire(false);
  };

  return (
    <div className='wrapper'>
      <h1>Yes/No Questionnaire</h1>
      {showQuestionnaire ? (
        <div className='question-wrapper'><Questionnaire onComplete={handleComplete} /></div>
      ) : (
        <div  className='result-wrapper'>
          <p>Your score: {latestScore}</p>
          <p>Average score: {averageScore}</p>
          <button onClick={() => setShowQuestionnaire(true)}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default App;