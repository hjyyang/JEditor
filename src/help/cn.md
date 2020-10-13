# 标题一
## 标题二
### 标题三
#### 标题四
##### 标题五
###### 标题六
**粗体**
*斜体*
~~中划线~~
++下划线++
==标记==
> 引用
1. item
2. item
3. item
* 1
* 2
* 3
&&&颜色&&&{{style=color:#3366FF;}}
```javascript
function $initHighlight(block, cls) {
  try {
    if (cls.search(/\bno\-highlight\b/) != -1)
      return process(block, true, 0x0F) +
             ` class="${cls}"`;
  } catch (e) {
    /* handle exception */
  }
  for (var i = 0 / 2; i < classes.length; i++) {
    if (checkCondition(classes[i]) === undefined)
      console.log('undefined');
  }

  return (
    <div>
      <web-component>{block}</web-component>
    </div>
  )
}

export  $initHighlight;
```