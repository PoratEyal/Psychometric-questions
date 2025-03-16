import React, { useState } from 'react';
import './App.css';
import UserData from './components/userData/userData';
import Questions from './components/questions/questions';
import { generatePsychometricQuestions } from './api/generateQuestions';

function App() {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isQuestionsReady, setIsQuestionsReady] = useState(false);

  // פונקציה שמבצעת את הקריאה ל-OpenAI דרך הפונקציה המיובאת
  const handleGenerateQuestions = async () => {
    setLoading(true);
    setError(null);
    setQuestions([]);
    setIsQuestionsReady(false);

    try {
      const qs = await generatePsychometricQuestions(topic, difficulty, numberOfQuestions);
      setQuestions(qs);
      setIsQuestionsReady(true);
    } catch (err) {
      console.error(err);
      setError(err.message || 'אירעה שגיאה.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setIsQuestionsReady(false);
    setTopic('');
    setDifficulty('easy');
    setNumberOfQuestions(5);
    setQuestions([]);
    setError(null);
  };

  return (
    <div className="app-container">
      {!isQuestionsReady && (
        <UserData
          topic={topic}
          setTopic={setTopic}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          numberOfQuestions={numberOfQuestions}
          setNumberOfQuestions={setNumberOfQuestions}
          onGenerate={handleGenerateQuestions}
          loading={loading}
        />
      )}

      {isQuestionsReady && (
        <>
          <Questions
            questions={questions}
            loading={loading}
            error={error}
          />
          <button onClick={handleBack} className="back-button">
            חזרה לבחירת נושא
          </button>
        </>
      )}
    </div>
  );
}

export default App;
