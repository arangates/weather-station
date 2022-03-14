import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from "components/Header";
import CurrentWeather from 'components/CurrentWeather';
import Forecast from 'components/Forecast';
import Spinner from 'components/Spinner';
import Error from 'components/Error';
import { AppStore } from 'store/store';
import { fetchWeather } from 'store/fetchWeather';
import usePosition from 'hooks/usePosition';

import 'App.css'

const App = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const GeolocationPosition = usePosition();

  const { loading, isError } = useSelector((state: AppStore) => ({
    loading: state.app.isLoading,
    isError: state.weather.isError,
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
      <Header onRefresh={() => getOrRefreshData(GeolocationPosition)} />
      {isError ? <Error reason={error} /> : <div className='container'>
        <CurrentWeather />
        <Forecast />
      </div>}

    </>
  );
};

export default App;

