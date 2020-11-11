/**
 * 插入文本到编辑器中
 * @param  {[type]} dom     textarea节点
 * @param  {[type]} prefix  插入字符的类型前缀
 * @param  {[type]} subfix  插入字符的类型后缀
 * @param  {[type]} str     插入字符串
 * @param  {[type]} vm
 */
export function insertTextAtCaret(dom, { prefix, subfix, str }, vm) {
	dom.focus();
	if (typeof dom.selectionStart == "number" && typeof dom.selectionEnd == "number") {
		let sIndex = dom.selectionStart,
			eIndex = dom.selectionEnd,
			oldVal = dom.value;
		if (sIndex === eIndex) {
			//直接插入
			dom.value = oldVal.substring(0, sIndex) + prefix + str + subfix + oldVal.substring(eIndex, oldVal.length);
			dom.selectionStart = sIndex + prefix.length;
			dom.selectionEnd = sIndex + str.length + prefix.length;
		} else {
			//存在选中区域
			if (oldVal.substring(sIndex - prefix.length, sIndex) === prefix && oldVal.substring(eIndex, eIndex + subfix.length) === subfix) {
				// 取消
				dom.value =
					oldVal.substring(0, sIndex - prefix.length) +
					oldVal.substring(sIndex, eIndex) +
					oldVal.substring(eIndex + subfix.length, oldVal.length);
				dom.selectionStart = sIndex - prefix.length;
				dom.selectionEnd = eIndex - prefix.length;
			} else {
				// 确定
				dom.value =
					oldVal.substring(0, sIndex) + prefix + oldVal.substring(sIndex, eIndex) + subfix + oldVal.substring(eIndex, oldVal.length);
				dom.selectionStart = sIndex + prefix.length;
				dom.selectionEnd = sIndex + (eIndex - sIndex + prefix.length);
			}
		}
	}
	vm.editContent = dom.value;
}

/**
 * 插入有序列表到编辑器中
 * @param  {[type]} dom     textarea节点
 * @param  {[type]} vm
 */
export function insertOl(dom, vm) {
	dom.focus();
	if (typeof dom.selectionStart == "number" && typeof dom.selectionEnd == "number") {
		let sIndex = dom.selectionStart,
			eIndex = dom.selectionEnd,
			oldVal = dom.value,
			start = sIndex;
		while (start > 0 && oldVal.substring(start - 1, start) !== "\n") {
			start--;
		}
		let selectStr = oldVal.substring(start, eIndex),
			selectStrs = selectStr.split("\n");
		if (oldVal.substring(start, start + 3) !== "1. ") {
			//选中区域不是一个有序列表
			for (let i = 0; i < selectStrs.length; i++) {
				if (selectStrs[i].substring(0, 2) === "* ") {
					//段落是一个无序段落替换为有序段落
					selectStrs[i] = i + 1 + ". " + selectStrs[i].substring(2, selectStrs[i].length);
				} else {
					selectStrs[i] = i + 1 + ". " + selectStrs[i];
				}
			}
		} else {
			//选中区域已经是一个有序列表
			for (let i = 0; i < selectStrs.length; i++) {
				//循环判断选中区域每一段落是否都有前缀
				if (selectStrs[i].substring(0, 3) !== i + 1 + ". ") {
					//段落中没有前缀加上前缀
					selectStrs[i] = i + 1 + ". " + selectStrs[i];
				}
			}
		}
		let newSelectStr = selectStrs.join("\n");
		dom.value = oldVal.substring(0, start) + newSelectStr + oldVal.substring(eIndex, oldVal.length);
		dom.selectionStart = start;
		dom.selectionEnd = eIndex + newSelectStr.length - selectStr.length;
	}
	vm.editContent = dom.value;
	dom.focus();
}
/**
 * 插入无序列表到编辑器中
 * @param  {[type]} dom     textarea节点
 * @param  {[type]} vm
 */
export function insertUl(dom, vm) {
	dom.focus();
	if (typeof dom.selectionStart == "number" && typeof dom.selectionEnd == "number") {
		let sIndex = dom.selectionStart,
			eIndex = dom.selectionEnd,
			oldVal = dom.value,
			start = sIndex;
		while (start > 0 && oldVal.substring(start - 1, start) !== "\n") {
			start--;
		}
		let selectStr = oldVal.substring(start, eIndex),
			selectStrs = selectStr.split("\n");
		if (oldVal.substring(start, start + 2) !== "* ") {
			//选中区域不是一个无序列表
			for (let i = 0; i < selectStrs.length; i++) {
				if (selectStrs[i].substring(0, 3) === i + 1 + ". ") {
					//段落是一个有序段落替换为无序段落
					selectStrs[i] = "* " + selectStrs[i].substring(3, selectStrs[i].length);
				} else {
					selectStrs[i] = "* " + selectStrs[i];
				}
			}
		} else {
			//选中区域已经是一个无序列表
			for (let i = 0; i < selectStrs.length; i++) {
				//循环判断选中区域每一段落是否都有前缀
				if (selectStrs[i].substring(0, 2) !== "* ") {
					//段落中没有前缀加上前缀
					selectStrs[i] = "* " + selectStrs[i];
				}
			}
		}
		let newSelectStr = selectStrs.join("\n");
		dom.value = oldVal.substring(0, start) + newSelectStr + oldVal.substring(eIndex, oldVal.length);
		dom.selectionStart = start;
		dom.selectionEnd = eIndex + newSelectStr.length - selectStr.length;
	}
	vm.editContent = dom.value;
}
/**
 * 滚动联动
 * @param  {[type]} e
 * @param  {[type]} vm
 */
