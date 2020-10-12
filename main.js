import Vue from "vue";
import App from "./App.vue";
import "./src/css/main.scss";
import "./src/css/monokai-sublime.css"
Vue.config.productionTip = false;

new Vue({
	el: "#app",
	render: (h) => h(App),
});
