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
			// 存在选中区域
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
			oldVal = dom.value;
		if (sIndex === eIndex) {
			//直接插入
			dom.value = oldVal.substring(0, sIndex) + "1. " + oldVal.substring(eIndex, oldVal.length);
			dom.selectionEnd = dom.selectionStart = sIndex + 3;
		} else {
			// 存在选中区域
			let start = sIndex;
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
			oldVal = dom.value;
		if (sIndex === eIndex) {
			//直接插入
			dom.value = oldVal.substring(0, sIndex) + "* " + oldVal.substring(eIndex, oldVal.length);
			dom.selectionEnd = dom.selectionStart = sIndex + 2;
		} else {
			// 存在选中区域
			let start = sIndex;
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
	}
	vm.editContent = dom.value;
	dom.focus();
}
