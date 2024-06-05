import React, { useState } from "react";
import questions from "../questions.ts";
import storage from "../storage";

const Questionnaire = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const score = calculateScore(newAnswers);
      storage.saveScore(score);
      onComplete(score);
    }
  };

  const calculateScore = (answers) => {
    const yesCount = answers.filter((answer) => answer === "yes").length;
    return (100 * yesCount) / questions.length;
  };

  return (
    <div>
      <h2>{questions[currentQuestionIndex]}</h2>
      <div className="btn-wrapper">
        <button onClick={() => handleAnswer("yes")}>Yes</button>
        <button onClick={() => handleAnswer("no")}>No</button>
      </div>
    </div>
  );
};

export default Questionnaire;
