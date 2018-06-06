## 浏览器
> 浏览器的功能是从服务器上取回你想要的资源，然后展示在浏览器窗口当中。资源通常是 HTML 文件，也可能是 PDF，图片，或者其他类型的内容。资源的位置通过用户提供的 URI(Uniform Resource Identifier) 来确定。


### 渲染流程

以webkit为例：

![](./webkitflow.png)

1. 解析HTML为DOM，解析CSS为CSSOM（CSS Object Model）
2. 将DOM和CSSOM合成一棵渲染树（Render Tree）
3. 完成渲染树的布局（Layout）
4. 将渲染树绘制到屏幕

### 嵌入Javascript

#### 直接添加代码块
通过script标签，直接将JavaScript代码嵌入网页。

```javascript
<script>
// write javascript code
</script>
```

#### 加载外部脚本

```
<script src="index.js"></script>
```

#### Javascript的装载执行
正常的网页加载流程:

1. 浏览器一边下载HTML网页，一边开始解析
2. 解析过程中，发现script标签
3. 暂停解析，网页渲染的控制权转交给JavaScript引擎
4. 如果script标签引用了外部脚本，就下载该脚本，否则就直接执行
5. 执行完毕，控制权交还渲染引擎，恢复往下解析HTML网页

- defer

```
<script src="index.js" defer></script>
```

- async

```
<script src="index.js" async></script>
```
[Javascript defer vs async](http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html)

## DOM(文档对象模型)

>DOM（文档对象模型）是针对HTML和XML文档的一个API。DOM 描绘了一个层次化的节点树，允许开发人员添加、删除、修改页面的某一部分。

- 浏览器会根据 DOM 模型，将结构化文档（比如 HTML 和 XML）解析成一系列的节点，再由这些节点组成一个树状结构（DOM Tree）
- 文档中的每个元素都是文档所属的文档对象模型(DOM)一部分，JavaScript可以访问和操作存储在DOM中的内容。
- DOM是一个规范，与编程语言无关。

### 节点（Node）
>DOM 的最小组成单位叫做节点。文档的树形结构(DOM树)，就是由各种不同类型的节点组成。

#### 节点的类型有12种：
- `Document`：整个文档树的顶层节点
- `Element`：网页的各种HTML标签（比如`<body>`等）
- `Attribute`：网页元素的属性
- `Text`：标签之间或标签包含的文本
- ......

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Page Title</title>
	</head>
	<body>
		<h1 class="heading">This is a Heading</h1>
		<p>This is a paragraph.</p>
	</body>
