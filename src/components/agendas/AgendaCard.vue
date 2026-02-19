<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui';
import { Icons } from '../../assets/Icons';
</script>

<template>
    <div class="agenda-card">
        <section class="agenda-info">
            <p class="agenda-title">Hello Vue3</p>
            <p class="agenda-location">New York / US</p>
            <p class="agenda-time">Start at: 2022-01-01 10:00 AM</p>
            <p class="agenda-time">End at: 2022-01-01 11:00 AM</p>
            <p class="agenda-description">
                This is a sample agenda description.
            </p>
        </section>
        <section class="agenda-actions">
            <n-button type="primary" size="medium" color="lightblue">
                <template #icon> <n-icon> <Icons.Pencil theme="outline" size="20" fill="#fff" /> </n-icon> </template>
                Edit
            </n-button>
            <n-button type="primary" size="medium" color="lightcoral">
                <template #icon> <n-icon> <Icons.Delete theme="outline" size="20" fill="#fff" /> </n-icon> </template>
                Delete
            </n-button>
        </section>
    </div>
</template>

<style scoped lang="scss">
@use '../../assets/mixin.scss' as *;
.agenda-card {
    min-width: 300px;
    border: none;
    border-radius: 10px;
    padding: 10px 5px;
    margin: 10px 0;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}
section {
    width: 100%;
    margin: 10px 0;
}
.agenda-info {
    @include flex-layout(column, flex-start, flex-start);
}
.agenda-actions {
    @include flex-layout(row, space-around, center);
}
</style>