import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppStore } from '../../store/store';

import styles from './CurrentWeather.module.css'

const CurrentWeather: React.FC = () => {
  const { isInitial, isError, currentWeather } = useSelector((store: AppStore) => ({
    currentWeather: store.weather.weatherData,
    isInitial: store.app.isInitial,
    isError: store.weather.isError,
  }));
  useEffect(() => {
    if (isError) {
      console.log('Cannot load weather for this place');
    }
  }, [isError]);

  if (isInitial) return <></>;

  return (
    <div className={styles.currentWeather}>
      <img src={`/images/${currentWeather?.weather?.icon}.png`} className={styles.weatherStatus} alt="Current weather status" />
      <strong>
        {currentWeather.weather.description.charAt(0).toUpperCase() + currentWeather.weather.description.slice(1)}
      </strong>
      <strong style={{ "marginTop": "1rem" }}>
        {Math.round(currentWeather.main.temp)} &deg;C
      </strong>
      <small className='temp-range'>
        min. {Math.round(currentWeather.main.temp_min)}°C / max. {Math.round(currentWeather.main.temp_max)}°C
      </small>
    </div>
  );
};

export default CurrentWeather;
