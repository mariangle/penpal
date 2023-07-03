export const getCountry = () => {
  return fetch('https://ipapi.co/json/')
    .then((response) => response.json())
    .then((data) => {
      const country = data.country_name;
      return country;
    })
    .catch((error) => {
      console.error('Error retrieving IP geolocation:', error);
    });
};