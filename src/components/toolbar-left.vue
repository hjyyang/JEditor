<template>
	<div class="editor-toolbar-left">
		<button class="btn bold" v-if="toolbars.bold" title="粗体">
			<i class="iconfont icon-cuti"></i>
		</button>
		<button class="btn italic" v-if="toolbars.italic" title="斜体">
			<i class="iconfont icon-xt"></i>
		</button>
		<div class="btn header" v-if="toolbars.header" title="标题">
			<i class="iconfont icon-biaoti"></i>
			<div class="popup-dropdown">
				<div class="dropdown-wrap">
					<div class="item">一级标题</div>
					<div class="item">二级标题</div>
					<div class="item">三级标题</div>
					<div class="item">四级标题</div>
					<div class="item">五级标题</div>
					<div class="item">六级标题</div>
				</div>
			</div>
		</div>
		<button class="btn underline" v-if="toolbars.underline" title="下划线">
			<i class="iconfont icon-xiahuaxian"></i>
		</button>
		<button class="btn strikethrough" v-if="toolbars.strikethrough" title="中划线">
			<i class="iconfont icon-zhonghuaxian"></i>
		</button>
		<button class="btn mark" v-if="toolbars.mark" title="标志">
			<i class="iconfont icon-biaoji"></i>
		</button>
		<button class="btn quote" v-if="toolbars.quote" title="引用">
			<i class="iconfont icon-icon-quote"></i>
		</button>
		<button class="btn ol" v-if="toolbars.ol" title="有序列表">
			<i class="iconfont icon-icon-shuziliebiao"></i>
		</button>
		<button class="btn ul" v-if="toolbars.ul" title="无序列表">
			<i class="iconfont icon-liebiao-copy"></i>
		</button>
		<button class="btn link" v-if="toolbars.link" title="链接">
			<i class="iconfont icon-lianjie"></i>
		</button>
		<button class="btn color" v-if="toolbars.color" title="字体颜色">
			<i class="iconfont icon-yanse"></i>
			<div class="popup-dropdown table">
				<div class="dropdown-wrap">
					<table>
						<tbody>
							<tr v-for="(items,index) in colorGroup" :key="index">
								<td v-for="item in items" :key="item" :style="'background-color:'+item+';'"></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</button>
		<div class="btn imagelink" v-if="toolbars.imagelink" title="图片">
			<i class="iconfont icon-tupian"></i>
			<div class="popup-dropdown">
				<div class="dropdown-wrap">
					<div class="item">上传</div>
					<div class="item">URL</div>
				</div>
			</div>
		</div>
		<button class="btn code" v-if="toolbars.code" title="代码块">
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
	},
	mounted() {
		this.colorHandle(this.color, 6);
	},
};
</script>