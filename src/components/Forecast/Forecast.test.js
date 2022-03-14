import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import weatherReducer from "store/reducers/weatherReducer";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Forecast from ".";

test("can render Forecast with custom initial state", () => {
  const state = {
    app: {
      isInitial: false,
      isLoading: false,
    },
    weather: {
      extendedWeatherData: [
        {
          day: "dinsdag",
          temp: {
            temp_max: 12.02,
            temp_min: 7.2,
          },
          icon: "04d",
        },
        {
          day: "woensdag",
          temp: {
            temp_max: 12.76,
            temp_min: 6.58,
          },
          icon: "04d",
        },
        {
          day: "donderdag",
          temp: {
            temp_max: 15.21,
            temp_min: 5.26,
          },
          icon: "01d",
        },
        {
          day: "vrijdag",
          temp: {
            temp_max: 13.25,
            temp_min: 6.9,
          },
          icon: "04d",
        },
        {
          day: "zaterdag",
          temp: {
            temp_max: 14.05,
            temp_min: 5.12,
          },
          icon: "01d",
        },
        {
          day: "zondag",
          temp: {
            temp_max: 12.78,
            temp_min: 3,
          },
          icon: "01d",
        },
        {
          day: "maandag",
          temp: {
            temp_max: 10.42,
            temp_min: 1.47,
          },
          icon: "01d",
        },
      ],
    },
  };
  const store = createStore(weatherReducer, state);
  const { container } = render(
    <Provider store={store}>
      <Forecast />
    </Provider>
  );
  expect(container.firstChild).toHaveClass("forecastContainer");
});

test("Forecast does not render when there is no data", () => {
  const store = createStore(weatherReducer, {
    weather: {
      extendedWeatherData: [],
    },
    app: {
      isInitial: true,
      isError: false,
    },
  });
  const { container } = render(
    <Provider store={store}>
      <Forecast />
    </Provider>
  );
  expect(container.firstChild).toBe(null);
});
