import React from "react";

import styles from "./Forecast.module.css";

interface IForecastItemProps {
  day: string;
  high: number;
  low: number;
  icon: string;
}
const ForecastItem: React.FC<IForecastItemProps> = ({
  day,
  icon,
  high,
  low,
}) => {
  return (
    <div className={styles.forecastItem}>
      <span className={styles.day}>{day}</span>
      <img width="30" src={`/images/${icon}.png`} alt="weather status" />
      <div>
        <span>{Math.round(low)}&deg;C</span>
        <span className={styles.maxTemp}>{Math.round(high)}&deg;C</span>
      </div>
    </div>
  );
};

export default ForecastItem;
