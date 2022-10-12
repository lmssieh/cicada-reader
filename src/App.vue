<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "./components/HelloWorld.vue";
import GetContent from "./composables/GetContent.vue";

console.log("amazing");
</script>

<template>
	<div>
		<HelloWorld msg="Vite + Vue!~!!" />
		<GetContent />
	</div>
</template>

<style>
.hide-body {
	max-height: 100vh;
}
.hidden {
	display: none;
}
</style>
