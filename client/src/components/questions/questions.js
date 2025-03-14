// src/components/questions/questions.js
import React, { useState } from 'react';
import styles from './questions.module.css';

function Questions({ questions, loading, error }) {
  // ננהל סטייט של תשובות המשתמש; אורך המערך = מספר השאלות
  // כל אינדקס יאחסן את הבחירה של המשתמש (0-3), או null אם לא נבחר עדיין
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));

  const handleOptionChange = (questionIndex, optionIndex) => {
    // מעדכנים את הבחירה בסטייט
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = optionIndex;
    setUserAnswers(updatedAnswers);
  };

  if (loading) {
    return <p>טוען שאלות...</p>;
  }

  if (error) {
    return <p className={styles.error}>שגיאה: {error}</p>;
  }

  return (
    <div className={styles.questionsContainer}>
      <h2>השאלות שנוצרו</h2>
      {questions && questions.length > 0 ? (
        questions.map((q, questionIndex) => {
          // האם המשתמש בחר תשובה? userAnswers[questionIndex]
          const userAnswer = userAnswers[questionIndex]; 
          const correctAnswer = q.correct_option; // אינדקס התשובה הנכונה
          const isAnswered = userAnswer !== null; // האם המשתמש בחר תשובה
          
          return (
            <div key={questionIndex} className={styles.questionCard}>
              <h3 className={styles.questionText}>
                {questionIndex + 1}. {q.question_text}
              </h3>
              <div>
                {q.options.map((option, optionIndex) => {
                  // בדיקה האם זו האופציה שהמשתמש בחר
                  const isSelected = userAnswer === optionIndex;
                  // בדיקה האם זו האופציה הנכונה
                  const isCorrect = correctAnswer === optionIndex;

                  // הגדרת סטייל בהתאם לבחירה או נכונות
                  let optionClass = styles.optionButton;
                  if (isAnswered && isSelected) {
                    // אם המשתמש בחר אותה
                    optionClass = isCorrect 
                      ? styles.optionButtonCorrect
                      : styles.optionButtonWrong;
                  }

                  return (
                    <label key={optionIndex} className={styles.optionLabel}>
                      <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        value={optionIndex}
                        checked={isSelected}
                        onChange={() => handleOptionChange(questionIndex, optionIndex)}
                      />
                      <span className={optionClass}>
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>
              {isAnswered && (
                <div className={styles.feedback}>
                  {userAnswer === correctAnswer 
                    ? <span className={styles.correctText}>תשובה נכונה!</span>
                    : <span className={styles.wrongText}>תשובה שגויה</span>
                  }
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p>אין שאלות כרגע.</p>
      )}
    </div>
  );
}

export default Questions;
