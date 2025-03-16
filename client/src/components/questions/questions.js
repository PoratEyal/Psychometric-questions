import React, { useState, useEffect } from 'react';
import styles from './questions.module.css';

function Questions({ questions, loading, error }) {
  // ניהול סטייט של תשובות המשתמש; מתעדכן כאשר מספר השאלות משתנה
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    setUserAnswers(Array(questions.length).fill(null));
  }, [questions]);

  const handleOptionChange = (questionIndex, optionIndex) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = optionIndex;
    setUserAnswers(updatedAnswers);
  };

  if (loading) {
    return <p className={styles.loading}>טוען שאלות...</p>;
  }

  if (error) {
    return <p className={styles.error}>שגיאה: {error}</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>השאלות שנוצרו</h2>
      {questions && questions.length > 0 ? (
        questions.map((q, questionIndex) => {
          const userAnswer = userAnswers[questionIndex];
          const correctAnswer = q.correct_option;
          const isAnswered = userAnswer !== null;

          return (
            <div key={questionIndex} className={styles.questionCard}>
              <div className={styles.questionHeader}>
                <span className={styles.questionNumber}>{questionIndex + 1}.</span>
                <span className={styles.questionText}>{q.question_text}</span>
              </div>
              <div className={styles.optionsContainer}>
                {q.options.map((option, optionIndex) => {
                  const isSelected = userAnswer === optionIndex;
                  const isCorrect = correctAnswer === optionIndex;
                  let optionClass = styles.option;
                  if (isAnswered && isSelected) {
                    optionClass = isCorrect ? styles.optionCorrect : styles.optionWrong;
                  }
                  return (
                    <label key={optionIndex} className={styles.optionLabel}>
                      <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        value={optionIndex}
                        checked={isSelected}
                        onChange={() => handleOptionChange(questionIndex, optionIndex)}
                        className={styles.radioInput}
                      />
                      <span className={optionClass}>{option}</span>
                    </label>
                  );
                })}
              </div>
              {isAnswered && (
                <div className={styles.feedback}>
                  {userAnswer === correctAnswer ? (
                    <span className={styles.correctFeedback}>תשובה נכונה!</span>
                  ) : (
                    <span className={styles.wrongFeedback}>תשובה שגויה</span>
                  )}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p className={styles.noQuestions}>אין שאלות להצגה.</p>
      )}
    </div>
  );
}

export default Questions;