export function scrollSync(e, vm) {
	return false;
	let target = e.target,
		top = target.scrollTop,
		index = 0;
	if (top + target.clientHeight >= target.scrollHeight) {
		//触底
		vm.$refs.preview.scrollTop = 100000000;
		return false;
	}
	if (vm.showRow.length == 0) return false;
	vm.preOffset.push(top);
	vm.preOffset.sort(function (x, y) {
		if (x < y) {
			return -1;
		}
		if (x > y) {
			return 1;
		}
		return 0;
	});
	index = vm.preOffset.indexOf(top);
	vm.preOffset.splice(index, 1);
	let rowPre = (top - vm.preOffset[index - 1]) / (vm.preOffset[index] - vm.preOffset[index - 1]),
		current = vm.showRow[index == 0 ? 0 : index - 1];
	if (!isNaN(rowPre)) {
		vm.$refs.preview.scrollTop = current.offsetTop + current.clientHeight * rowPre;
	} else {
		vm.$refs.preview.scrollTop = 0;
	}
}

/**
 * 插入换行
 * @param  {[type]} dom     textarea节点
 * @param  {[type]} vm
 */
function inserEnter(dom, vm) {
	dom.focus();
	if (typeof dom.selectionStart == "number" && typeof dom.selectionEnd == "number") {
		let sIndex = dom.selectionStart,
			oldVal = dom.value,
			start = sIndex;
		while (oldVal.substring(start, start + 1) != "\n" && oldVal.length != start) {
			start++;
		}
		dom.value = oldVal.substring(0, start) + "\n" + oldVal.substring(start, oldVal.length);
		dom.selectionEnd = dom.selectionStart = start + 1;
	}
	vm.editContent = dom.value;
}
/**
 * 插入tab
 * @param  {[type]} dom     textarea节点
 * @param  {[type]} vm
 */
function inserTab(dom, vm) {
	dom.focus();
	if (typeof dom.selectionStart == "number" && typeof dom.selectionEnd == "number") {
		let sIndex = dom.selectionStart,
			eIndex = dom.selectionEnd,
			oldVal = dom.value,
			tabStr = "";
		for (let i = 0; i < vm.tabSize; i++) {
			tabStr += " ";
		}
		dom.value = oldVal.substring(0, sIndex) + tabStr + oldVal.substring(eIndex, oldVal.length);
		dom.selectionStart = dom.selectionEnd = sIndex + tabStr.length;
	}
	vm.editContent = dom.value;
}
/**
 * 剪切行
 * @param  {[type]} dom     textarea节点
 * @param  {[type]} vm
 */
function cutRow(dom, vm) {
	dom.focus();
	if (typeof dom.selectionStart == "number" && typeof dom.selectionEnd == "number") {
		let sIndex = dom.selectionStart,
			eIndex = dom.selectionEnd,
			oldVal = dom.value,
			start = sIndex,
			end = eIndex;
		if (start === end) {
			while (oldVal.substring(start, start - 1) != "\n" && start > 0) {
				start--;
			}
		}
		while (oldVal.substring(end, end + 1) != "\n" && oldVal.length != end) {
			end++;
		}
		dom.selectionStart = start;
		dom.selectionEnd = end;
	}
}

