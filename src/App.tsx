import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Forecast from './components/Forecast/Forecast';
import Spinner from './components/Spinner/Spinner';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';

import { AppStore } from './store/store';
import { fetchWeather } from './store/fetchWeather';
import usePosition from './hooks/usePosition';

const App = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const GeolocationPosition = usePosition();

  const { loading } = useSelector((state: AppStore) => ({
    loading: state.app.isLoading,
  }));

  useEffect(() => {
    if (!navigator || !navigator.geolocation) {
      setError('Geolocation is not supported');
      return;
    }
    if (GeolocationPosition) {
      dispatch(
        fetchWeather({
          lat: GeolocationPosition?.coords.latitude,
          lng: GeolocationPosition?.coords.longitude,
        })
      );
    }
  }, [GeolocationPosition, dispatch]);

  return (
    <>
      {loading && <Spinner />}
      {error && <span>{error}</span>}
      <div>
        <>
          <code>
            latitude: {GeolocationPosition?.coords.latitude}<br />
            longitude: {GeolocationPosition?.coords.longitude}<br />
          </code>
        </>
      </div>
      <CurrentWeather />
      <Forecast />
    </>
  );
};

export default App;

