<template>
	<div class="input-wrap">
		<div class="auto-textarea-wrap">
			<pre class="auto-textarea-block"><br />{{ content }}</pre>
			<textarea ref="textarea" @blur="onBlur" @input="editInput" v-model="content"></textarea>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		focus: {
			type: Boolean,
			default: false,
		},
		value: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			content: "",
		};
	},
	watch: {
		focus() {
			if (this.focus) {
				this.$refs.textarea.focus();
			} else {
				this.$refs.textarea.blur();
			}
		},
		value() {
			this.content = this.value;
		},
	},
	mounted() {
		this.content = this.value;
	},
	methods: {
		onBlur() {
			this.$emit("update:focus", false);
		},
		editInput() {
			this.$emit("input", this.content);
		},
	},
};
</script>

<style lang="scss" scoped>
.input-wrap {
	padding: 8px 16px 15px;
}
.auto-textarea-wrap {
	position: relative;
	min-height: 100%;
}
textarea {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	min-height: 100%;
	padding: 0;
	border: none;
	outline: none;
	resize: none;
	overflow: hidden;
}
pre {
	margin: 0;
	visibility: hidden;
}
</style>