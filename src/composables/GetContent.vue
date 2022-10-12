<script lang="ts" setup>
import { websites, awaitForEle } from "../assets/websites";
import { Readability } from "@mozilla/readability";
import { reactive, ref } from "vue";
const clonedDoc = document.cloneNode(true);

const article = new Readability(clonedDoc, {
	keepClasses: true,
	keepStyles: true,
}).parse();
const getCurrentUrl = location.hostname;
const { name, prev, next, chapters, content } = websites[getCurrentUrl];

console.log(article);

const title = content.title();
const body = content.body();
awaitForEle("#chapter-nav-top select");

const data = ref({
	title: content.title(),
	body: content.body(),
	chapters: null,
});

const chap = chapters().then((chapters) => {
	console.log("i ran", chapters);
	data.value.chapters = chapters;
	console.log(data.value);
});
</script>

<template>
	<div class="custom">
		<div>prev: {{ prev() }}</div>
		<div>next: {{ next() }}</div>
		<div>{{ data }}</div>
		<div class="wrapper">
			<h1>{{ title }}</h1>
			<div>{{ body }}</div>
		</div>
	</div>
</template>

<style scoped>
.wrapper {
	max-width: 900px;
	background: #fbf0d9 !important;
	color: #5f4b32 !important;
	margin: auto;
}

.custom {
	font-family: "Literata", serif !important;
	background: #fbf0d9 !important;
	color: #5f4b32 !important;
	z-index: 99999;
	padding: 0 0.7em 5em;
	overflow-x: hidden;
	overflow-y: auto;
	font-size: 1.2em;
}
.custom h1 {
	text-align: center;
	font-weight: bold;
	padding: 1em 0;
}
</style>
