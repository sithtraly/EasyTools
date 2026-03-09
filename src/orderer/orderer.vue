<style scoped>
.flex {
	display: flex;
	gap: 20px;
	padding: 20px;
	width: 100vw;
}

.flex>* {
	flex-grow: 1;
}

.flex-row {
	flex-direction: row;
}

.w-100 {
	width: 100%;
}

.text-area-height {
	height: 32vh;
}
</style>

<template>
	<h1 class="text-center">តម្រៀបឈ្មោះ</h1>
	<div class="flex flex-row">
		<div class="sort-destination">
			<h2 class="text-center m-0">ឈ្មោះសម្រាប់តម្រៀបតាម</h2>
			<textarea name="" id="" class="w-100 text-area-height" v-model="sortedName"></textarea>
		</div>
		<div class="sort-target">
			<h2 class="text-center m-0">ឈ្មោះដែលត្រូវតម្រៀប</h2>
			<textarea name="" id="" class="w-100 text-area-height" v-model="nameToSort" @mouseout="convert()"></textarea>
		</div>
	</div>
	<div class="sort-result vw-100 p-5 ">
		<h2 class="text-center m-0">លទ្ធផលដែលតម្រៀបរួច</h2>
		<textarea name="" id="" class="w-100 text-area-height" v-model="result"></textarea>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const sortedName = ref('')
const nameToSort = ref('')
const result = ref([])

const convert = () => {
	const sortMap = new Map(sortedName.value.split('\n').map((v, i) => [v, i]))
	const targetSort = nameToSort.value.split('\n')
	result.value = targetSort.sort((a, b) => {
		const oa = a.split('\t')
		const ob = b.split('\t')
		const ia = sortMap.get(oa[0]) ?? Infinity
		const ib = sortMap.get(ob[0]) ?? Infinity
		return ia - ib
	}).join('\n')
	
}

</script>