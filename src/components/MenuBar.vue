<script setup lang="ts">
import { Icons } from '../assets/Icons';
import { NButton, NIcon, NSwitch } from 'naive-ui';
import { ref, useTemplateRef, watch } from 'vue';
import { useGlobalStore } from '../stores/global';

const global = useGlobalStore();
const inputValue = ref<string>('');
const searchBoxRef = useTemplateRef<HTMLDivElement>('searchBoxRef');
watch(inputValue, (value) => {
    const timer = setTimeout(() => {
        if (searchBoxRef.value) {
            if (value.trim() === '') {
                searchBoxRef.value.style.visibility = 'hidden';
                searchBoxRef.value.style.opacity = '0';
            } else {
                searchBoxRef.value.style.visibility = 'visible';
                searchBoxRef.value.style.opacity = '1';
            }
        }
    }, 1000); // wait for 1 second before search box show/hide to avoid flicker
    return () => clearTimeout(timer);
})
</script>

<template>
    <div class="menu-bar">
        <n-button type="primary" size="small" color="#333">
            <template #icon> <n-icon> <Icons.Add /> </n-icon> </template>
            New Event
        </n-button>
        <div class="view-switcher">
            <button class="btn" :class="{active: global.view === 'year'}" @click="global.setView('year')">Year</button>
            <button class="btn" :class="{active: global.view ==='month'}" @click="global.setView('month')">Month</button>
            <button class="btn" :class="{active: global.view === 'week'}" @click="global.setView('week')">Week</button>
            <button class="btn" :class="{active: global.view === 'day'}" @click="global.setView('day')">Day</button>
        </div>
        <div class="search-bar">
            <Icons.Search theme="outline" fill="#333" size="20" />
            <input type="text" placeholder="input event title to search ... ..." v-model="inputValue"/>
            <div ref="searchBoxRef" class="search-box">
                <p>Nothing found ... ...</p>
            </div>
        </div>
        <n-switch size="medium">
            <template #unchecked>Light Mode</template>
            <template #unchecked-icon>🌤️</template>
            <template #checked>Dark Mode</template>
            <template #checked-icon>🌙</template>
        </n-switch>
    </div>
</template>

<style scoped lang="scss">
@use '../assets/mixin.scss' as *;
.menu-bar {
    @include flex-layout($main-align: space-evenly);
    grid-row: 1 / 2;
    grid-column: 1 / -1;
    padding: 5px 20px;
    margin: 10px 20px;
    margin-bottom: 5px;
    border: none;
    border-radius: 100px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    > * {margin: 0 10px;}
}
.view-switcher {
    @include flex-layout();
    .btn {
        width: 80px;
        height: 30px;
        margin: 0 5px;
        border: 1px solid #333;
        border-radius: 5px;
        background-color: #fff;
        color: #333;
        cursor: pointer;
        transition: background-color 0.3s ease, color 0.3s ease;
    }
    .btn.active {
        background-color: #333;
        color: #fff;
    }
}
.search-bar {
    position: relative;
    @include flex-layout();
    input {
        width: 500px;
        height: 30px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-left: 10px;
        padding: 0 10px;
        background-color: #f5f5f5;
        &::placeholder {
            font-size: 1.2rem;
            color: #999;
        }
    }
    .search-box {
        position: absolute;
        top: calc(100% + 10px);
        left: 50%;
        transform: translateX(calc(-50% + 15px));
        @include flex-layout($direction: column);
        width: 500px;
        min-height: 50px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        visibility: hidden;
        opacity: 0;
        transition: visibility 0.3s ease, opacity 0.3s ease;
    }
}
</style>