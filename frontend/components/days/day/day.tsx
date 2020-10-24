import React from "react";
import styles from "./index.module.scss";

interface Props {
  date: number;
  index: number;
}

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const Day: React.FC<Props> = ({ date, index }) => (
  <div className={styles.day}>
    <div className={styles.name}>{days[index]}</div>
    <div className={styles.date}>{date + index}</div>
  </div>
);
export default Day;
