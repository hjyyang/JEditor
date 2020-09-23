<template>
	<div class="j-editor">
		<!--工具栏-->
		<div class="editor-toolbar" :style="'background-color:'+toolbarsBackground+';'">
			<ToolbarLeft :toolbars="toolbars" :color="color"></ToolbarLeft>
			<ToolbarRight :toolbars="toolbars" @toolbar-right-click="toolbar_right_click"></ToolbarRight>
		</div>
		<div class="editor-panel">
			<div
				class="editor-edit"
				@click.self="isFocus = true"
				:style="'background-color:'+editorBackground+';'"
			>
				<AutoTextarea :focus.sync="isFocus" v-model="editContent" />
			</div>
			<div class="editor-show" v-show="preview" :style="'background-color:'+previewBackground+';'">
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
import toolbarRightClick from "./src/lib/toolbar-right-click";
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
		fontSize: {
			// 字体大小
			type: String,
			default: "14px",
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
		preview: {
			//预览
			type: Boolean,
			default: true,
		},
		value: {
			// 初始 value
			type: String,
			default: "",
		},
	},
	data() {
		return {
			isFocus: false,
			editContent: "",
		};
	},
	watch: {
		value() {
			this.editContent = this.value;
		},
	},
	mounted() {
		this.editContent = this.value;
	},
	methods: {
		toolbar_right_click(type) {
			toolbarRightClick(type, this);
		},
	},
	components: {
		ToolbarLeft,
		ToolbarRight,
		AutoTextarea,
	},
};
</script>
