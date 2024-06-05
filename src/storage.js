const saveScore = (score) => {
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push(score);
    localStorage.setItem('scores', JSON.stringify(scores));
  };
  
  const getScores = () => {
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    return scores;
  };
  
  export default {
    saveScore,
    getScores,
  };