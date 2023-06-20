import { differenceInYears, differenceInMonths, differenceInWeeks, differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';


export const formatDate = (date: Date): string => {
    const parsedDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
  
    return parsedDate.toLocaleString(undefined, options);
  };

export const formatFullDate = (date: Date): string => {
    const parsedDate = new Date(date);
    const hours = parsedDate.getHours().toString().padStart(2, '0');
    const minutes = parsedDate.getMinutes().toString().padStart(2, '0');
    const day = parsedDate.getDate().toString().padStart(2, '0');
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = parsedDate.getFullYear();
    
    return `${hours}:${minutes} ${day}-${month}-${year}`;
  };


export const getTimeElapsed = (timestamp: Date) => {
    const lastOnline = new Date(timestamp);
    const now = new Date();
    const years = differenceInYears(now, lastOnline);
    const months = differenceInMonths(now, lastOnline);
    const weeks = differenceInWeeks(now, lastOnline);
    const days = differenceInDays(now, lastOnline);
    const hours = differenceInHours(now, lastOnline);
    const minutes = differenceInMinutes(now, lastOnline);

    if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (months > 0) {
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (weeks > 0) {
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return "Less than a minute ago";
    }
};
