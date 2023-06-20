import { differenceInYears, differenceInMonths, differenceInWeeks, differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';

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
