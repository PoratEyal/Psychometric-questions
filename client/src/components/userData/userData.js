import React from 'react';
import styles from './userData.module.css';

function UserData({
  topic,
  setTopic,
  difficulty,
  setDifficulty,
  numberOfQuestions,
  setNumberOfQuestions,
  onGenerate,
  loading
}) {
  return (
    <div className={styles.userDataContainer}>
      <h2 className={styles.title}>בחר הגדרות ליצירת שאלות פסיכומטריות</h2>

      {/* בחירת נושא */}
      <div className={styles.field}>
        <label htmlFor="topic" className={styles.label}>נושא:</label>
        <select
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className={styles.input}
        >
          <option value="" disabled>בחר נושא</option>
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
        <label htmlFor="difficulty" className={styles.label}>רמת קושי:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className={styles.input}
        >
          <option value="easy">קל</option>
          <option value="medium">בינוני</option>
          <option value="hard">קשה</option>
        </select>
      </div>

      {/* בחירת מספר שאלות */}
      <div className={styles.field}>
        <label htmlFor="numQuestions" className={styles.label}>מספר שאלות:</label>
        <input
          id="numQuestions"
          type="number"
          value={numberOfQuestions}
          onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
          min="1"
          max="20"
          className={styles.input}
        />
      </div>

      {/* כפתור יצירה עם אנימציית טעינה */}
      <button onClick={onGenerate} disabled={loading} className={styles.generateButton}>
        {loading ? <div className={styles.spinner}></div> : 'צור שאלות'}
      </button>
    </div>
  );
}

export default UserData;
