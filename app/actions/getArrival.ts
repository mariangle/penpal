import axios from 'axios';

// This code is written with lots of guidance from ChatGPT

interface Country {
  latlng: [number, number];
}

interface ArrivalData {
  arrivalDate: Date | null;
  estimatedDeliveryDays: number;
}


export const calculateLetterArrival = async (country1: string, country2: string): Promise<ArrivalData> => {
  try {
    // Calculate the distance between the countries
    const distance = await calculateDistance(country1, country2);

    if (distance === null) {
      throw new Error('Failed to calculate distance');
    }

    // Calculate the travel time in days based on the distance
    const travelTimeInDays = calculateTravelTime(distance);

    // Calculate the estimated arrival date based on the current date and travel time
    const arrivalDate = addDays(new Date(), travelTimeInDays);

    return {
      arrivalDate,
      estimatedDeliveryDays: travelTimeInDays,
    };
  } catch (error) {
    console.error('Error calculating arrival date:', error);
    return {
      arrivalDate: null,
      estimatedDeliveryDays: 0,
    };
  }
};

const calculateDistance = async (country1: string, country2: string): Promise<number | null> => {
  try {
    // Fetch the coordinates of the countries
    const country1Coords = await fetchCountryCoordinates(country1);
    const country2Coords = await fetchCountryCoordinates(country2);

    if (!country1Coords || !country2Coords) {
      throw new Error('Failed to fetch country coordinates');
    }

    // Calculate the distance between the coordinates
    const distance = calculateDistanceBetweenCoords(country1Coords, country2Coords);

    return distance;
  } catch (error) {
    console.error('Error calculating distance:', error);
    return null;
  }
};

const fetchCountryCoordinates = async (country: string): Promise<[number, number] | null> => {
  try {
    // Fetch the country data and extract the coordinates
    const response = await axios.get<Country[]>(`https://restcountries.com/v3.1/name/${country}`);
    const countryCoords = response.data[0]?.latlng;

    return countryCoords || null;
  } catch (error) {
    console.error('Error fetching country coordinates:', error);
    return null;
  }
};

const calculateDistanceBetweenCoords = (coords1: [number, number], coords2: [number, number]): number => {
  // Calculate the distance between the coordinates using the haversine formula
  const earthRadiusKm = 6371; // Earth's radius in kilometers
  const [lat1, lon1] = coords1;
  const [lat2, lon2] = coords2;

  const dLat = degToRad(lat2 - lat1);
  const dLon = degToRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadiusKm * c;

  return distance;
};

const degToRad = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

const calculateTravelTime = (distance: number): number => {
  // Define the average travel speed in km per day
  const averageSpeed = 500; // km per day
  const additionalDay = 1;

  // Calculate the travel time in days
  const travelTime = distance / averageSpeed + additionalDay;

  return Math.ceil(travelTime); // Round up to the nearest whole day
};

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};