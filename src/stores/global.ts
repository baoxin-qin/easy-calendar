import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { daysOfMonth, firstDayOfMonth } from "../utils/date-utils";

export const useGlobalStore = defineStore('global', () => {
    // state
    const theme = ref<'light' | 'dark'>('light');
    const dateObj = ref<Date>(new Date());
    const todayObj = ref<Date>(new Date()); // backup for today

    // getters
    const thisYear = computed(() => dateObj.value.getFullYear());
    const thisMonth = computed(() => dateObj.value.getMonth());  // 0-11
    const thisDate = computed(() => dateObj.value.getDate());
    const thisDay = computed(() => dateObj.value.getDay());  // 0-6, 0 is Sunday
    const monthArray = computed(() => {
        const firstDay = firstDayOfMonth(thisYear.value, thisMonth.value) || 0;  // should not be null
        const days = daysOfMonth(thisYear.value, thisMonth.value) || 31;  // should not be null
        const arr = [];
        let cnt = 1;
        for (let i = 0; i < 6; i++) {
            const row = [];
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) row.push(null);
                else if (cnt <= days) {
                    row.push(cnt);
                    cnt ++;
                } else row.push(null);
            }
            arr.push(row);
        }
        return arr;
    });
    
    // actions
    const setPrevMonth = () => {
        const prevMonth = new Date(dateObj.value.getFullYear(), dateObj.value.getMonth() - 1, 1);
        dateObj.value = prevMonth;
    };
    const setNextMonth = () => {
        const nextMonth = new Date(dateObj.value.getFullYear(), dateObj.value.getMonth() + 1, 1);
        dateObj.value = nextMonth;
    };

    return {
        theme, dateObj, todayObj,
        thisYear, thisMonth, thisDate, thisDay, monthArray,
        setPrevMonth, setNextMonth,
    }
})