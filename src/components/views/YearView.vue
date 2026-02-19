<script setup lang="ts">
import { useGlobalStore } from '../../stores/global';
import { getMonthTable } from '../../utils/date-utils';
import { computed } from 'vue';

const global = useGlobalStore();
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];  // index: 0 - 11
const weekNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];  // index: 0 - 6
const allMonthTables = computed(() => {
    const arr = [];
    for (let i = 0; i < 12; i++) arr.push(getMonthTable(global.thisYear, i));
    return arr;
});
</script>

<template>
    <div class="year-view">
        <h1 class="title">Year: {{ global.thisYear }}</h1>
        <main class="main-area">
            <div class="month-table" v-for="(monthTable, n) in allMonthTables" :key="n">
                <h2 class="month-name">{{ monthNames[n] }}</h2>
                <div class="month-header">
                    <span class="week"  v-for="(week, weekIdx) in weekNames" :key="weekIdx">{{ week }}</span>
                </div>
                <div class="month-body">
                    <div class="row" v-for="(row, rowIdx) in monthTable" :key="rowIdx">
                        <span class="day" v-for="(day, dayIdx) in row" :key="dayIdx">
                            {{ day === null ? '' : day }}
                        </span>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped lang="scss">
@use '../../assets/mixin.scss' as *;
.year-view {
    @include grid-layout($rows: 1fr 18fr, $columns: 1fr);
    width: 100%;
    height: 100%;
    padding: 10px;
}
.title {
    justify-self: start;
    font-size: 2.2rem;
    font-weight: bold;
    color: #333;
    text-align: center;
}
.main-area {
    @include grid-layout($rows: repeat(3, 1fr), $columns: repeat(4, 1fr), $gap: 10px);
}

.month-table {
    @include flex-layout($direction: column, $main-align: flex-start);
    padding: 10px;
    padding-top: 20px;
    border: 1px solid #ccc;
    background-color: #fff;
    transition: box-shadow 0.3s ease;
    &:hover {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }
}
.month-name {
    font-size: 1.8rem;
    color: #333;
    text-align: center;
}
.month-header {
    @include flex-layout($main-align: space-evenly);
    width: 100%;
    margin-top: 10px;
    border-bottom: 1px solid #ccc;
    .week {
        width: 14.28%;
        font-size: 1.4rem;
        color: #333;
        text-align: center;
    }
}
.month-body {
    @include flex-layout($direction: column);
    width: 100%;
    .row {
        @include flex-layout($main-align: space-evenly);
        width: 100%;
        margin-top: 5px;
    }
    .day {
        width: 14.28%;
        font-size: 1.2rem;
        color: #666;
        text-align: center;
    }
}
</style>