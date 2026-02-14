/**
 * Get the Chinese Zodiac year for a given year.
 * @param {number} year 
 * @returns {string | null}
 */
const getZodiacByYear = (year: number): string | null => {
    if (!year) return null;
    const ChineseZodiac = [
        'Mouse', 'Cattle', 'Tiger', 'Rabbit',
        'Dragon', 'Snake', 'Horse', 'Sheep',
        'Monkey', 'Chicken', 'Dog', 'Pig',
    ]; // index form 0 to 11
    // base: 2000 is Dragon Zodiac Year
    const baseYear = 2000;
    const baseIndex = 4; // Dragon
    let gap = year - baseYear;
    if (gap >= 0) {
        const index = (baseIndex + gap % 12) % 12;
        return ChineseZodiac[index]!;
    } else {
        while (gap < 0) gap += 12;
        const index = (baseIndex + gap % 12) % 12;
        return ChineseZodiac[index]!;
    }
}

/**
 * Get the Zodiac sign for a given month and date.
 * @param {number} month 
 * @param {number} date 
 * @returns {string | null}
 */
const getZodiacByMonth = (month: number, date: number): string | null => {
    if (!month || month < 1 || month > 12) return null;
    if (!date || date < 1 || date > 31) return null;
    const zodiacMap = [
        {name: 'Aquarius', start: [1, 20], end: [2, 18]},
        {name: 'Pisces', start: [2, 19], end: [3, 20]},
        {name: 'Aries', start: [3, 21], end: [4, 19]},
        {name: 'Taurus', start: [4, 20], end: [5, 20]},
        {name: 'Gemini', start: [5, 21], end: [6, 21]},
        {name: 'Cancer', start: [6, 22], end: [7, 22]},
        {name: 'Leo', start: [7, 23], end: [8, 22]},
        {name: 'Virgo', start: [8, 23], end: [9, 22]},
        {name: 'Libra', start: [9, 23], end: [10, 23]},
        {name: 'Scorpio', start: [10, 24], end: [11, 22]},
        {name: 'Sagittarius', start: [11, 23], end: [12, 21]},
        {name: 'Capricorn', start: [12, 22], end: [1, 19]},
    ];
    for (const zodiac of zodiacMap) {
        const [startMonth, startDay] = zodiac.start;
        const [endMonth, endDay] = zodiac.end;
        
        if (startMonth! <= endMonth!) {
            if ((month === startMonth! && date >= startDay!) || 
                (month === endMonth! && date <= endDay!) ||
                (month > startMonth! && month < endMonth!)) {
                return zodiac.name;
            }
        } else {
            if ((month === startMonth! && date >= startDay!) || 
                (month === endMonth! && date <= endDay!)) {
                return zodiac.name;
            }
        }
    }
    return null;
}

export {
    getZodiacByYear,
    getZodiacByMonth,
}