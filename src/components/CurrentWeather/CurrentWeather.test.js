import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import CurrentWeather from "components/CurrentWeather";
import weatherReducer from "store/reducers/weatherReducer";
import "@testing-library/jest-dom/extend-expect";
import { render, getByText } from "@testing-library/react";

test("can render CurrentWeather with custom initial state", () => {
  const description = "Clouds";
  const state = {
    weather: {
      weatherData: {
        weather: {
          description: description,
          icon: "04d",
        },
        main: {
          temp: 11.39,
          temp_min: 9.97,
          temp_max: 12.36,
        },
      },
    },
    app: {
      isInitial: false,
      isError: false,
    },
  };
  const store = createStore(weatherReducer, state);
  const { container } = render(
    <Provider store={store}>
      <CurrentWeather />
    </Provider>
  );
  const node = getByText(container, description);
  expect(node).toBeInTheDocument();
  expect(container.firstChild).toHaveClass("currentWeather");
});

test("CurrentWeather does not render when there is no data", () => {
  const store = createStore(weatherReducer, {
    weather: {},
    app: {
      isInitial: true,
      isError: false,
    },
  });
  const { container } = render(
    <Provider store={store}>
      <CurrentWeather />
    </Provider>
  );
  expect(container.firstChild).toBe(null);
});
