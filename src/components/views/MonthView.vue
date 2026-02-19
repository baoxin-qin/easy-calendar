<script setup lang="ts">
import { computed } from 'vue';
import { useGlobalStore } from '../../stores/global';
import { getMonthTable } from '../../utils/date-utils';

const global = useGlobalStore();
const monthList = computed(() => { 
    const arr = getMonthTable(global.thisYear, global.thisMonth);
    const list = [];
    for (let i = 0; i < arr.length; i++)
        for (let j = 0; j < arr[i]!.length; j++)
            list.push(arr[i]![j]);
    return list;
});
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];  // index: 0-11
</script>

<template>
    <div class="month-view">
        <h1 class="title">Month: {{ monthNames[global.thisMonth] }}</h1>
        <main class="main-area">
            <div class="cell" v-for="(date, idx) in monthList" :key="idx" :class="{valid: date !== null}">
                <h2 class="cell-name">{{ date }}</h2>
            </div>
        </main>
    </div>
</template>

<style scoped lang="scss">
@use '../../assets/mixin.scss' as *;
.month-view {
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
}
.main-area {
    @include grid-layout($rows: repeat(6, 1fr), $columns: repeat(7, 1fr), $gap: 5px);
}
.cell {
    padding: 10px 5px;
    background-color: transparent;
    .cell-name {
        font-size: 1.6rem;
        color: #666;
    }
}
.cell.valid {
    background-color: #fff;
    transition: box-shadow 0.3s ease;
    &:hover {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    }
}
</style>