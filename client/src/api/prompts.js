// src/api/prompts.js

// פונקציה שמחזירה את ההודעת system (הוראות כלליות)
export const getSystemPrompt = () => {
    return `
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
  `;
  };
  
  // פונקציה שמחזירה את הודעת ה-user, בהתבסס על הפרמטרים
  export const getUserPrompt = (numberOfQuestions, topic, difficulty) => {
    return `
  אנא צור ${numberOfQuestions} שאלות בנושא "${topic}" 
  ברמת קושי "${difficulty}"
  עם 4 אפשרויות בחירה בעברית לכל שאלה,
  וכן ציין עבור כל שאלה איזה אינדקס (0-3) הוא הנכון.
  `;
  };
  