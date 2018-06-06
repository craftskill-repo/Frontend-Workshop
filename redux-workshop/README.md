# redux-workshop
-------

# 为什么需要 Redux
![you might not need redux](http://blog.isquaredsoftware.com/presentations/2018-03-redux-fundamentals/static/media/you-might-not-need-redux.6ed95d25.png)

## 有什么问题
### jQuery 与 React 之间的交互
https://codesandbox.io/s/0my672voxn

### 跨多个组件的状态共享

```
App
  ProductHouse  (updateHouseSelection price)
    Total
  ProductCar    (updateCarSelection price)
    Total
  SummaryPage   (subscribeProductChange)
    ProductDetails
    Total
```

#### 需要都组织到 App 这个级别的组件吗？扩展性？
#### 触发一次 Product 价格的更新用什么方法？
`this.props.updateProduct({ name: 'car', price: 0 })`

#### 计算 productTotal 的逻辑代码如何复用

```
const total = _.sumBy(state.product, 'price');
```
这段代码应该放在每个 `<Total />` 组件中吗

#### 如果整个应用的数据需要被客户端存储起来呢？(localStore)
这部分存储逻辑写在哪？是否需要集中管理数据？如果数据分散在许多个 container 组件中，如何做到存储整个应用的数据？

## 数据越来越多且越来越复杂，你需要一个集中管理数据的方案，保证你的 View 更加地轻量，反馈交互/渲染页面 react(data) => page

# 什么是 Redux
## Redux Principles

### 单一数据源
![6024ef30-312a-4c7c-bfd2-eb72fba097ef](md/6024ef30-312a-4c7c-bfd2-eb72fba097ef.png)
### state是只读的

### 通过纯函数派生state
![1_wLRhZ0wtI0duLsigdxL1CA](md/1_wLRhZ0wtI0duLsigdxL1CA.png)

## 基本概念
### Actions
1. Action是一个Plain Object
2. Action必须声明type

```js
const ADD_TODO = 'ADD_TODO'

const action = {
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```
### Reducers
Reducer是一个纯函数
Reducer对于不同的Action进行响应

```js
(previousState, action) => newState
```

#### Never Do
1. Mutate its arguments;
2. Perform side effects like API calls and routing transitions;
3. Call non-pure functions, e.g. Date.now() or Math.random().


### Store
+ 保存应用状态的仓库

+ 通过 `getState()` 访问;

+ 通过 `dispatch(action)` 更新我们的state;

+ 通过 `subscribe(listener)` 来响应store的变化;


## 数据流动
![redux-data-flow-with-angular-2-19-638](https://camo.githubusercontent.com/5aba89b6daab934631adffc1f301d17bb273268b/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6d656469612d702e736c69642e65732f75706c6f6164732f3336343831322f696d616765732f323438343535322f415243482d5265647578322d7265616c2e676966)
## 和React配合使用
### Presentation & Container
 ![container-and-presentational](md/container-and-presentational.jpg)

### React-Redux

1. Provider

Provider提供Store的注入

2. Connect(mapStateToProps, mapDispatchToProps)

将React组件接入Store

3. mapStateToProps

store.getState()的语法糖

4. mapDispatchToProps

store.dispatch()的语法糖


# 语重心长的总结

## Well Redux is just a pattern

```
import React, { Component } from 'react';

const counter = (state = { value: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 };
    case 'DECREMENT':
      return { value: state.value - 1 };
    default:
      return state;
  }
}

class Counter extends Component {
  state = counter(undefined, {});

  dispatch(action) {
    this.setState(prevState => counter(prevState, action));
  }

  increment = () => {
    this.dispatch({ type: 'INCREMENT' });
  };

  decrement = () => {
    this.dispatch({ type: 'DECREMENT' });
  };

  render() {
    return (
      <div>
        {this.state.value}
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    )
  }
}
```

# what is dataStore
# Further reading
[redux official docs](https://redux.js.org/)

[Redux author Dan Abramov egghead videos](https://egghead.io/instructors/dan-abramov)