<template>
	<div class="editor-toolbar-right">
		<div class="btn preview active" title="预览" v-if="toolbars.preview" @click="preview($event)">
			<i class="iconfont icon-yanjing"></i>
			<i class="iconfont icon-bukejian hide"></i>
		</div>
		<div class="btn fullscreen" title="全屏编辑" @click="fullscreen($event)">
			<i class="iconfont icon-fangda"></i>
			<i class="iconfont icon-weibiaoti11 hide"></i>
		</div>
		<button class="btn htmlcode" title="查看html文本" @click="showHtml($event)">
			<i class="iconfont icon-daima"></i>
			<i class="iconfont icon-daima hide"></i>
		</button>
	</div>
</template>

<script>
export default {
	props: {
		toolbars: Object,
	},
	methods: {
		preview(el) {
			if (this.isActive(el)) {
			} else {
			}
		},
		fullscreen(el) {
			if (this.isActive(el)) {
			} else {
			}
		},
		showHtml(el) {
			if (this.isActive(el)) {
			} else {
			}
		},
		isActive(el) {
			let target = el.target;
			if (target.classList.value.indexOf("active") != -1) {
				target.classList.remove("active");
				return false;
			} else {
				target.classList.add("active");
				return true;
			}
		},
	},
};
</script>

<style>
</style>