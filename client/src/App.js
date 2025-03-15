import React, { useState } from 'react';
import { OpenAI } from 'openai';
import './App.css';

import UserData from './components/userData/userData';
import Questions from './components/questions/questions';

function App() {
  // סטייט לטופס
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);

  // סטייט לתוצאות
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isQuestionsReady, setIsQuestionsReady] = useState(false);

  // יצירת אובייקט OpenAI (מפתח חשוף - לא לפרודקשן)
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  // הסכמה: פונקציה שמחזירה { questions: [ { question_text, options, correct_option }, ... ] }
  const functions = [
    {
      name: 'generate_psychometric_questions',
      description:
        'Return a list of psychometric questions in Hebrew, each with 4 multiple-choice options, and a correct answer index.',
      parameters: {
        type: 'object',
        properties: {
          questions: {
            type: 'array',
            description:
              'An array of questions in Hebrew, each with text, 4 options, and the index of the correct option.',
            items: {
              type: 'object',
              properties: {
                question_text: {
                  type: 'string',
                  description: 'The text of the question (in Hebrew).',
                },
                options: {
                  type: 'array',
                  description: 'An array of 4 answer options (in Hebrew).',
                  items: {
                    type: 'string',
                  },
                  minItems: 4,
                  maxItems: 4,
                },
                correct_option: {
                  type: 'number',
                  description:
                    'The index (0-3) of the correct answer in the options array.',
                },
              },
              required: ['question_text', 'options', 'correct_option'],
            },
          },
        },
        required: ['questions'],
      },
    },
  ];

  // פונקציה שמבקשת מהמודל להחזיר שאלות בעברית עם 4 אפשרויות + תשובה נכונה
  const handleGenerateQuestions = async () => {
    setLoading(true);
    setError(null);
    setQuestions([]);
    setIsQuestionsReady(false);

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `
אתה עוזר מומחה שמייצר שאלות פסיכומטרי בשפה העברית.
השאלות שלך צריכות לכלול 4 אפשרויות בחירה (options) בעברית, 
ולציין אינדקס של התשובה הנכונה (correct_option) בין 0 ל-3.

החזר תשובה בפורמט JSON בלבד, תחת פונקציה "generate_psychometric_questions",
למשל:
{
  "questions": [
    {
      "question_text": "מהו ערך הביטוי 2+2?",
      "options": ["1", "2", "3", "4"],
      "correct_option": 3
    },
    ...
  ]
}

אין להחזיר טקסט נוסף מחוץ ל-JSON.
`
          },
          {
            role: 'user',
            content: `
אנא צור ${numberOfQuestions} שאלות בנושא "${topic}" 
ברמת קושי "${difficulty}"
עם 4 אפשרויות בחירה בעברית לכל שאלה,
וכן ציין עבור כל שאלה איזה אינדקס (0-3) הוא הנכון.
`
          }
        ],
        functions,
        function_call: {
          name: 'generate_psychometric_questions',
        },
      });

      console.log('OpenAI raw response:', response);

      const choice = response.choices?.[0];
      const functionCall = choice?.message?.function_call;

      if (!functionCall) {
        throw new Error('No function call returned from OpenAI.');
      }

      console.log('function_call:', functionCall);

      // מפענחים את ה-arguments שהמודל החזיר
      const functionCallArgs = JSON.parse(functionCall.arguments);
      console.log('functionCall arguments:', functionCallArgs);

      const maybeQuestions = functionCallArgs.questions;
      if (maybeQuestions && Array.isArray(maybeQuestions)) {
        setQuestions(maybeQuestions);
        setIsQuestionsReady(true);
      } else {
        throw new Error('No valid "questions" array returned.');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'אירעה שגיאה.');
    } finally {
      setLoading(false);
    }
  };

  // כפתור חזרה לאתחול
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
