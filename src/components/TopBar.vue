<script lang="ts" setup>
defineEmits(["open"])
</script>

<template>
	<div
		@click="$emit('open')"
	 	class="bg-['#fbf0d9'] text-['#5f4b32'] flex items-center justify-center gap-4 enable-script-bar py-2 cursor-pointer font-bold font-mono text-2xl text-center"
	 >
		<span>😎📖 Enable</span>
		<span class="leading-[normal]">⮞</span>
	</div>
</template>
