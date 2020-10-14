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
	render(h) {
		var self = this,
			html,
			lock = false,
			tLock = false,
			blockReg = RegExp("\\* |# |## |### |#### |##### |###### |>"),
			affectReg = RegExp("\\* |>");
		html = (
			<div class="auto-textarea input-wrap">
				<div class="auto-textarea-wrap">
					<div class="code">
						{self.preArr.map((item, index) => {
							if (item.indexOf("```") != -1) {
								lock = !lock;
								return (
									<div class={lock ? "code-start" : "code-end"}>
										<pre>{item ? item : "&#8203;"}</pre>
									</div>
								);
							} else {
								if (lock) {
									return (
										<div>
											<pre>{item ? item : "&#8203;"}</pre>
										</div>
									);
								} else {
									let isExist = item.match(blockReg) || item.match(RegExp(/\d+. /));
									if (!isExist || isExist.index !== 0) {
										//文本段落
										if (!tLock) {
											tLock = true;
											let pre = self.preArr[index - 1];
											if (pre && (pre.match(affectReg) || pre.match(RegExp(/\d+. /)))) {
												return <pre>{item ? item : "&#8203;"}</pre>;
											}
											return <pre class={!!item ? "is-text" : ""}>{item ? item : "&#8203;"}</pre>;
										} else {
											return <pre>{item ? item : "&#8203;"}</pre>;
										}
									} else {
										tLock = false;
									}

									return <pre class={!!item ? "code-line" : ""}>{item ? item : "&#8203;"}</pre>;
								}
							}
						})}
					</div>
					<textarea ref="textarea" spellcheck="false" value={self.content} onInput={this.input} onBlur={self.onBlur}></textarea>
				</div>
			</div>
		);
		return html;
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
		input(e) {
			this.content = e.target.value;
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
		font-size: inherit;
	}
	.code {
		white-space: pre-wrap;
		word-wrap: break-word;
		word-break: normal;
		visibility: hidden;
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
		box-sizing: border-box;
		width: 100%;
		margin: 0;
		padding: 0;
		overflow: hidden;
		line-height: 1.5;
	}
}
</style>
