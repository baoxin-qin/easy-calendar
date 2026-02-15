<script setup lang="ts">
import { useGlobalStore } from '../stores/global';
import { YearView, MonthView, WeekView, DayView } from '.';

const global = useGlobalStore();
</script>

<template>
    <div class="views">
        <year-view v-show="global.view === 'year'"/>
        <month-view v-show="global.view ==='month'"/>
        <week-view v-show="global.view === 'week'"/>
        <day-view v-show="global.view === 'day'"/>
    </div>
</template>

<style scoped lang="scss">
.views {
    grid-row: 1 / -1;
	grid-column: 2 / -1;
    border: none;
    border-radius: 10px;
    background-color: #f8f8f8;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
    overflow: hidden;
}
</style>