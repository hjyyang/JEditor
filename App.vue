<template>
	<div id="app">
		<JEditor
			v-model="content"
			action="http://localhost:8080/j_api/file/upload"
			:headers="uploadHeader"
		/>
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
			content: `所谓特殊字符，就是一些有特殊含义的字符，如上面说的 runoo*b 中的 *，简单的说就是表示任何字符串的意思。如果要查找字符串中的 * 
:::::warning
符号，则需要对 * 进行转义，即在其前加一个 : runo*ob 匹配 runo*ob。
:::::

许多元字符要求在试图匹配它们时特别对待。若要匹配这些特殊字符，必须首先使字符"转义"，即，将反斜杠字符 放在它们前面。下表列出了正则表达式中的特殊字符：`,
			preview: true,
			uploadHeader: {
				authorization:
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoxMiwidV9uYW1lIjoiam9uIiwidV9lbWFpbCI6IjEyMzEyMyIsInVfcm9sZSI6MiwiY3JlYXRlZCI6IjIwMjAtMDgtMTdUMDg6NDk6MTEuMDc3WiIsImlhdCI6MTYwMTIyMDM5MCwiZXhwIjoxNjAxMzA2NzkwfQ.TBp8AZ773kB00XJ9LkbZBvKq0535mhUWpPh2B-ZcynQ",
			},
		};
	},
	methods: {
		imageUoload() {
			console.log("text");
		},
	},
};
</script>

<style>
</style>