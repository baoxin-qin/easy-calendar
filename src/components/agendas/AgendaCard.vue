<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui';
import { Icons } from '../../assets/Icons';
import type { Agenda } from '../../type';
import { deleteAgenda } from '../../utils/db-utils';

type AgendaCardProps = {
    agenda: Agenda;
}
const props = defineProps<AgendaCardProps>();

const handleDelete = async () => {
    await deleteAgenda(props.agenda.id);
    window.alert('Deleted successfully');
}
</script>

<template>
    <div class="agenda-card">
        <section class="agenda-info">
            <p class="agenda-title">{{ agenda.title }}</p>
            <p class="agenda-location">{{ agenda.location || 'No Location' }}</p>
            <p class="agenda-time">Start at: {{ agenda.start }}</p>
            <p class="agenda-time">End at: {{ agenda.end || 'No End Time' }}</p>
            <p class="agenda-description">
                {{ agenda.description || 'No Description' }}
            </p>
        </section>
        <section class="agenda-actions">
            <n-button type="primary" size="medium" color="lightblue">
                <template #icon> <n-icon> <Icons.Pencil theme="outline" size="20" fill="#fff" /> </n-icon> </template>
                Edit
            </n-button>
            <n-button type="primary" size="medium" color="lightcoral" @click="handleDelete">
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