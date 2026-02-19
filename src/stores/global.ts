import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { getMonthTable } from "../utils/date-utils";

export const useGlobalStore = defineStore('global', () => {
    // state
    const theme = ref<'light' | 'dark'>('light');
    const dateObj = ref<Date>(new Date());
    const todayObj = ref<Date>(new Date()); // backup for today
    const view = ref<'year' | 'month' | 'week' | 'day'>('month');

    // getters
    const thisYear = computed(() => todayObj.value.getFullYear());
    const thisMonth = computed(() => todayObj.value.getMonth());  // 0-11
    const thisDate = computed(() => todayObj.value.getDate());
    const thisDay = computed(() => todayObj.value.getDay());  // 0-6, 0 is Sunday
    const monthArray = computed(() => {
        return getMonthTable(thisYear.value, thisMonth.value);
    });
    
    // actions
    const setView = (v: 'year' |'month' | 'week' | 'day') => {
        view.value = v;
    };

    return {
        theme, dateObj, todayObj, view,
        thisYear, thisMonth, thisDate, thisDay, monthArray,
        setView,
    }
})