export const getCountry = (): Promise<string> => {
    return fetch('http://ip-api.com/json') 
      .then((response) => response.json())
      .then((data) => {
        const country = data.country;
        return country;
      })
      .catch((error) => {
        console.error('Error retrieving IP geolocation:', error);
      });
  };