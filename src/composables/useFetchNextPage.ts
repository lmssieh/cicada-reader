import { ref } from "vue";
import { websites } from "../assets/websites";
const getCurrentUrl = location.hostname;

const useFetchNextPage = () => {

	const data = ref({});
	const loading = ref(false);
	const error = ref('');

	const getData = async (nextPage: string) => {
		let promise;
		loading.value = true;
		try {
			promise = await fetch(nextPage);
			const page = await promise.text();
			const ele = document.createElement('div');
			console.log(page, nextPage)
			ele.innerHTML = page;
			const ff = websites[getCurrentUrl].run(ele);
			const { title, text, prev, next, chapters } = ff;
			data.value = { title, text, prev, next, chapters };
		} catch (e) {
			error.value = e?.message;
		} finally {
			loading.value = false;
		}
		return promise;
	};

	return {
		data,
		loading,
		error,
		getData
	}
}

export { useFetchNextPage }
