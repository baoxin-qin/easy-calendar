<script setup lang="ts">
import { computed } from 'vue';
import { useGlobalStore } from '../../stores/global';
import { dayOfDate } from '../../utils/date-utils';

const global = useGlobalStore();
const weekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = computed(() => dayOfDate(global.todayObj.getFullYear(), global.todayObj.getMonth(), global.todayObj.getDate()));
</script>

<template>
    <div class="week-view">
        <h1 class="title">Today: {{ weekNames[today!] }}</h1>
        <ul class="main-area">
            <li class="item" v-for="n in 7" :key="n">
                {{ weekNames[n-1] }}
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
@use '../../assets/mixin.scss' as *;
.week-view {
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
    @include grid-layout($rows: repeat(7, 1fr), $columns: 1fr, $gap: 10px);
}
.item {
    list-style: none;
    border: none;
    border-radius: 5px;
    padding: 10px;
    background-color: #fff;
    font-size: 1.8rem;
    color: #666;
    transition: box-shadow 0.3s ease;
    &:hover {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    }
}
</style>