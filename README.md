## vue-jeditor
A Markdown editor for the Vue framework

## How use
#### install
```javascript
npm install vue-jeditor
```
#### Introduced the global
```javascript
//index.js
import Vue from "vue";

import JEditor from "vue-jeditor";
import "vue-jeditor/dist/src/css/style.css";
Vue.use(JEditor);

//demo.vue
<JEditor v-model="value"></JEditor>
new Vue({
    data() {
       return { value: '' }
    }
})
```
#### Introduce in a separate page
```javascript
//demo.vue
import JEditor from "vue-jeditor";
import "vue-jeditor/dist/src/css/style.css";
components: {
    JEditor,
},
<JEditor v-model="value"></JEditor>
new Vue({
    data() {
       return { value: '' }
    }
})
```
## API
##### props
|  name |  type |  default |  describe  |
| ------- | ------- | ------- | -------  |
| value | string | "" | value  |
| fontSize | string | 14px | font size  |
| preview | boolean | true | Whether the preview area is enabled  |
| fullscreen | boolean | true | Whether to enable full screen editing |
| htmlcode | boolean | true | Whether you can view HTML text |
| imageUoload | Function | null | Image upload custom method |
| fileName | string | file | Upload file field name |
| fileData | object | {} | Additional parameters that come with uploading |
| i18n | string | en | zh-cn: Simplified Chinese, en: English |
| toolbars | object |  | Content  |
