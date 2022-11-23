<script lang="ts" setup>
import { websites, awaitForEle } from "../assets/websites";
import { nextTick, onMounted, reactive, ref, watch } from "vue";
import { computed } from "vue";
import { useFetchNextPage } from "./useFetchNextPage";
import TopBar from "@/components/TopBar.vue";
import Header from "@/components/Header.vue";
import { ChevronDownIcon } from '@heroicons/vue/24/solid'

const getCurrentUrl = location.hostname;

const pages = ref([]);
const { title, text, prev, next, chapters } = websites[getCurrentUrl].run();

pages.value.push({title, text, prev, next, chapters});

const isScriptEnabled = ref(false);
const showChaptersList = ref(false);

const nextPage = ref(next); 

const {data, loading, error, getData} = useFetchNextPage();
const loadNextPage = async () => {
	if (loading.value) return;
	await	getData(nextPage.value);
	pages.value.push(data.value);
	nextPage.value = data.value.next;
}

watch(isScriptEnabled, () => {
	console.log('hail to the king');
	if(isScriptEnabled.value)	{
		nextTick(() => {
			document.querySelector(".custom article").innerHTML = text;
		})
		document.querySelector("html").style.overflow = "hidden";
		document.body.style.overflow = "hidden";
		return;
	}

	document.querySelector("html").style.overflow = "";
	document.body.style.overflow = "";
}, {
	immediate: true,
});
</script>

<template>
	<TopBar v-if="!isScriptEnabled" @open="isScriptEnabled = true" />
	<div class="wrapper font-bookerly pb-20" v-if="isScriptEnabled">
		<div class="max-w-[600px] m-auto py-4 px-4">
		<Header class="py-2 mb-10" @close="isScriptEnabled = false" />
		<div class="custom" >
			<div
				v-if="false"
				@click="showChaptersList = !showChaptersList"
				:class="{
					'min-w-[500px]': showChaptersList,
					'min-w-[50px]': !showChaptersList,
				}"
				class="h-[100vh] overflow-y-auto flex-1"
			>
				<h2 class="py-5 text-4xl text-dark-100 font-bold">
					{{ showChaptersList ? "Chapters" : "C" }}
				</h2>
				<div
					:class="{
						hidden: !showChaptersList,
					}"
				>
					<span
						v-for="novel in chapters"
						style="display: block"
						:key="novel.title"
						:href="novel.url"
						>{{ novel.title }}</span
					>
				</div>
			</div>
			<div>
			<div v-for="page in pages" :key="page.title">
				<h1 class="text-4xl align-center text-center">{{ page.title }}</h1>
				<article v-html="page.text"></article>

				<div v-if="false" class="custom-navigation-buttons py-6">
					<a v-if="page.prev" :href="page.prev">prev</a>
					<a v-if="page.next" :href="page.next">next</a>
				</div>
			</div>
			<div v-if="nextPage" class="cursor-pointer py-6" @click="loadNextPage">
					<span v-if="loading" class="flex items-center gap-2 align-baseline">
						loading
  					<svg class="w-6 h-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2"><path strokeDasharray="60" strokeDashoffset="60" strokeOpacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"></animate></path><path strokeDasharray="15" strokeDashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"></animate><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path></g></svg>
					</span>
					<span v-else class="flex items-center gap-2 aling-baseline">
						load more
						<ChevronDownIcon class="h-6 w-6"/>
					</span>
				</div>
			</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.call {
	position: absolute;
	top: 0;
	right: 0;
	z-index: 9999;
	width: 100%;
	padding: .5rem 0;
	background-color: crimson !important;
	color: white;
	font-weight: bold;
	text-align: center;
	cursor: pointer;

}


.wrapper {
	background: #fbf0d9 !important;
	color: #5f4b32 !important;
	margin: auto;
	position: absolute;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	z-index: 999;
	overflow-y: auto;
}

.custom {
	background: #fbf0d9 !important;
	color: #5f4b32 !important;
	z-index: 99999;
	overflow-x: hidden;
	overflow-y: auto;
	margin: auto;
	font-size: 1.2em;
	display: flex;
}
.custom h1 {
	text-align: center;
	font-weight: bold;
	padding: 1em 0;
}

.custom-navigation-buttons {
	display: inline-flex;
	gap: 10px;
}
</style>
