import ajax from "./ajax";
function $toolbar_left_ol_click(vm) {
	vm.insertOl();
}
function $toolbar_left_ul_click(vm) {
	vm.insertUl();
}
function $toolbar_left_upload_click(vm, dom) {
	const options = {
		headers: vm.headers,
		file: dom.files[0],
		withCredentials: false,
		data: vm.fileData,
		filename: vm.fileName,
		action: vm.action,
		onProgress: (e) => {
			if (vm.onProgress) {
				vm.onProgress(e, dom.files[0]);
			}
		},
		onSuccess: (res) => {
			if (vm.onSuccess) {
				vm.onSuccess(res, dom.files[0]);
			}
		},
		onError: (err) => {
			if (vm.onError) {
				vm.onError(err, dom.files[0]);
			}
		},
	};
	ajax(options);
}

export function toolbarLeftClick(type, vm) {
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
			prefix: "\n```",
			subfix: "\n\n```\n",
			str: "code",
		},
	};
	if (param_of_insert_text.hasOwnProperty(type)) {
		vm.insertText(vm.getAutoTextarea(), param_of_insert_text[type]);
	}
}

export function toolbarLeftEspecial(op, vm) {
	var param_of_insert_text = {
		color: {
			prefix: "&&&",
			subfix: "&&&{{style=color:" + op.val + ";}}",
			str: "颜色",
		},
		underline: {
			prefix: "&&&",
			subfix: "&&&{{.underline}}",
			str: "下划线",
		},
	};
	if (param_of_insert_text.hasOwnProperty(op.type)) {
		vm.insertText(vm.getAutoTextarea(), param_of_insert_text[op.type]);
	}
	var other_left_click = {
		ol: $toolbar_left_ol_click,
		ul: $toolbar_left_ul_click,
		upload: $toolbar_left_upload_click,
	};
	if (other_left_click.hasOwnProperty(op.type)) {
		other_left_click[op.type](vm, op.val);
	}
}
