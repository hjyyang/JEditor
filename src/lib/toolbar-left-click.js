export default function(type, vm) {
	var param_of_insert_text = {
		bold: {
			prefix: "**",
			subfix: "**",
			str: "粗体",
		},
		italic: {
			prefix: "*",
			subfix: "*",
			str: "斜体",
		},
		header1: {
			prefix: "# ",
			subfix: "",
			str: "标题一",
		},
		header2: {
			prefix: "## ",
			subfix: "",
			str: "标题二",
		},
		header3: {
			prefix: "### ",
			subfix: "",
			str: "标题三",
		},
		header4: {
			prefix: "#### ",
			subfix: "",
			str: "标题四",
		},
		header5: {
			prefix: "##### ",
			subfix: "",
			str: "标题五",
		},
		header6: {
			prefix: "###### ",
			subfix: "",
			str: "标题六",
		},
		underline: {
			prefix: "++",
			subfix: "++",
			str: "下划线",
		},
		strikethrough: {
			prefix: "~~",
			subfix: "~~",
			str: "中划线",
		},
		mark: {
			prefix: "==",
			subfix: "==",
			str: "标记",
		},
		quote: {
			prefix: "> ",
			subfix: "",
			str: "引用",
		},
		link: {
			prefix: "[](",
			subfix: ")",
			str: "链接",
		},
		imagelink: {
			prefix: "![](",
			subfix: ")",
			str: "链接",
		},
		code: {
			prefix: "```",
			subfix: "\n\n```\n",
			str: "code",
		},
	};
	if (param_of_insert_text.hasOwnProperty(type)) {
		vm.insertText(vm.getAutoTextarea(), param_of_insert_text[type]);
	}
}
