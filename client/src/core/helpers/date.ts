/**
 * Format a Date to YYYY-MM-DD_HH-MM.
 * @param date A Date object to format
 * @return The formatted string
 */
const getDateYYYYMMDDHHMM = (date: Date): string => {
    let mo = date.getMonth() + 1; // getMonth() is zero-based
    let dd = date.getDate();
    let hh = date.getHours();
    let mi = date.getMinutes();

    return [date.getFullYear(),
        '-',
        (mo>9 ? '' : '0') + mo,
        '-',
        (dd>9 ? '' : '0') + dd,
        '_',
        (hh>9 ? '' : '0') + hh,
        '-',
        (mi>9 ? '' : '0') + mi
    ].join('');
};

export default getDateYYYYMMDDHHMM;