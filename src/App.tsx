import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Forecast from './components/Forecast/Forecast';
import Spinner from './components/Spinner/Spinner';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';

import { AppStore } from './store/store';
import { fetchWeather } from './store/fetchWeather';
import usePosition from './hooks/usePosition';

import './App.css'

const App = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const GeolocationPosition = usePosition();

  const { loading } = useSelector((state: AppStore) => ({
    loading: state.app.isLoading,
  }));

  const getOrRefreshData = React.useCallback((GeolocationPosition) => {
    dispatch(
      fetchWeather({
        lat: GeolocationPosition?.coords.latitude,
        lng: GeolocationPosition?.coords.longitude,
      })
    );
  }, [dispatch]);
  useEffect(() => {
    if (!navigator || !navigator.geolocation) {
      setError('Geolocation is not supported');
      return;
    }
    if (GeolocationPosition) {
      getOrRefreshData(GeolocationPosition)
    }
  }, [GeolocationPosition, getOrRefreshData]);

  return (
    <>
      {loading && <Spinner />}
      {error && <span>{error}</span>}
      <button onClick={() => getOrRefreshData(GeolocationPosition)}>
        Refresh
      </button>
      <CurrentWeather />
      <Forecast />
    </>
  );
};

export default App;

