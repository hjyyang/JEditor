<template>
	<div class="auto-textarea input-wrap">
		<div class="auto-textarea-wrap">
			<div class="code">
				<pre
					class="code-line"
					v-for="(item, index) in preArr"
					:key="index"
					:class="{ isText: !!item }"
					>{{ item ? item : "&#8203;" }}</pre
				>
			</div>
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
			preArr: [],
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
		focus(val) {
			if (val) {
				this.$refs.textarea.focus();
			} else {
				this.$refs.textarea.blur();
			}
		},
		value(val) {
			this.content = val;
			this.preArr = this.value.split("\n");
		},
		content(val) {
			this.$emit("input", val);
		},
	},
	mounted() {
		this.content = this.value;
		this.preArr = this.value.split("\n");
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
		display: block;
		width: 100%;
		min-height: 100%;
		padding: 0;
		margin: 0;
		line-height: 1.5;
		border: none;
		outline: none;
		resize: none;
		overflow: hidden;
	}
	.code {
		white-space: pre-wrap;
		word-wrap: break-word;
		word-break: normal;
		margin: 0;
		padding: 0;
		line-height: 1.5;
		box-sizing: border-box;
	}
	pre {
		display: block;
		white-space: pre-wrap;
		word-wrap: break-word;
		word-break: normal;
		visibility: hidden;
		box-sizing: border-box;
		width: 100%;
		margin: 0;
		padding: 0;
		overflow: hidden;
		line-height: 1.5;
	}
}
</style>