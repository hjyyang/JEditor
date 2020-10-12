import "./src/css/main.scss"

import jEditor from "./JEditor.vue";
const JEditor = {
	jEditor,
	LeftToolbar: import("./src/components/toolbar-left.vue"),
	RightToolbar: import("./src/components/toolbar-right.vue"),
	install: function(Vue) {
		Vue.component(jEditor.name, jEditor);
	},
};

export default JEditor;