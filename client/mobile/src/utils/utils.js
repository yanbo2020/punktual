import { format, formatDistance } from "date-fns";

const formatTime = (date, ago) => {
	if (ago) {
		return formatDistance(new Date(date), new Date());
	} else {
		return format(new Date(date), "EEEE MMMM do yyyy, h:mm a");
	}
};

const calculateDistance = (location1, location2) => {
	const R = 6371e3; // metres
	const φ1 = (location1.latitude * Math.PI) / 180; // φ, λ in radians
	const φ2 = (location2.latitude * Math.PI) / 180;
	const Δφ = ((location2.latitude - location1.latitude) * Math.PI) / 180;
	const Δλ = ((location2.longitude - location1.longitude) * Math.PI) / 180;

	const a =
		Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
		Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	const d = R * c; // in metres
	return d;
};

export { formatTime, calculateDistance };
