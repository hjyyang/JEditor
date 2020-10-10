<template>
	<div id="app">
		<JEditor v-model="content" />
	</div>
</template>

<script>
import JEditor from "./JEditor.vue";
export default {
	components: {
		JEditor,
	},
	data() {
		return {
			content: "",
		};
	},
	methods: {},
	mounted() {},
};
</script>

<style>
</style>