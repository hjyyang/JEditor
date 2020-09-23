<template>
	<div class="editor-toolbar-right">
		<div class="btn preview active" title="预览" v-if="toolbars.preview" @click="$onclick('preview')">
			<i class="iconfont icon-yanjing"></i>
			<i class="iconfont icon-bukejian hide"></i>
		</div>
		<div class="btn fullscreen" title="全屏编辑" @click="$onclick('fullscreen')">
			<i class="iconfont icon-fangda"></i>
			<i class="iconfont icon-weibiaoti11 hide"></i>
		</div>
		<button class="btn htmlcode" title="查看html文本" @click="$onclick('htmlcode')">
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
		$onclick(type) {
			this.$emit("toolbar-right-click", type);
		},
	},
};
</script>

<style>
</style>