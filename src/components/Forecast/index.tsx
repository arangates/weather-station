import React from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../../store/store";
import ForecastItem from "./ForecastItem";

import styles from "./Forecast.module.css";

const Forecast: React.FC = () => {
  const { forecast, isInitial } = useSelector((state: AppStore) => ({
    loading: state.app.isLoading,
    isInitial: state.app.isInitial,
    forecast: state.weather.extendedWeatherData,
  }));

  if (isInitial) return <></>;

  return (
    <div className={styles.forecastContainer}>
      {forecast.slice(0, 5).map((item, i) => {
        return (
          <ForecastItem
            key={i}
            day={item.day}
            high={item.temp.temp_max}
            low={item.temp.temp_min}
            icon={item.icon}
          />
        );
      })}
    </div>
  );
};

export default Forecast;
