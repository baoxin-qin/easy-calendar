<script setup lang="ts">
import { Icons } from '../assets/Icons';
import { computed } from 'vue';
import { getZodiacByYear, getZodiacByMonth } from '../utils/extension-utils';
import { useGlobalStore } from '../stores/global';

const global = useGlobalStore();
const zodiacYear = computed(() => getZodiacByYear(global.todayObj.getFullYear()));
const zodiacMonth = computed(() => getZodiacByMonth(global.todayObj.getMonth() + 1, global.todayObj.getDate()));
</script>

<template>
    <div class="extension">
        <ul class="extension-list">
            <li class="extension-item">
                <Icons.Fireworks theme="outline" fill="#333" size="20" />
                <span class="item-name">Zodiac Year: {{ zodiacYear }}</span>
            </li>
            <li class="extension-item">
                <Icons.TwoTriangles theme="outline" fill="#333" size="20" />
                <span class="item-name">Today's Zodiac: {{ zodiacMonth }}</span>
            </li>
            <li class="extension-item">
                <Icons.Platte theme="outline" fill="#333" size="20" />
                <span class="item-name">Lucky Color: Scalar Lavender</span>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
@use '../assets/mixin.scss' as *;
.extension {
    grid-row: 2 / -1;
	grid-column: 1 / 2;
    border: none;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
}
.extension-list {
    @include flex-layout($direction: column, $main-align: flex-start, $cross-align: flex-start);
    width: 100%;
    margin: 10px 10px;
}
.extension-item {
    @include flex-layout();
    list-style: none;
    margin: 10px 0;

    * {margin: 0 5px;}
}
</style>