import { createAsyncThunk } from '@reduxjs/toolkit';
import { ExtendedForecastData, WeatherData } from '../api/types';
import { fetchExtendedForecastData, fetchWeatherData } from '../api/weather';
import { getNextSevenDays } from '../utils/dateUtils';
import { setIsInitial, setIsLoading } from './reducers/appReducer';

export const fetchWeather = createAsyncThunk(
	'weather/fetchWeather',
	async (
		coords: { lat: number; lng: number },
		{ dispatch, rejectWithValue }
	) => {
		dispatch(setIsLoading(true));

		try {
			const res = await Promise.all([
				fetchWeatherData(coords),
				fetchExtendedForecastData(coords),
			]);
			dispatch(setIsLoading(false));

			if (res[0].cod === 200) {
				dispatch(setIsInitial(false));
				return res;
			}
			return rejectWithValue(res[0].message);
		} catch {
			dispatch(setIsLoading(false));
			return rejectWithValue('Error');
		}
	}
);

export const transformWeatherData = (
	res: any
): {
	weather: WeatherData;
	forecast: ExtendedForecastData[];
} => {
	const weather = res[0] as WeatherData;
	const forecast: ExtendedForecastData[] = [];

	weather.weather = res[0].weather[0];


	const next7Days = getNextSevenDays();

	res[1].list.forEach((i: any, index: number) => {
		forecast.push({
			day: next7Days[index],
			temp: {
				temp_max: i.temp.max,
				temp_min: i.temp.min,
			},
			icon: i.weather[0].icon,
		});
	});

	return {
		weather,
		forecast,
	};
};

