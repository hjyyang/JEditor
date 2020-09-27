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
			content: `所谓特殊字符，就是一些有特殊含义的字符，如上面说的 runoo*b 中的 *，简单的说就是表示任何字符串的意思。如果要查找字符串中的 * 
:::::warning
符号，则需要对 * 进行转义，即在其前加一个 : runo*ob 匹配 runo*ob。
:::::

许多元字符要求在试图匹配它们时特别对待。若要匹配这些特殊字符，必须首先使字符"转义"，即，将反斜杠字符 放在它们前面。下表列出了正则表达式中的特殊字符：`,
			preview: true,
		};
	},
	methods: {
		imageUoload() {
            console.log("text")
        },
	},
};
</script>

<style>
</style>