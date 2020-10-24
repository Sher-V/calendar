import React from "react";
import Day from "./day/day";
import styles from "./index.module.scss";

const Days: React.FC = () => {
  const today = new Date();
  const sunDate = today.getDate() - today.getDay();

  return (
    <div className={styles.days}>
      <div className={styles.timeOffsetContainer}>
        <span className={styles.timeOffset}>GMT+03</span>
      </div>
      {Array.from({ length: 7 }, (_, index) => (
        <Day key={`day - ${index}`} date={sunDate} index={index} />
      ))}
    </div>
  );
};

export default Days;
