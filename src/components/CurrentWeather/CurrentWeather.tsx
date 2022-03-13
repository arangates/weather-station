import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppStore } from '../../store/store';

import './CurrentWeather.module.css'

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
    <div className="App">
      <header className="App-header">
        <img src={`/images/${currentWeather?.weather?.icon}.png`} className="weather-status" alt="weather status" />
        <p>
          {currentWeather.weather.description}
        </p>
        <p>
          {currentWeather.main.temp}
        </p>
        <p>
          min. {currentWeather.main.temp_min}°C / max. {currentWeather.main.temp_max}°C
        </p>
      </header>
    </div>
  );
};

export default CurrentWeather;
