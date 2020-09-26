<template>
	<div class="auto-textarea input-wrap">
		<div class="auto-textarea-wrap">
			<pre class="auto-textarea-block"><br />{{ content }}</pre>
			<textarea
				:autofocus="j_autofocus"
				ref="textarea"
				@blur="onBlur"
				v-model="content"
				spellcheck="false"
			></textarea>
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
		autofocus: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			content: "",
			j_autofocus: (() => {
				if (this.autofocus) {
					return "autofocus";
				} else {
					null;
				}
			})(),
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
		value(val) {
			this.content = val;
		},
		content(val) {
			this.$emit("input", val);
		},
	},
	mounted() {
		this.content = this.value;
	},
	methods: {
		onBlur() {
			this.$emit("update:focus", false);
		},
	},
};
</script>

<style lang="scss">
.auto-textarea {
	&.input-wrap {
		padding: 8px 16px 15px;
	}
	.auto-textarea-wrap {
		position: relative;
		height: 100%;
	}
	textarea {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		min-height: 100%;
        padding: 0;
        line-height: 1.5;
		border: none;
		outline: none;
		resize: none;
		overflow: hidden;
	}
	pre {
		white-space: pre-wrap;
		visibility: hidden;
		margin: 0;
        padding: 0;
        line-height: 1.5;
	}
}
</style>