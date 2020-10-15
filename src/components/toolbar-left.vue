<template>
	<div class="editor-toolbar-left">
		<button class="btn bold" v-if="toolbars.bold" @click="$onclick('bold')" title="粗体(Ctrl+B)">
			<i class="iconfont icon-cuti"></i>
		</button>
		<button class="btn italic" v-if="toolbars.italic" @click="$onclick('italic')" title="斜体(Ctrl+I)">
			<i class="iconfont icon-xt"></i>
		</button>
		<div class="btn header" v-if="toolbars.header" title="标题">
			<i class="iconfont icon-biaoti"></i>
			<div class="popup-dropdown">
				<div class="dropdown-wrap">
					<div class="item" @click="$onclick('header1')" title="(Ctrl+1)">
						一级标题
					</div>
					<div class="item" @click="$onclick('header2')" title="(Ctrl+2)">
						二级标题
					</div>
					<div class="item" @click="$onclick('header3')" title="(Ctrl+3)">
						三级标题
					</div>
					<div class="item" @click="$onclick('header4')" title="(Ctrl+4)">
						四级标题
					</div>
					<div class="item" @click="$onclick('header5')" title="(Ctrl+5)">
						五级标题
					</div>
					<div class="item" @click="$onclick('header6')" title="(Ctrl+6)">
						六级标题
					</div>
				</div>
			</div>
		</div>
		<button class="btn underline" v-if="toolbars.underline" @click="$onclick('underline')" title="下划线(Ctrl+U)">
			<i class="iconfont icon-xiahuaxian"></i>
		</button>
		<button class="btn strikethrough" v-if="toolbars.strikethrough" @click="$onclick('strikethrough')" title="中划线(Ctrl+D)">
			<i class="iconfont icon-zhonghuaxian"></i>
		</button>
		<button class="btn quote" v-if="toolbars.quote" @click="$onclick('quote')" title="引用">
			<i class="iconfont icon-icon-quote"></i>
		</button>
		<button class="btn ol" v-if="toolbars.ol" @click="$onespecial('ol')" title="有序列表">
			<i class="iconfont icon-icon-shuziliebiao"></i>
		</button>
		<button class="btn ul" v-if="toolbars.ul" @click="$onespecial('ul')" title="无序列表">
			<i class="iconfont icon-liebiao-copy"></i>
		</button>
		<button class="btn link" v-if="toolbars.link" @click="$onclick('link')" title="链接">
			<i class="iconfont icon-lianjie"></i>
		</button>
		<button class="btn color" v-if="toolbars.color" title="字体颜色">
			<i class="iconfont icon-yanse"></i>
			<div class="popup-dropdown table">
				<div class="dropdown-wrap">
					<table>
						<tbody>
							<tr v-for="(items, index) in colorGroup" :key="index">
								<td
									v-for="item in items"
									:key="item"
									:style="'background-color:' + item + ';'"
									@click="$onespecial('color', item)"
								></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</button>
		<div class="btn imagelink" @click="imageCompletes" v-if="toolbars.imagelink" title="图片">
			<i class="iconfont icon-tupian"></i>
			<div class="popup-dropdown" v-if="!imageComplete">
				<div class="dropdown-wrap">
					<div class="item" @click="$onespecial('imageupload')">
						上传
						<input type="file" @change="fileChange" class="fileUpload" ref="file" />
					</div>
					<div class="item" @click="$onclick('imagelink')">URL</div>
				</div>
			</div>
		</div>
		<button class="btn code" v-if="toolbars.code" @click="$onclick('code')" title="代码块">
			<i class="iconfont icon-daima"></i>
		</button>
	</div>
</template>

<script>
export default {
	props: {
		toolbars: Object,
		color: {
			type: Array,
			default() {
				return [];
			},
		},
		fileName: String,
		imageUoload: Function,
		imageComplete: Function,
	},
	data() {
		return {
			colorGroup: [],
		};
	},
	methods: {
		/**
		 * 数组分割成多数组
		 * @param  {[type]} array 要分割的数组
		 * @param  {[type]} size  每个数组的个数
		 * @return {[type]}       返回一个数组
		 */
		colorHandle(array, size) {
			let [start, end, result] = [null, null, []];
			for (let i = 0; i < Math.ceil(array.length / size); i++) {
				start = i * size;
				end = start + size;
				result.push(array.slice(start, end));
			}
			this.colorGroup = result;
		},
		/**
		 * 点击后往父组件传递值
		 * @param  {[type]} type  点击类型
		 */
		$onclick(type) {
			this.$emit("toolbar-left-click", type);
		},
		$onespecial(type, val) {
			if (type === "imageupload") {
				if (!this.imageUoload) {
					//无自定义上传事件
					this.$refs.file.click();
				} else {
					this.imageUoload();
				}
				return false;
			}
			this.$emit("toolbar-left-especial", { type, val });
		},
		/**
		 * 默认上传事件文件选择事件
		 * @param  {[type]} type  点击类型
		 */
		fileChange() {
			this.$emit("toolbar-left-especial", {
				type: "upload",
				val: this.$refs.file,
			});
		},
		imageCompletes() {
			if (this.imageComplete) {
				this.imageComplete();
			}
		},
	},
	mounted() {
		this.colorHandle(this.color, 6);
	},
};
</script>
