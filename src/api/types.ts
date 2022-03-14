export type WeatherData = {
  weather: {
    description: string;
    icon: string;
  };
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
};

export type ExtendedForecastData = {
  day: string;
  icon: string;
  temp: {
    temp_min: number;
    temp_max: number;
  };
};
