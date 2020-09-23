<template>
	<div class="j-editor">
		<!--工具栏-->
		<div class="editor-toolbar" :style="'background-color:'+toolbarsBackground+';'">
			<ToolbarLeft :toolbars="toolbars" :color="color"></ToolbarLeft>
			<ToolbarRight :toolbars="toolbars"></ToolbarRight>
		</div>
		<div class="editor-panel">
			<div
				class="editor-edit"
				@click.self="isFocus = true"
				:style="'background-color:'+editorBackground+';'"
			>
				<AutoTextarea :focus.sync="isFocus" v-model="editContent" />
			</div>
			<div class="editor-show" :style="'background-color:'+previewBackground+';'">
				<div class="show-content"></div>
				<div class="show-content-html"></div>
			</div>
		</div>
	</div>
</template>

<script>
import ToolbarLeft from "./src/components/toolbar-left.vue";
import ToolbarRight from "./src/components/toolbar-right.vue";
import AutoTextarea from "./src/components/auto-textarea.vue";
import CONFIG from "./src/lib/config";
export default {
	props: {
		toolbars: {
			//工具栏
			type: Object,
			default() {
				return CONFIG.toolbars;
			},
		},
		color: {
			//颜色
			type: Array,
			default() {
				return CONFIG.color;
			},
		},
		toolbarsBackground: {
			// 工具栏背景色
			type: String,
			default: "#ffffff",
		},
		editorBackground: {
			// TODO: 编辑栏背景色
			type: String,
			default: "#ffffff",
		},
		previewBackground: {
			// 预览栏背景色
			type: String,
			default: "#fbfbfb",
		},
	},
	data() {
		return {
			isFocus: false,
			editContent: `a
a
a
a
a
a
a
a
a



















a
a
a`,
		};
	},
	components: {
		ToolbarLeft,
		ToolbarRight,
		AutoTextarea,
	},
	methods: {},
};
</script>
