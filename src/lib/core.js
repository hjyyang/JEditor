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
	dom.focus();
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
	dom.focus();
}
/**
 * 滚动联动
 * @param  {[type]} e
 * @param  {[type]} vm
 */
export function scrollSync(e, vm) {
	let target = e.target,
		top = target.scrollTop,
		index = 0;
	if (top + target.clientHeight >= target.scrollHeight) {
		//触底
		vm.$refs.preview.scrollTop = 100000000;
		return false;
	}
	vm.preOffset.push(top);
	vm.preOffset.sort(function(x, y) {
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
	let rowPre = (top - vm.preOffset[index - 1]) / (vm.preOffset[index] - vm.preOffset[index - 1]);
	if (!isNaN(rowPre)) {
		let current = vm.showRow[index == 0 ? 0 : index - 1];
		if (current.nodeName == "CODE") {
			vm.$refs.preview.scrollTop = current.offsetTop + current.offsetParent.offsetTop + current.clientHeight * rowPre;
			return false;
		}
		if (current.nodeName !== "BR") {
			vm.$refs.preview.scrollTop = current.offsetTop + current.clientHeight * rowPre;
		}
	} else {
		let current = vm.showRow[index == 0 ? 0 : index - 1];
		if (current.nodeName == "CODE") {
			vm.$refs.preview.scrollTop = current.offsetTop + current.offsetParent.offsetTop + current.clientHeight * rowPre;
			return false;
		}
		if (current.nodeName !== "BR") {
			vm.$refs.preview.scrollTop = current.offsetTop;
		}
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
	dom.focus();
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
		keyOne: 49,
		keyTwo: 50,
		keyThree: 51,
		keyFour: 52,
		keyFive: 53,
		keySix: 54,
		keyU: 85,
		keyD: 68,
	};
	// if (e.keyCode == type.tab) {
	// 	e.preventDefault();
	// 	let tabStr = "";
	// 	for (let i = 0; i < vm.tabSize; i++) {
	// 		tabStr += " ";
	// 	}
	// 	insertTextAtCaret(vm.getAutoTextarea(), { prefix: "", subfix: "", str: tabStr }, vm);
	// 	return false;
	// }
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
		}
	}
}
