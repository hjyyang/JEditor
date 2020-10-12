<template>
	<div id="app">
		<JEditor v-model="content" :hljs="hljs" :languages="languages" />
	</div>
</template>

<script>
import JEditor from "./JEditor.vue";
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
export default {
	components: {
		JEditor,
	},
	data() {
		return {
			content: "",
			hljs: hljs,
			languages: {
                css,
                javascript
            },
		};
	},
	methods: {},
	mounted() {},
};
</script>

<style>
</style>