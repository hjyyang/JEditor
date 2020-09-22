<template>
	<div class="j-editor" :style="'background-color:'+background+';'">
		<!--工具栏-->
		<div class="editor-toolbar">
			<ToolbarLeft :toolbars="toolbars"></ToolbarLeft>
			<ToolbarRight :toolbars="toolbars"></ToolbarRight>
		</div>
		<div class="editor-panel"></div>
	</div>
</template>

<script>
import ToolbarLeft from "./src/components/toolbar-left.vue";
import ToolbarRight from "./src/components/toolbar-right.vue";
import CONFIG from "./src/lib/config";
export default {
	props: {
		//工具栏
		toolbars: {
			type: Object,
			default() {
				return CONFIG.toolbars;
			},
		},
		//编辑器背景色
		background: {
			type: String,
			default: "#ffffff",
		},
	},
	data() {
		return {};
	},
	components: {
		ToolbarLeft,
		ToolbarRight,
	},
};
</script>
