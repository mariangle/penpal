import { differenceInYears } from 'date-fns';

export const getAge = (dob: Date) => {
    const now = new Date();
    const parsedDob = new Date(dob);
    const age = differenceInYears(now, parsedDob);
  
    return age;
  };