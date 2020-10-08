<template>
	<div id="app">
		<JEditor
			v-model="content"
			action="http://localhost:8080/j_api/file/upload"
			:on-error="error"
			:headers="{
				Authorization: `Bearer
		eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoxMywidV9uYW1lIjoiYWRtaW4iLCJ1X2VtYWlsIjoiMzEyMyIsInVfcm9sZSI6MSwiY3JlYXRlZCI6IjIwMjAtMDgtMjVUMDk6NDI6MDkuMjI3WiIsImlhdCI6MTYwMTI2MTY4MSwiZXhwIjoxNjAxMzQ4MDgxfQ.__BHVufGbJgbfZ3VL4cROflHLgfluiWcfufrbOeK7o8`,
			}"
		/>
	</div>
</template>

<script>
import JEditor from "./JEditor.vue";
export default {
	components: {
		JEditor,
	},
	data() {
		return {
			content: `# 标题一
## 标题二
### 标题三
#### 标题四
##### 标题五
###### 标题六

![alt](https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg)

**粗体**

*斜体*

&&&下划线&&&{{.underline}}

~~中划线~~

==标记==

> 引用

1. 有序列表行一
2. 有序列表行二
3. 有序列表行三

* 无序列表行一
* 无序列表行二
* 无序列表行二

[链接](链接)

![alt](https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg)
![alt](https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg)

![alt](https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg)

![alt](https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg)

![alt](https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg)

![alt](https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg)

![alt](https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg)

![alt](https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg)


&&&颜色&&&{{style=color:#FF3300;;}}`,
			preview: true,
		};
	},
	methods: {
		imageUoload() {
			console.log("text");
		},
		error(raw, file) {
			console.log(raw, file);
		},
	},
};
</script>

<style>
</style>