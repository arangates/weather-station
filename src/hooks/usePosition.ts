import { useEffect, useState } from 'react';

const defaultSettings = {
	enableHighAccuracy: true,
	timeout: 10000,
	maximumAge: 0,
};

export default function usePosition(): GeolocationPosition | undefined {
	const [currentPosition, setCurrentPosition] =
		useState<GeolocationPosition>();
	const onSuccess = (position: GeolocationPosition) => {
		setCurrentPosition(position);
	};

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			onSuccess,
			(error) => {
				console.error(error);
			},
			defaultSettings
		);
	}, []);

	return currentPosition;
}
