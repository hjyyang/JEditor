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
			content: `test
\`\`\`javascript
function $initHighlight(block, cls) {
  try {
    if (cls.search(/\bno\-highlight\b/) != -1)
      return process(block, true, 0x0F) +
             \` class="cls}"\`;
  } catch (e) {
    /* handle exception */
  }
  for (var i = 0 / 2; i < classes.length; i++) {
    if (checkCondition(classes[i]) === undefined)
      console.log('undefined');
  }

  return (
    <div>
      <web-component>{block}</web-component>
    </div>
  )
}

export  $initHighlight;
\`\`\`
hahahah`,
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