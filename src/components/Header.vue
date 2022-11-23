<script lang="ts" setup>
import { XMarkIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline'

defineEmits(["close"])
</script>


<template>
    <div class="flex items-center justify-between" >
			<h1 class="underline cursor-pointer font-bold text-3xl">🐛📖 cicada reader</h1>
			<div class="flex items-center gap-3">
				<button v-if="false">
					<Cog6ToothIcon class="h-10 w-10" />	
				</button>
				<button @click="$emit('close')">
					<XMarkIcon class="h-10 w-10" />
				</button>
			</div>
		</div>

</template>
