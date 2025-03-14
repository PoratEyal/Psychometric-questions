// src/components/userData/userData.js
import React from 'react';
import styles from './userData.module.css';

function UserData({
  topic,
  setTopic,
  difficulty,
  setDifficulty,
  numberOfQuestions,
  setNumberOfQuestions,
  onGenerate
}) {
  return (
    <div className={styles.userDataContainer}>
      <h2>הגדרות ליצירת שאלות</h2>

      {/* בחירת נושא */}
      <div className={styles.field}>
        <label>נושא: </label>
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        >
          <option value="" disabled>בחר נושא...</option>
          <option value="מתמטיקה - אריתמטיקה">מתמטיקה - אריתמטיקה</option>
          <option value="מתמטיקה - אלגברה">מתמטיקה - אלגברה</option>
          <option value="מתמטיקה - גאומטריה">מתמטיקה - גאומטריה</option>
          <option value="מתמטיקה - הסתברות">מתמטיקה - הסתברות</option>
          <option value="עברית - אוצר מילים">עברית - אוצר מילים</option>
          <option value="עברית - אנלוגיות">עברית - אנלוגיות</option>
          <option value="עברית - השלמת משפטים">עברית - השלמת משפטים</option>
          <option value="עברית - הבנת הנקרא">עברית - הבנת הנקרא</option>
          <option value="אנגלית - אוצר מילים">אנגלית - אוצר מילים</option>
          <option value="אנגלית - הבנת הנקרא">אנגלית - הבנת הנקרא</option>
          <option value="אנגלית - דקדוק">אנגלית - דקדוק</option>
          <option value="לוגיקה">לוגיקה (היגיון)</option>
        </select>
      </div>

      {/* בחירת רמת קושי */}
      <div className={styles.field}>
        <label>רמת קושי: </label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">קל</option>
          <option value="medium">בינוני</option>
          <option value="hard">קשה</option>
        </select>
      </div>

      {/* בחירת מספר שאלות */}
      <div className={styles.field}>
        <label>מספר שאלות: </label>
        <input
          type="number"
          value={numberOfQuestions}
          onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
          min="1"
          max="20"
        />
      </div>

      {/* כפתור יצירה */}
      <button onClick={onGenerate}>צור שאלות</button>
    </div>
  );
}

export default UserData;
