const baseUrl = 'https://api.openweathermap.org/data/2.5';
const units = 'metric';
const lang = 'nl';
export const fetchWeatherData = async (
	coords: {
		lat: number;
		lng: number;
	},
	path: string
) => {
	let url = '';
	if (typeof coords === 'object') {
		url = `${baseUrl}/${path}?lat=${coords.lat}&lon=${coords.lng}&units=${units}&lang=${lang}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;
	}
	const response = await fetch(url);
	return await response.json();
};


