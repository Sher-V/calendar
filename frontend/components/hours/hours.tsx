import React from "react";
import styles from "./index.module.scss";

const getHours = (tz: string) =>
  Array.from({ length: 12 }, (_, i) => (
    <div key={`${tz} - ${i}`} className={styles.hour}>
      <span className={styles.hour__text}>
        {i + 1} {tz}
      </span>
    </div>
  ));

const Hours: React.FC = () => (
  <div className={styles.hours}>
    {getHours("AM")}
    {getHours("PM")}
  </div>
);

export default Hours;