export function keydownEvent(e, vm) {
	let type = {
		ctrlKey: 17,
		cmdKey: 91,
		space: 32,
		enter: 13,
		alt: 18,
		tab: 9,
		keyB: 66,
		keyI: 73,
		keyC: 67,
		keyV: 86,
		keyS: 83,
		keyX: 88,
		keyOne: 49,
		keyTwo: 50,
		keyThree: 51,
		keyFour: 52,
		keyFive: 53,
		keySix: 54,
		keyU: 85,
		keyD: 68,
	};
	if (e.keyCode == type.tab) {
		e.preventDefault();
		inserTab(vm.getAutoTextarea(), vm);
		return false;
	}
	if (vm.ctrlDown) {
		switch (e.keyCode) {
			case type.enter: //换行
				inserEnter(vm.getAutoTextarea(), vm);
				break;
			case type.keyB: //粗体
				vm.toolbar_left_click("bold");
				break;
			case type.keyI: //斜体
				vm.toolbar_left_click("italic");
				break;
			case type.keyS: //保存
				e.preventDefault();
				if (vm.save) {
					vm.save();
				}
				break;
			case type.keyOne:
				e.preventDefault();
				vm.toolbar_left_click("header1");
				break;
			case type.keyTwo:
				e.preventDefault();
				vm.toolbar_left_click("header2");
				break;
			case type.keyThree:
				e.preventDefault();
				vm.toolbar_left_click("header3");
				break;
			case type.keyFour:
				e.preventDefault();
				vm.toolbar_left_click("header4");
				break;
			case type.keyFive:
				e.preventDefault();
				vm.toolbar_left_click("header5");
				break;
			case type.keySix:
				e.preventDefault();
				vm.toolbar_left_click("header6");
				break;
			case type.keyU:
				e.preventDefault();
				vm.toolbar_left_click("underline");
				break;
			case type.keyD:
				e.preventDefault();
				vm.toolbar_left_click("strikethrough");
				break;
			case type.keyX:
				cutRow(vm.getAutoTextarea(), vm);
				break;
		}
	}
}

/**
 * markdown 解析html
 * @param  {[type]} md     markdown
 * @param  {[type]} val    当前输入的value
 */
export function mdParse(md, val) {
	let tokens = md.parse(val, {}),
		renderer = md.renderer,
		renderInline = renderer.renderInline,
		renderToken = renderer.renderToken,
		options = md.options,
		rules = renderer.rules,
		i,
		len,
		type,
		lastIndex = 0,
		result = "",
		pre = "",
		preArr = val.split("\n"),
		tags = ["table", "ul", "ol", "blockquote"],
		lock = false;
	for (i = 0, len = tokens.length; i < len; i++) {
		type = tokens[i].type;
		if (type === "inline") {
			//内容
			result += renderInline.bind(renderer)(tokens[i].children, options, {});
			if (!lock) {
				pre += tokens[i].content;
			}
			lastIndex = tokens[i].map[1];
		} else if (typeof rules[type] !== "undefined") {
			//code
			result += rules[tokens[i].type](tokens, i, options, {}, renderer);
			let chuck = preArr.slice(tokens[i].map[0], tokens[i].map[1]),
				content = "";
			chuck.forEach((item, index) => {
				if (index < chuck.length - 1) {
					content += item + "\n";
				} else {
					content += item;
				}
			});
			if (tokens[i].map[0] !== 0) {
				//非首行
				let empty = tokens[i].map[0] - lastIndex;
				for (let e = 0; e < empty; e++) {
					pre += "<pre>&#8203;</pre>";
				}
			}
			pre += "<pre class='isblock'>" + content + "</pre>";
			lastIndex = tokens[i].map[1];
		} else {
			//开标签与闭标签
			result += renderToken.bind(renderer)(tokens, i, options);
			if (tokens[i].nesting == 1) {
				//当前是开标签
				if (tags.includes(tokens[i].tag)) {
					//当前标签是特殊标签截取内容，加锁
					let chuck = preArr.slice(tokens[i].map[0], tokens[i].map[1]),
						content = "";
					chuck.forEach((item, index) => {
						if (index < chuck.length - 1) {
							content += item + "\n";
						} else {
							content += item;
						}
					});
					if (tokens[i].map[0] !== 0) {
						//非首行
						let empty = tokens[i].map[0] - lastIndex;
						for (let e = 0; e < empty; e++) {
							pre += "<pre>&#8203;</pre>";
						}
					}
					pre += "<pre class='isblock'>" + content;
					lock = true;
				} else {
					//非特殊标签且未加锁只加pre开标签
					if (!lock) {
						if (tokens[i].map[0] !== 0) {
							//非首行
							let empty = tokens[i].map[0] - lastIndex;
							for (let e = 0; e < empty; e++) {
								pre += "<pre>&#8203;</pre>";
							}
						}
						//检索当前标签离上一标签多少空行
						pre += "<pre class='isblock'>";
					}
				}
			} else {
				//当前是闭标签
				if (tags.includes(tokens[i].tag)) {
					//当前标签是特殊标签，解锁
					lock = false;
					pre += "</pre>";
				} else {
					if (!lock) {
						pre += "</pre>";
					}
				}
			}
		}
	}
	let fLock = true;
	for (let s = preArr.length - 1; s > 0; s--) {
		if (!preArr[s] && fLock) {
			pre += "<pre>&#8203;</pre>";
		} else {
			fLock = false;
		}
	}
	return { pre, html: result };
}
