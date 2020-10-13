<template>
	<div
		class="j-editor"
		:class="{ fullscreen: isFullscreen }"
		@keydown="onKeydown"
		@keyup="onKeyup"
		:style="'font-size:' + fontSize + ';'"
	>
		<!--工具栏-->
		<div
			class="editor-toolbar"
			:style="'background-color:' + toolbarsBackground + ';'"
		>
			<ToolbarLeft
				:toolbars="toolbars"
				:color="color"
				:imageUoload="imageUoload"
				:imageComplete="imageComplete"
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
		<div
			class="editor-panel"
			:class="{ preview: isPreview }"
			:style="'font-size:' + fontSize + 'px;font-family:monospace;'"
		>
			<div
				class="editor-edit"
				@click.self="isFocus = true"
				@scroll="editScroll"
				:style="'background-color:' + editorBackground + ';'"
				ref="edit"
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
				ref="preview"
			>
				<div
					class="show-content"
					v-html="html"
					v-show="!isHtmlcode"
				></div>
				<div
					class="show-content-html"
					v-text="html"
					v-show="isHtmlcode"
				></div>
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
import {
	insertTextAtCaret,
	insertOl,
	insertUl,
	scrollSync,
	keydownEvent,
} from "./src/lib/core";
import mdFunc from "./src/lib/markdown";
import "./src/font/iconfont.css";
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
		imageComplete: Function, //覆盖图片按钮方法，使用这个将不出现下拉选项
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
			default: "gallery",
		},
		fileData: {
			//上传时附带的额外参数
			type: Object,
			default() {
				return {};
			},
		},
		tabSize: {
			type: Number,
			default: 4,
		},
		"on-success": Function, //上传成功回调
		"on-progress": Function, //上传进度回调
		"on-error": Function, //上传失败回调
		save: Function,
		hljs: {
			type: Object,
		},
		languages: {
			type: Object,
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
			editTimer: null,
			showRow: [],
			preOffset: [],
			ctrlDown: false,
			valueTimer: null,
			md: {},
		};
	},
	watch: {
		value(val) {
			this.editContent = val;
		},
		/**
		 * 与父组件数据双向绑定，textarea组件传值过来后使父组件改变值将值流动到本组件
		 */
		editContent(val) {
			this.html = this.md.render(val);
			this.$emit("input", val);
			if (this.valueTimer) {
				clearTimeout(this.valueTimer);
				this.valueTimer = null;
			}
			this.valueTimer = setTimeout(() => {
				this.$nextTick(() => {
					this.textOffset();
				});
			}, 200);
		},
		preview(val) {
			this.isPreview = val;
		},
		fullscreen(val) {
			this.isFullscreen = val;
		},
		htmlcode(val) {
			this.isHtmlcode = val;
		},
	},
	mounted() {
		this.initValue();
		this.$nextTick(() => {
			this.textOffset();
		});
	},
	created() {
		this.md = mdFunc(this.hljs, this.languages);
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
		 * 获取节点数
		 */
		textOffset() {
			let text = document.querySelectorAll(
				".auto-textarea .code pre.isText,.auto-textarea .code div.start"
			);
			this.showRow = document.querySelectorAll(
				".show-content pre,.show-content p,.show-content h1,.show-content h2,.show-content h3,.show-content h4,.show-content h5,.show-content h6,.show-content li,.show-content br"
            );
			this.preOffset = [];
			for (let i = 0; i < text.length; i++) {
				// if (text[i].className != "isText") {
				// 	if (text[i + 1]) {
				// 		text[i]["sHeight"] =
				// 			text[i + 1].offsetTop - text[i].offsetTop;
				// 	} else {
				// 		text[i]["sHeight"] =
				// 			text[i].parentNode.clientHeight - text[i].offsetTop;
				// 	}
				// } else {
				// 	text[i]["sHeight"] = text[i].clientHeight;
				// }
				this.preOffset.push(text[i].offsetTop);
			}
		},
		/**
		 * 监听编辑栏滚动
		 */
		editScroll(e) {
			if (this.isHtmlcode) return false;
			if (this.editTimer) {
				clearTimeout(this.editTimer);
				this.editTimer = null;
			}
			this.editTimer = setTimeout(() => {
				scrollSync(e, this);
			}, 14);
		},
		/**
		 * 监听键盘按下
		 */
		onKeydown(e) {
			if (e.keyCode == 17 || e.keyCode == 91) this.ctrlDown = true;
			keydownEvent(e, this);
		},
		/**
		 * 监听键盘抬起
		 */
		onKeyup(e) {
			if (e.keyCode == 17 || e.keyCode == 91) this.ctrlDown = false;
		},
	},
	components: {
		ToolbarLeft,
		ToolbarRight,
		AutoTextarea,
	},
};
</script>
