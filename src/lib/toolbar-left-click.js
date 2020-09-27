function request(vm, formdata) {
    var xhr = null;
    console.log(vm)
	// if (window.XMLHttpRequest) {
	// 	// Mozilla, Safari, IE7+ ...
	// 	xhr = new XMLHttpRequest();
	// } else if (window.ActiveXObject) {
	// 	// IE 6 and older
	// 	xhr = new ActiveXObject("Microsoft.XMLHTTP");
	// }

	// xhr.onreadystatechange = function() {
	// 	if (xhr.readyState == 4 && xhr.status == 200) {
	// 		console.log("ready");
	// 	}
	// };
	// //获取上传的进度
	// xhr.upload.onprogress = function(event) {
	// 	if (event.lengthComputable) {
	// 		var percent = (event.loaded / event.total) * 100;
	// 		console.log(percent);
	// 	}
	// };
	// xhr.onload = function() {
	// 	console.log("load");
	// };
	// xhr.onerror = function() {
	// 	console.log("error");
	// };
	// xhr.open("post", url);
	// //将formdata上传
	// xhr.send(formdata);
}

function $toolbar_left_ol_click(vm) {
	vm.insertOl();
}
function $toolbar_left_ul_click(vm) {
	vm.insertUl();
}
function $toolbar_left_upload_click(vm, dom) {
	let file = dom.files[0],
		formdata = new FormData();
	formdata.append(this.fileName, file);
	request(vm, formdata);
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