</html>
```

所有DOM节点类型都继承自浏览器提供的原生Node对象，因而它们拥有一些共同的属性和方法。

### window对象
> 在浏览器中，window对象指当前的浏览器窗口。它也是所有对象的顶层对象。
> “顶层对象”指的是最高一层的对象，所有其他对象都是它的下属。JavaScript规定，浏览器环境的所有全局变量，都是window对象的属性。


#### 常用属性及方法

**window.location** -- 获取当前窗口的URL信息

**window.innerHeight / window.innerWidth** -- 返回网页在当前窗口中可见部分的高度/宽度

**window.outerHeight / window.outerWidth** -- 返回浏览器窗口的高度和宽度

**window.screen** -- 返回显示设备的信息

**window.onload** -- 指定在浏览器窗口加载完毕时调用的函数

```javascript
window.onload = function() {
  console.log('Load done!');
};
```

### document对象
>document对象是文档的根节点，每张网页都有自己的document对象。
通过document 或 window.document 获取该对象。

#### 常用属性及方法

**document.cookie** -- 用来操作浏览器 Cookie

**document.createElement(name)** --  用来生成元素节点，并返回该节点。

**document.getElementsByTagName(name)** --  搜索HTML标签名，返回符合条件的元素

**document.getElementsByClassName(name)** --  返回包括了所有class名字符合指定条件的元素

**document.getElementById(id)** --  返回匹配指定id属性的元素节点

**document.querySelector(selector)** --  接受一个CSS选择器作为参数，返回匹配该选择器的元素节点

**document.querySelectorAll(selector)** -- 与querySelector类似，区别是返回一个包含所有匹配给定选择器的节点集合。

> 练习：打开NGBE，在Flight页面找到 `id=submit_button` 的元素

### Element（元素）
>Element对象对应网页的 HTML 元素。每一个 HTML 元素，在 DOM 树上都会转化成一个Element节点对象

#### 常用属性及方法

**Element.id**

**Element.tagName**

**Element.innerHTML** -- 返回该元素包含的HTML代码

**Element.outerHTML** -- 返回指定元素节点的所有HTML代码，包含自身及子元素

**Element.querySelector()**

**Element.querySelectorAll()**

**Element.getElementsByTagName()**

**Element.getElementsByClassName()**

**Element.append()** -- 在当前元素内部插入一个节点

**Element.remove()** -- 将当前元素节点从DOM树删除。


> 练习：打开NGBE，在Flight页面删掉 `id=submit_button` 的元素

### Event（事件）

#### 事件种类

- 鼠标、键盘、表单、拖拉、文档事件......

#### 如何绑定一个事件

- 在HTML代码中绑定

	```html
	<button onclick="func()"></button>
	```
- 通过JS绑定
	- addEventListener(eventType, handler, useCapture)： 绑定监听函数
	- removeEventListener(eventType, handler, useCapture)：移除监听函数

	```javascript
	const elem = document.getElementById('hello');
	
	elem.addEventListener('click', () => {
		console.log('Hello');
	});
	```

	[小小小小小练习](https://codepen.io/anlihuer/pen/bvaxBv?editors=1010)
	
#### 事件冒泡
当事件触发后，事件流从目标节点开始，逐层向上冒泡直至根节点

[小小小小小小🌰](https://codepen.io/anlihuer/pen/GxQMYz?editors=1011)


#### 事件捕获
当事件触发后，事件流从根节点开始，逐层向下至目标节点。

[小小小小小小🌰](https://codepen.io/anlihuer/pen/eMVGxv)


#### 事件代理(Event Delegation)
> 通过对目标元素的父级元素绑定相关事件，当对目标元素进行操作时，事件流冒泡至绑定事件的父元素上，通过对事件target元素的判断（e.target），来间接性（暂且这样理解）的为目标元素绑定事件。

事件代理的作用：当目标元素（可能是一组元素）不断的添加删除时，所有的目标元素都可以成功绑定事件，而无需在每次新添加目标元素是都要为其重新绑定事件。

[小小小小小小🌰](https://codepen.io/anlihuer/pen/OvzwzR?editors=1111)

<!--#### 事件循环（Event Loop）
	同一个DOM上绑定两个事件，order?-->

<!--
#### Some Tips

##### Event.preventDefault()
>如果一个事件没有得到明确的处理，则该事件的默认行为会被阻止。但该事件还会继续冒泡，除非他的某一事件监听器调用`stopPropagation()`或者 `stopImmediatePropagation()`。此外，如果事件的属性`cancelable=false`,则表明该事件没有默认行为，调用该方法无任何作用。

对事件的默认行为的理解:

- 🌰
	一个`type=“submit”`的`button`元素,当触发click事件时，会自动提交表单。
	
	```html
	<button id='btn' type='submit'></button>
	```
	
	```javascript
	document.getElementById('btn').onclick = function(e) {
	    e.preventDefault();
	});
	```
	使用preventDefault可以阻止表单自动提交

- 🌰
	一个`<a></a>`，为其设置Attribut`src='***'`后，当用户点击链接，当前页面会自动跳转至指定页面。现在有一个需求：希望用户点击链接是打开一个新的页面，而非在当前页面跳转
	
	```html
	<a id='link' src="www.google.com"></a>
	```
	
	```javascript
    document.getElementById('link').onclick = function(e) {
        e.preventDefault();
	
        window.open(this.href);
    });
	```

##### Event.stopPropagation()
> 阻止事件冒泡

##### return false
- event.preventDefault()
- event.stopPropagation()
- 跳出当前函数、循环，不在执行之后的逻辑代码。
	-->
	
## Debug
## Recommend
1. [How browsers work](http://taligarsiel.com/Projects/howbrowserswork1.htm)
   [中文版](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork)
2. [浏览器渲染原理简介](https://coolshell.cn/articles/9666.html)
3. [DOM 模型概述](http://javascript.ruanyifeng.com/dom/node.html)
4. [Javascript defer vs async](http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html)
