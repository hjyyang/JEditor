import Vue from "vue";
import JEditor from "./JEditor.vue";
import "./src/css/main.scss";

Vue.config.productionTip = false;

new Vue({
	el: "#app",
	render: (h) => h(JEditor),
});
