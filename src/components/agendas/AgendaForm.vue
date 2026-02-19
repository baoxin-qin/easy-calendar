<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui';
import { Icons } from '../../assets/Icons';
import { reactive, useTemplateRef } from 'vue';
import type { Agenda } from '../../type';
import { addAgenda, makeAgendaId } from '../../utils/db-utils';

const agendaFormRef = useTemplateRef<HTMLDialogElement>('agendaFormRef');
const showModal = () => agendaFormRef.value?.showModal();
const closeModal = () => agendaFormRef.value?.close();

const formState = reactive({
    title: '',
    location: '',
    start: '',
    end: '',
    description: '',
});

const handleSubmit = async () => {
    if (!formState.title || !formState.start) { 
        window.alert('Title and start time are required');
        return;
    }
    const newAgenda: Agenda = {
        id: makeAgendaId(formState.start),
        title: formState.title,
        location: formState.location,
        start: formState.start,
        end: formState.end,
        description: formState.description,
    };
    try {
        await addAgenda(newAgenda);
        formState.title = '';
        formState.location = '';
        formState.start = '';
        formState.end = '';
        formState.description = '';
        closeModal();
    } catch (error) {
        console.error('Failed to add agenda:', error);
        window.alert('Failed to add agenda. Please try again.');
    }
}

defineExpose({showModal});
</script>

<template>
    <dialog class="agenda-form" ref="agendaFormRef">
        <div class="form-container">
            <div class="form-menu">
                <n-button type="primary" size="medium" color="red" text @click="closeModal">
                    <template #icon> <n-icon> <Icons.Close theme="outline" size="20" fill="red" /> </n-icon> </template>
                    Cancel
                </n-button>
                <span class="form-title">New Agenda</span>
                <n-button type="primary" size="medium" color="green" text @click="handleSubmit">
                    <template #icon> <n-icon> <Icons.Save theme="outline" size="20" fill="green" /> </n-icon> </template>
                    Save
                </n-button>
            </div>
            <div class="form-content">
                <div class="form-item">
                    <Icons.Editor theme="outline" size="20" fill="#333" />
                    <input type="text" placeholder="What is your agenda about?" v-model="formState.title" />
                </div>
                <div class="form-item">
                    <Icons.Local theme="outline" size="20" fill="#333" />
                    <input type="text" placeholder="Where will your agenda be held?" v-model="formState.location" />
                </div>
                <div class="form-item">
                    <Icons.AlarmClock theme="outline" size="20" fill="#333" />
                    <input type="datetime-local" placeholder="When will your agenda start?" v-model="formState.start" />
                </div>
                <div class="form-item">
                    <Icons.Time theme="outline" size="20" fill="#333" />
                    <input type="datetime-local" placeholder="When will your agenda end?" v-model="formState.end" />
                </div>
                <div class="form-item">
                    <Icons.Comment theme="outline" size="20" fill="#333" />
                    <input type="text" placeholder="You can add a description for your agenda." v-model="formState.description" />
                </div>
            </div>
        </div>
    </dialog>
</template>

<style scoped lang="scss">
@use '../../assets/mixin.scss' as *;
.agenda-form {
    position: fixed;
    display: none;
    top: 0;
    left: 0;
    place-items: center;
    width: 100vw;
    height: 100vh;
    border: none;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 999;

    &[open] {
        display: grid;
    }
}
.form-container {
    border: none;
    border-radius: 10px;
    padding: 20px 10px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.form-menu {
    @include flex-layout($main-align: space-between);
    margin-bottom: 10px;
    .form-title {
        font-size: 2rem;
        font-weight: bold;
        color: #333;
        text-align: center;
        margin: 0 10px;
    }
}
.form-item {
    @include flex-layout();
    margin: 0 10px;
    margin-bottom: 10px;
    input {
        width: 400px;
        height: 50px;
        padding-left: 10px;
        margin-left: 10px;
        border: 1px solid #ccc;
        border-radius: 10px;
    }
}
</style>