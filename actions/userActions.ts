import { differenceInYears } from 'date-fns';

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

export const getAge = (dob: string) => {
  const now = new Date();
  const parsedDob = new Date(dob);
  const age = differenceInYears(now, parsedDob);

  return age;
};