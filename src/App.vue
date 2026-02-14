<script setup lang="ts">
import { MenuBar, MiniTable, Extension, Views } from './components';
</script>

<template>
	<div id="easy-calendar">
		<menu-bar />
		<main class="calendar-container">
			<mini-table />
			<extension />
			<views />
		</main>
	</div>
</template>

<style scoped lang="scss">
@use './assets/mixin.scss' as *;
#easy-calendar {
	@include grid-layout($rows: 1fr 14fr, $columns: 1fr);
	width: 100%;
	height: 100%;
	background-color: #f5f5f5;
}
.calendar-container {
	@include grid-layout($rows: repeat(2, 1fr), $columns: 1fr 5fr, $gap: 10px);
	grid-row: 2 / -1;
	grid-column: 1 / -1;
	margin: 10px 15px;
	margin-top: 5px;
	background-color: #f5f5f5;
}
</style>