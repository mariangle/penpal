export const useFormatDate = (date: string): string => {
    const parsedDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
  
    return parsedDate.toLocaleString(undefined, options);
  };
  
  export const useFormatFullDate = (date: string): string => {
    const parsedDate = new Date(date);
    const hours = parsedDate.getHours().toString().padStart(2, '0');
    const minutes = parsedDate.getMinutes().toString().padStart(2, '0');
    const month = parsedDate.toLocaleString('default', { month: 'short' });
    const day = parsedDate.getDate();
    const year = parsedDate.getFullYear();
  
    return `${hours}:${minutes} ${month} ${day} ${year}`;
  };
  