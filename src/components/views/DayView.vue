<script setup lang="ts">
import { useGlobalStore } from '../../stores/global';

const global = useGlobalStore();
</script>

<template>
    <div class="day-view">
        <h1 class="title">Today: {{ global.todayObj.getDate() }}</h1>
        <ul class="main-area">
            <li class="time" v-for="t in 24" :key="t">
                {{ (t-1).toString().padStart(2, '0') }} : 00
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
@use '../../assets/mixin.scss' as *;
.day-view {
    @include grid-layout($rows: 1fr 18fr, $columns: 1fr);
    width: 100%;
    height: 100%;
    padding: 10px;
    overflow: hidden;
}
.title {
    justify-self: start;
    font-size: 2.2rem;
    font-weight: bold;
    color: #333;
}
.main-area {
    @include flex-layout($direction: column, $main-align: flex-start);
    overflow: auto;
}
.time {
    width: 100%;
    height: 50px;
    flex-shrink: 0;
    margin: 5px 0;
    padding: 5px;
    border: none;
    border-radius: 5px;
    background-color: #fff;
    font-size: 1.6rem;
    color: #666;
    transition: box-shadow 0.3s ease;

    &:hover {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    }
}
</style>