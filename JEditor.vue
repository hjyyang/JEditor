<template>
	<div class="j-editor" :class="{ fullscreen: isFullscreen }">
		<!--工具栏-->
		<div
			class="editor-toolbar"
			:style="'background-color:' + toolbarsBackground + ';'"
		>
			<ToolbarLeft
				:toolbars="toolbars"
				:color="color"
				:imageUoload="imageUoload"
				:fileName="fileName"
				@toolbar-left-click="toolbar_left_click"
				@toolbar-left-especial="toolbar_left_especial"
			></ToolbarLeft>
			<ToolbarRight
				:toolbars="toolbars"
				:preview="isPreview"
				:fullscreen="isFullscreen"
				:htmlcode="isHtmlcode"
				@toolbar-right-click="toolbar_right_click"
			></ToolbarRight>
		</div>
		<div class="editor-panel" :class="{ preview: isPreview }">
			<div
				class="editor-edit"
				@click.self="isFocus = true"
				:style="'background-color:' + editorBackground + ';'"
			>
				<AutoTextarea
					ref="autoTextarea"
					:focus.sync="isFocus"
					v-model="editContent"
				/>
			</div>
			<div
				class="editor-show"
				v-show="isPreview"
				:style="'background-color:' + previewBackground + ';'"
			>
				<div
					class="show-content"
					v-html="html"
					v-if="!isHtmlcode"
				></div>
				<div class="show-content-html" v-text="html" v-else></div>
			</div>
		</div>
	</div>
</template>

<script>
import ToolbarLeft from "./src/components/toolbar-left.vue";
import ToolbarRight from "./src/components/toolbar-right.vue";
import AutoTextarea from "./src/components/auto-textarea.vue";
import CONFIG from "./src/lib/config";
import {
	toolbarLeftClick,
	toolbarLeftEspecial,
} from "./src/lib/toolbar-left-click";
import toolbarRightClick from "./src/lib/toolbar-right-click";
import { insertTextAtCaret, insertOl, insertUl } from "./src/lib/core";
import md from "./src/lib/markdown";
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
		fullscreen: {
			//全屏编辑
			type: Boolean,
			default: false,
		},
		value: {
			// 初始 value
			type: String,
			default: "",
		},
		htmlcode: {
			// 查看html
			type: Boolean,
			default: false,
		},
		imageUoload: Function, //自定义上传方法
		action: {
			//上传的地址
			type: String,
			default: "/",
		},
		headers: {
			type: Object,
			default() {
				return {};
			},
		},
		fileName: {
			//上传的文件字段名
			type: String,
			default: "file",
		},
		fileData: {
			//上传时附带的额外参数
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {
			isFocus: false,
			editContent: "",
			isPreview: true,
			isFullscreen: false,
			isHtmlcode: false,
			html: "",
		};
	},
	watch: {
		value() {
			this.editContent = this.value;
		},
		/**
		 * 与父组件数据双向绑定，textarea组件传值过来后使父组件改变值将值流动到本组件
		 */
		editContent() {
			this.html = md.render(this.editContent);
			this.$emit("input", this.editContent);
		},
		preview() {
			this.isPreview = this.preview;
		},
		fullscreen() {
			this.isFullscreen = this.fullscreen;
		},
		htmlcode() {
			this.isHtmlcode = this.htmlcode;
		},
	},
	mounted() {
		this.initValue();
	},
	methods: {
		initValue() {
			this.editContent = this.value;
			this.isPreview = this.preview;
			this.isFullscreen = this.fullscreen;
			this.isHtmlcode = this.htmlcode;
		},
		/**
		 * 执行右工具栏中的点击事件
		 * @param  {[type]} type  点击类型
		 */
		toolbar_right_click(type) {
			toolbarRightClick(type, this);
		},
		/**
		 * 执行左工具栏中的点击事件
		 * @param  {[type]} type  点击类型
		 */
		toolbar_left_click(type) {
			toolbarLeftClick(type, this);
		},
		/**
		 * 执行左工具栏中的自定义标签操作
		 * @param  {[type]} op       操作参数
		 * @param  {[type]} op.type  点击类型
		 * @param  {[type]} op.val   值
		 */
		toolbar_left_especial(op) {
			toolbarLeftEspecial(op, this);
		},
		/**
		 * 切换预览
		 * @param  {[type]} val  是否预览
		 */
		previewtoggle(val) {
			this.isPreview = val;
			this.$emit("update:preview", val);
		},
		/**
		 * 切换全屏
		 * @param  {[type]} val  是否全屏
		 */
		fullscreentoggle(val) {
			this.isFullscreen = val;
			this.$emit("update:fullscreen", val);
		},
		/**
		 * 查看输入结果html
		 * @param  {[type]} val  是否查看输入结果html
		 */
		htmlcodetoggle(val) {
			this.isHtmlcode = val;
			this.$emit("update:htmlcode", val);
		},
		/**
		 * 获取textarea节点
		 * @return  返回一个节点
		 */
		getAutoTextarea() {
			return this.$refs.autoTextarea.$refs.textarea;
		},
		/**
		 * 编辑器插入文案
		 * @param  {[type]} dom     编辑器textarea节点
		 * @param  {[type]} prefix  输入文案前缀
		 * @param  {[type]} subfix  输入文案后缀
		 * @param  {[type]} str     输入文案
		 */
		insertText(dom, insertText) {
			insertTextAtCaret(dom, insertText, this);
		},
		/**
		 * 插入有序列表
		 */
		insertOl() {
			insertOl(this.getAutoTextarea(), this);
		},
		/**
		 * 插入无序列表
		 */
		insertUl() {
			insertUl(this.getAutoTextarea(), this);
		},
		/**
		 * 上传前
		 */
		beforeUpload() {},
		/**
		 * 上传成功
		 */
		succeedUpload() {},
	},
	components: {
		ToolbarLeft,
		ToolbarRight,
		AutoTextarea,
	},
};
</script>
