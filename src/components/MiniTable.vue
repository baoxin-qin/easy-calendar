<script setup lang="ts">
import { useGlobalStore } from '../stores/global';
import { isToday, getMonthTable } from '../utils/date-utils';
import { Icons } from '../assets/Icons';
import { ref, computed } from 'vue';

const global = useGlobalStore();
const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dateObj = ref<Date>(new Date());

const thisYear = computed(() => dateObj.value.getFullYear());
const thisMonth = computed(() => dateObj.value.getMonth());
const monthArray = computed(() => {
    return getMonthTable(thisYear.value, thisMonth.value);
});

const togglePrevMonth = () => {
    const prevMonth = new Date(dateObj.value.getFullYear(), dateObj.value.getMonth() - 1, 1);
    dateObj.value = prevMonth;
};
const toggleNextMonth = () => {
    const nextMonth = new Date(dateObj.value.getFullYear(), dateObj.value.getMonth() + 1, 1);
    dateObj.value = nextMonth;
};
</script>

<template>
    <div class="mini-table">
        <div class="table-menu">
            <span class="title">
                {{ thisYear }} - {{ thisMonth + 1 }}
            </span>
            <button class="btn" @click="togglePrevMonth">
                <Icons.ArrowUp theme="outline" size="20" fill="#333" />
            </button>
            <button class="btn" @click="toggleNextMonth">
                <Icons.ArrowDown theme="outline" size="20" fill="#333" />
            </button>
            <button class="btn" @click="dateObj = global.todayObj">
                <Icons.Home theme="outline" size="20" fill="#333" />
            </button>
        </div>
        <div class="table-header">
            <span v-for="(week, idx) in weeks" :key="idx" class="week">{{ week }}</span>
        </div>
        <div class="table-body">
            <div v-for="(row, rowIdx) in monthArray" :key="rowIdx" class="row">
                <span 
                    v-for="(day, dayIdx) in row" 
                    :key="dayIdx" 
                    class="day" 
                    :class="{today: isToday(thisYear, thisMonth, day)}"
                >
                    {{ day === null ? '' : day }}
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../assets/mixin.scss' as *;
.mini-table {
    @include flex-layout($direction: column, $main-align: flex-start);
    grid-row: 1 / 2;
	grid-column: 1 / 2;
    border: none;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
}
.table-menu {
    @include flex-layout($main-align: space-evenly);
    width: 100%;
    margin-top: 10px;

    .title {
        font-size: 1.6rem;
        font-weight: bold;
        color: #333;
    }
    .btn {
        border: none;
        background-color: transparent;
        cursor: pointer;
    }
}
.table-header {
    @include flex-layout($main-align: space-evenly);
    width: 100%;
    margin-top: 10px;
    padding-bottom: 1px;
    border-bottom: 1px solid #ccc;
    .week {
        text-align: center;
        font-size: 1.4rem;
        font-weight: bold;
        color: #333;
    }
}
.table-body {
    @include flex-layout($direction: column, $main-align: flex-start);
    width: 100%;
    .row {
        @include flex-layout($main-align: space-evenly);
        width: 100%;
        margin-top: 10px;
    }
    .day {
        width: 14.28%;
        text-align: center;
        font-size: 1.4rem;
        color: #666;
    }
    .day.today {
        font-size: 1.4rem;
        font-weight: bold;
        color: #007bff;
    }
}
</style>