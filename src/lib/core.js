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
