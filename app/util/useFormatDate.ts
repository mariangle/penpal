export const useFormatDate = (date: string): string => {
    const parsedDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
  
    return parsedDate.toLocaleString(undefined, options);
  };
  