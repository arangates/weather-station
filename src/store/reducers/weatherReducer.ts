import { createSlice } from "@reduxjs/toolkit";
import { ExtendedForecastData, WeatherData } from "api/types";
import { fetchWeather, transformWeatherData } from "../fetchWeather";

export type WeatherState = {
  weatherData: WeatherData;
  extendedWeatherData: ExtendedForecastData[];
  isError: boolean;
};

const initialState: WeatherState = {
  weatherData: {
    main: {
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
    weather: {
      description: "",
      icon: "",
    },
  },
  extendedWeatherData: [],
  isError: false,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.fulfilled, (state, action) => {
        const res = transformWeatherData(action.payload);
        state.weatherData = res.weather;
        state.extendedWeatherData = res.forecast;
        state.isError = false;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isError = true;
      });
  },
});

export default weatherSlice.reducer;
