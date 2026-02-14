<script setup lang="ts">
import { useGlobalStore } from '../stores/global';
import { isToday } from '../utils/date-utils';
import { Icons } from '../assets/Icons';

const global = useGlobalStore();
const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
</script>

<template>
    <div class="mini-table">
        <div class="table-menu">
            <span class="title">
                {{ global.thisYear }}-{{ global.thisMonth + 1 }}-{{ global.thisDate }}
            </span>
            <button class="btn" @click="global.setPrevMonth">
                <Icons.ArrowUp theme="outline" size="20" fill="#333" />
            </button>
            <button class="btn" @click="global.setNextMonth">
                <Icons.ArrowDown theme="outline" size="20" fill="#333" />
            </button>
            <button class="btn" @click="global.dateObj = global.todayObj">
                <Icons.Home theme="outline" size="20" fill="#333" />
            </button>
        </div>
        <div class="table-header">
            <span v-for="(week, idx) in weeks" :key="idx" class="week">{{ week }}</span>
        </div>
        <div class="table-body">
            <div v-for="(row, rowIdx) in global.monthArray" :key="rowIdx" class="row">
                <span 
                    v-for="(day, dayIdx) in row" 
                    :key="dayIdx" 
                    class="day" 
                    :class="{today: isToday(global.thisYear, global.thisMonth, day)}"
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