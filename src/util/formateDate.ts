export const FormatDate = (dateString: string): string => {

    // Make the date into a short format like "April 21, 2021"
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const dateFormatted = `${month} ${date.getDate()}, ${date.getFullYear()}`;

    return dateFormatted;
};