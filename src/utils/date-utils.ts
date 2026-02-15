/**
 * Get the number of days in a month for a given year and month.
 * @param {number} year 
 * @param {number} month [0, 11] 
 * @returns {number | null}
 */
const daysOfMonth = (year: number, month: number) => {
    const isLeapYear = (year % 4 === 0 && year % 100!== 0);
    switch (month) {
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
            return 31;
        case 3:
        case 5:
        case 8:
        case 10:
            return 30;
        case 1:
            return isLeapYear? 29 : 28;
        default:
            return null;
    }
}

/**
 * Get the first day of the month for a given year and month.
 * @param {number} year 
 * @param {number} month [0, 11]
 * @returns {number | null} [0, 6]
 */
const firstDayOfMonth = (year: number, month: number) => {
    if (month < 0 || month > 11) return null;
    const date = new Date(year, month, 1);
    return date.getDay();
}

/**
 * Get the last day of the month for a given year and month.
 * @param {number} year 
 * @param {number} month [0, 11]
 * @returns {number | null} [0, 6]
 */
const lastDayOfMonth = (year: number, month: number) => {
    if (month < 0 || month > 11) return null;
    const date = new Date(year, month + 1, 0);  // equal to the -1 day of the next month
    return date.getDay();
}

/**
 * Get the exact day of the date for a given date.
 * @param {number} year 
 * @param {number} month [0, 11]
 * @param {number} date 
 * @returns {number | null} [0, 6]
 */
const dayOfDate = (year: number, month: number, date: number) => {
    if (month < 0 || month > 11) return null;
    const daysInMonth = daysOfMonth(year, month);
    if (daysInMonth === null || date < 1 || date > daysInMonth) return null;
    const dateObj = new Date(year, month, date);
    return dateObj.getDay();
}

/**
 * Judge if a given year, month, and date is today.
 * @param {number} year 
 * @param {number} month [0, 11]
 * @param {number} date
 * @returns {boolean}
 */
const isToday = (year: number | null, month: number | null, date: number | null): boolean => {
    if (!year ||!month ||!date) return false;
    const today = new Date();
    return today.getFullYear() === year &&
        today.getMonth() === month &&
        today.getDate() === date;
}

const getMonthTable = (year: number, month: number): (number | null)[][] => {
    const array: (number | null)[][] = [];
    const daysInMonth = daysOfMonth(year, month) as number;
    const firstDay = firstDayOfMonth(year, month) as number;
    let cnt = 1;
    for (let i = 0; i < 6; i++) {
        const row: (number | null)[] = [];
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) row.push(null);
            else if (cnt <= daysInMonth) {
                row.push(cnt);
                cnt ++;
            } else row.push(null);
        }
        array.push(row);
    }
    return array;
}

export {
    daysOfMonth,
    firstDayOfMonth,
    lastDayOfMonth,
    dayOfDate,
    isToday,
    getMonthTable,
}