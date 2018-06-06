
# React

## Hello React

```javascript
render(<p>hello, world</p>, document.querySelector('#app'));
```

## JSX语法

### 什么是JSX

JSX是javascript语法的拓展，使用JSX可以很好的在javascript中进行UI元素的的描述。

```js
const element = <h1>Hello, world!</h1>;
```

### 为什么选择JSX

+ 石器时代
![](https://github.com/traveloka/soya/wiki/old-mindset.png)

+ 青铜时代
![](https://github.com/traveloka/soya/wiki/new-mindset.png)

+ 铁器时代
![](https://github.com/traveloka/soya/wiki/new-mindset-react.png)

React的思想就是整合所有的逻辑与UI部分，打包形成独立的具有完整功能的组件。React本身并不要求使用JSX语法，但是JSX与React的思想却是意外的契合。


+ 机械时代(Future)
![](https://github.com/traveloka/soya/wiki/new-mindset-react-webpack.png)


### 基本语法

```js
const element = <div tabIndex="0"></div>;
//使用双引号代表字符串

const element = <img src={user.avatarUrl}></img>;
//使用花括号代表js表达式

const element = <span classNames="foo" />
const tabItem = <span tabIndex="1" />
//使用驼峰式命名来替换HTML中一些原生的属性  class->classNames tabindex->tabIndex
```

## React元素

### 元素生成
我们常用使用的JSX语法经过babel转译，实际上会被转译成以下代码。

```js
const element = (
    <h1 className="greeting">
        Hello, world!
    </h1>
);

//babeled
const element = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello, world!'
);

//React.createElement 最后会生成一个类似这样的object
// Note: this structure is simplified
const element = {
    type: 'h1',
    props: {
      className: 'greeting',
      children: 'Hello, world!'
    }
};

```
React使用这个Object去构造DOM并且保持DOM更新.

## React组件

### 从元素到组件
我们之前提到了React元素, 但是更多的我们会听到React组件这个词。事实上，React元素是React组件的最小组成单位。

```js
// React元素 也是一个单位的React组件.
const foo = <h1>Hello, world</h1>;
 
// React组件
const Bar = () => (
    <div>
        <Foo />
        <Foo />
    </div>
)

//命名规范，React组件必须大写开头驼峰命名.
```
### 组件挂载

React组件是怎么真正挂载在我们的真实的浏览器的DOM上的呢？

```
// index.html
// 建立节点

<div id="root"></div>
```

```js
const Component = <h1>Hello, world</h1>;
s
//将我们的组件挂载到对应的节点上
ReactDOM.render(Component, document.getElementById('root'));
```

### 组件更新

在讲React元素的时候我们其实提到过，对于React来说，我们的JSX语法最后会被转译成一个个的React Object, 对于组件的更新实际上就是对这些Object的更新。

#### 使用Props更新组件
##### 什么是Props？
![Props](http://qlt.com/images/detailed/1/new-props.png)

组件是木偶，木偶的装饰和行为由Props决定.

**!!! Props是只读的**

### Try time
#### functional component

```
const Hello = props => <p>Hello, my world. {JSON.stringify(props)}</p>;
render(<Hello a="1" b={Date.now()} />, document.querySelector('#app'));
```

#### class component
[class properity](https://babeljs.io/repl/#?babili=false&browsers=&build=&builtIns=false&code_lz=ATDGBsEMGduAhA9gJwNbAN4CgQgPR4AKyiADgKbIAuAnsAJYB29V9k49AXpcNDY1UgAPHLibRBjUOWJlKtYAF5gAIgBGKVCoDcokBoCujACYAxI6FaJGS4AAoAlEoB8mPbmTkqB5DaoALemgAOnFJaVkKahpdXGAAX3d3CBhoAFkvf0RjRzc4kFBraERwcmDwRABzOwCggBpgAHIAM0RERodY3ET3AgBlQVZQMChYYFISKNZyaHcJSCHeQfpQSPk6ZXVINXJwAEloAGE28B055eH5ofMpKxtlZos73Ox84E9vXwRNYKuVteiXRAiWBWFEpSowAAtjQkGhbIxyAB3b5oXSiAgAhRMFhsDjcZBwSCeYCMRCQ6zAALkcYkKjkmgUYKiQqMYqlcpVOwwuGoYIAfX5E3JiEFwUMJhulno1k6wAIwFcRmM5GaTHIxjB-DwSGVwEetxlbOAxJpEuMVMQVP8NJSYzCkCkZRZRRKZQq1R5P3NUruwVA7HAdmVqvVxgccoVrnUmhUWvleAGCxW-qeRuA5CEQSocEp1JGqWZBVdHI9dl5vwuvqNjkjeEVqjU212B2OJTjQA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&lineWrap=true&presets=es2015%2Creact%2Cstage-0&prettier=false&targets=&version=6.26.0&envVersion=)

```
import React, { Component } from 'react';
import { render } from 'react-dom';

class Welcome extends Component {
    render() {
        return <p>Hello, welcome to my world. {JSON.stringify(this.props)}</p>;
    }
}

render(<Welcome a="1" b={Date.now()} />, document.querySelector('#app'));
```

#### Composing Components

```
class Welcome extends Component {
    render() {
        return <p>Hello, welcome to my world. {JSON.stringify(this.props)}</p>;
    }
}

const WelcomeTheTeam = () => (
    <div>
        <Welcome name="zhangsan" />
        <Welcome name="lisi" />
        <Welcome name="wangmazi" />
    </div>
);

render(<WelcomeTheTeam />, document.querySelector('#app'));
```

#### 使用state更新组件
组件通过接受父级组件传入的Props具备了一些行为，同时组件内部维持的state去控制组件自己的一些行为。
![](https://cdn-images-1.medium.com/max/1200/1*ZKm9tPsTGzlCUXBJ-wST-A.jpeg)


##### we want to update the timestamp
想要成为一个有state的组件，组件必须派生自React.Component

```
class Welcome extends Component {
    render() {
        return <p>Hello, welcome to my world. {Date.now()}</p>;
    }
}

render(<Welcome />, document.querySelector('#app'));
```

##### use state and setState to update UI(by click the button)
```
class Welcome extends Component {
    state = {
        time: Date.now(),
    };

    render() {
        return <p>
            Hello, welcome to my world. {this.state.time}
            <br/>
            <button onClick={() => this.setState({ time: Date.now() })}>update</button>
        </p>;
    }
}
```
props和state实际上也是对我们的React Object的更新。通过更新React Object，React内部会进行高效的浏览器DOM的diff更新.


## 事件处理
React的事件和HTML原生的事件非常的类似，你需要做的仅仅是声明事件响应的函数以及绑定事件。

```js
//html原生
<button onclick="activateLasers()">
  Activate Lasers
</button>

//React的事件绑定
<button onClick={activateLasers}>
  Activate Lasers
</button>

```

[React Events详细介绍](https://reactjs.org/docs/events.html)

### 组件的生命周期

一旦使用了es6 class的方式声明了一个React组件，那么这个组件便拥有了完整的React生命周期。

![](https://rangle.github.io/react-training/img/reactjs_component_lifecycle_functions.png)
[http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)


##### automachine: use setinterval and lifecycle to update state
```
class Welcome extends Component {
    state = {
        time: Date.now(),
    };

    componentDidMount() {
        setInterval(() => this.setState({ time: Date.now() }), 1000);
    }

    render() {
        return <p>
            Hello, welcome to my world. {parseInt(this.state.time / 1000)}
        </p>;
    }
}
```

## 条件渲染

```
const LoggedIn = ({ name, onClick }) => (
    <p>
        Hi, {name}. you already logged in. want{' '}
        <button onClick={onClick}>Logout</button>
        ?
    </p>
);

const LoggedOut = ({ onClick }) => (
    <p>
        Hi, come on <button onClick={onClick}>Login</button>
    </p>
);

class Welcome extends Component {
    state = {
        isLoggedIn: false,
    };

    login = () => {
        this.setState({ isLoggedIn: true });
    };

    logout = () => {
        this.setState({ isLoggedIn: false });
    };

    render() {
        return (
            <span>
                {this.state.isLoggedIn && 'yay...  '}
                {this.state.isLoggedIn ? (
                    <LoggedIn onClick={this.logout} />
                ) : (
                    <LoggedOut onClick={this.login} />
                )}
            </span>
        );
    }
}
```

## 多个重复元素渲染

有时候我们会有这种需求
![15234635810547.jpg](http://oax4654gb.bkt.clouddn.com/2018/4/12/15234635810547.jpg)

每一个帖子其实都是一个可以重复使用的React组件，只不过是其中填充的内容不同。

这种时候我们就可以使用一个对象的数组（对象包括每个帖子的具体内容）来构建我们的帖子列表。

```
const apple = (
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACKUExURUdwTGiYNm6MOmmaNXKZQG6VPI+yZ3idSHSUQYCjUmeXNHCePnJVKI6xZW2fOWRDG5CzZ1o4F1qGLGdDHn20P6zUf3K7JLHXhbfajr3emMPhocnkq6bQeGibMoXEQXzAMo3HT3a3LpXKXJ3NaXaqQG6iOX6tUIm2WlqNL3q2N5zCcpPAZZS2alAxDkhhy0YAAAAUdFJOUwDLQ5Ua995eDTOyfPyq4fj2s+iCxMw9HQAABG9JREFUWMPVmOlyokAUhcPaCCIacQ0YlWaR5f1fb+7tBRoFJDNTNTWXipU/fJ5zN2g/Pv77MBc6IWSxcP6I4uiGZrFYuR5nOb+FcT+LOE1pxsMHYcQwf84xEEMRk+d5na+z3LYzf86d281m0SXHLRROXlVVXWfZmszgbJqm2cgcOMABVwAKGamqygr+sWc404OmCZbyG72CpUcqAkEZzet6jrOP7RJCSNJZmhEUZiFay1JaJbW9mJVdRtKFsThFEk9SSOM0A2+1P6/65gZAWyFIiRgxVVLl8wTh/egN02kIABcFWaqwark3u3dIsAzAm6kVhchR1pY/z/35zehsgmALrVgUsmi05WSzjWEsgmDjkOLTg+lg/QhdxKuW2fqPBmMbBEQryIcDn5hlOWiZ/16PYy4I8YjOxlsPgs9Cg+F0VzEzaLF0a+Rt4U3i2+t1Xa/Xto/zvWmCYrWiaXqL91C2GFaI4elv0+wQGyBlWUbwBzTbtgAETi6X7+89RJrG1ozVsfDXdRntdrvDAT4ipGVBU1T3+/XKSbcHTWPtXZ51GzGHLpC2bKwoUUlhGq+mtwcBjsAcjy3KAhAjgTsGektaCM5RxgEtHupmCaAKJQlSCEO7GndnAkfFACcqYaTyYMnG4irMIQhI2mgf+UwPQ5xYHA9RCXunaJoipjAVd0USuHNHOomsBefUBiPRYrksYG0kCcu3BIWpNZwm068jhXOGC1HgryyrMopEvlnhGAjMmSOCWs5ZBkNhAVlTJT1vY5KEoB7nLFW1INUbjd3B0kOGuCAEfEEIElPESJilrm4gaTVQOFKXQpDkCJQgDYJiMuWsxTDSszeeJA6i8evOdvxaOFMEMUmDoJsAGUNdvWudqYq4t+FshwM92eW6B/qSHfBsjZct1cZAL4q+phVpf0vRlLXT/GSP5ujFW7+PdokE3R6jVZOgHqmbNgRFXUNO9BErf2/Wvs59DnY2G//9ZGdjQ+5mTH8fNDBrAIp26l47i4WkCnpaI+HgQvJgz8rFf1J2ZDf7QtB0rvmilaTT8YUTDQgaHH58FEUtSY2DMKZs2ilnbGXvOOnQx0jOs6BhZ5CknD3zVdShw0RJoj6z+coefkTqWR1x0tOzX+p5EeQOv5OYWp5IErDYJTEtpydo7OnvZUhqUZIywhl7qmHdVtk9Yaioz0n6HFn78Xdsg+ZAQhSDMS0S03LeC0JJ4fWOKM4SFMB0HGlsIkPshEiRxFkyBOaJQ0dfRYQkerkyFMDuyLhfJeaJY02/RHophbvghep6ZxeGgpEcyLTx5t3YjW8XjOtFQlpMp2c609JcfIMbL5zAKYIj647Tar0/hZA43n8rsZdqFM5UCylpAhKLlvGEwZfHOcc0x5CkYQxwtHnHtD7phhQFE844PrQkcJfeWDwefcqPOJjxFZzvHiFe/aCzfckl51qAwjsplQyIeQesJ3sanszxnBennIFHPpf8/Nci03M1zTXg0+IMw5txbBxhmfj9pk4MwyB/9kvYP4lfovMdXV5nBr8AAAAASUVORK5CYII=" />
);

const PeopleWantMessage = ({ icon, name }) => (
    <p>
        {name} want eat {icon}
    </p>
);

const wantApple = ['zhangsan', 'lisi', 'wangmazi'];

const Apples = ({ peoples }) =>
    peoples.map((name, index) => (
        <PeopleWantMessage icon={apple} name={name} key={`${name}${index}`} />
    ));

render(<Apples peoples={wantApple} />, document.querySelector('#app'));
```

## 表单

如果你尝试写过使用了input的组件，并且期望其默认行为与html的行为一致，你会得到让你失望的结果。
React是单向数据流，所以在React中要进行表单的填写是一件很麻烦的事情。

![](https://image.slidesharecdn.com/react-150410184943-conversion-gate01/95/react-52-638.jpg?cb=1428692033)

```js
class TodoMvc extends Component {
    state = {
        todos: [],
        newItem: '',
    };

    handleSubmit = e => {
        e.preventDefault();
        alert(this.state.newItem);
    };

    handleChange = e => this.setState({ newItem: e.target.value });

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <header className="header">
                    <h1>todos</h1>
                    <input
                        className="new-todo"
                        placeholder="What needs to be done?"
                        autofocus
                        onChange={this.handleChange}
                        value={this.state.newItem}
                    />
                </header>
            </form>
        );
    }
}

render(<TodoMvc />, document.querySelector('#app'));

```

[另一种选择，uncontrolled component](https://reactjs.org/docs/uncontrolled-components.html)

## 组件的数据传递和设计思想
- 通过 props 向下传递数据
- 通过 callback 告知父层组件的变化
- 通过 state management 打通平级组件以及更好的组件通讯
- Dumy UI 组件
- Container 组件

# WorkShop Time TODOMVC
[http://todomvc.com/examples/react/#/](http://todomvc.com/examples/react/#/)

HTML template: `src/index.html`

# React dev tool
[https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

# Futher reading
https://medium.com/shoutem/react-to-bind-or-not-to-bind-7bf58327e22a