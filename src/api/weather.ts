const baseUrl = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (coords: {
	lat: number;
	lng: number;
}) => {
	let url = '';
	if (typeof coords === 'object') {
		url = `${baseUrl}/weather?lat=${coords.lat}&lon=${coords.lng}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;
	}
	return await (await fetch(url)).json();
};

export const fetchExtendedForecastData = async (coords: {
	lat: number;
	lng: number;
}) => {
	let url = '';
	if (typeof coords === 'object') {
		url = `${baseUrl}/forecast/daily?lat=${coords.lat}&lon=${coords.lng}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;
	}

	return await (await fetch(url)).json();
};
