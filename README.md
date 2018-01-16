## 1.2
React使用事件委托处理事件,无论多少个onClick,最后都之添加一个事件处理函数,
挂在最顶层节点

## 2.2
### 2.2.1
使用babel-react-optimize在生产环境移除propTypes

### 2.2.2
使用static defaultProps提供默认值

## 2.3 生命周期
### 2.3.1 装载过程
1. constructor
2. getInitialState,getDefaultProps *
3. componentWillMount
4. render
5. componentDidMount


1.constructor
 - 初始化state
 - 绑定成员函数的this(ES autobind-decorator)

3.render
返回一个jsx描述的结构，由React来操作渲染过程
render应该是一个state和props的纯函数

4.componentWillMount和componentDidMount
componentWillMount修改状态不会引发重新绘制?如果要修改就去construct修改
componentWillMount可以用来生成日志,服务端会调用

componentDidMount不是紧跟render调用,要等到react更新DOM后
componentDidMount用来ajax或调用第三方库,服务端不会调用

Mount logs:
```
enter constructor: Parent
enter componentWillMount Parent
enter render Parent
enter constructor: first child
enter componentWillMount first child
enter render first child
enter constructor: second child
enter componentWillMount second child
enter render second child
enter componentDidMount first child
enter componentDidMount second child
enter componentDidMount Parent
```

### 2.3.2 更新过程

Parent Update logs:
```
enter componentWillUpdate Parent
enter render Parent
enter componentWillReceiveProps first child
enter shouldComponentUpdate first child
enter componentWillUpdate first child
enter render first child
enter componentWillReceiveProps second child
enter shouldComponentUpdate second child
enter componentWillUpdate second child
enter render second child
enter componentDidUpdate first child
enter componentDidUpdate second child
enter componentDidUpdate Parent
```
Child Update logs:
```
enter shouldComponentUpdate second child
enter componentWillUpdate second child
enter render second child
enter componentDidUpdate second child
```

1.componentWillReceiveProps(nextProps)
parent render->componentWillReceiveProps->shouldComponentUpdate-(true)-componentWillUpdate->render-componentDidUpdate
当父组件render函数被调用时触发,并不是当prop变化时才被调用
>forceUpdate,手动触发render
>不提倡在jsx中使用匿名函数,可能引发子组件不必要的重新渲染

2.shouldComponentUpdate
性能优化的关键,避免不必要的渲染
3.componentWillUpdate,componentDidUpdate
componentDidUpdate与componentDidMount类似,也在dom更新后执行
用来调用第三方库调用第三方库,服务端会调用,但不应该调用

### 2.3.3 卸载过程
UnMount logs:
```
enter componentWillUpdate Parent
enter render Parent
enter componentWillReceiveProps first child
enter componentWillUpdate first child
enter render first child
enter componentWillUnmount second child
enter componentDidUpdate first child
enter componentDidUpdate Parent
```
移除非react创造的dom和事件

## 2.4
需要挂载在render的方法在construct中先bind

## 2.5 prop和state局限
耦合度高,使用全局状态作为唯一可靠的数据

# 3.Flux和Redux
## 3.1 Flux
更严格的数据流控制，防止model与view直接对话

类似后端MVC 请求->controller->model->view->请求,单次请求通过控制器拿到数据渲染视图,从view触发(a标签或表单提交)新的渲染
flux:action->dispatcher->store->view->action,action通过dispatcher分发,拿到store数据渲染视图,从view触发action触发新的渲染

渲染完成后只能发送新的请求或触发新的action

![](https://facebook.github.io/flux/img/flux-simple-f8-diagram-explained-1300w.png)

mvc增加功能需新增控制器或控制器暴露的函数，flux增加新的action

### 3.1.2 Flux应用
#### 1.dispatcher
所有应用共用一个即可，分发action

#### 2.action
 - actionTypes
 - actionCreator
	 - @param args
	 - 创造action对象并派发

#### 3.store
 - 提供获取数据接口，返回不可变数据
 - 提供修改数据订阅，通知外部获取新的数据
 - 注册函数到dispatcher保存token
	 - 在注册的函数处理分发的action,修改数据并发送广播
	 - 注册的函数会处理每个action，用来处理实际的业务逻辑
 - waitFor
	 - 定制函数处理顺序

#### 4.view
 - 创建时通过store暴露的接口读取store数据初始化组件状态
 - 通过订阅store监听数据变化更新组件状态
 - 通过actionCreator生成并派发action改变store状态

组件不再从prop获取状态，而从store中获取

 - Flux优势
	 - 限制混乱数据流
 - Flux缺陷
	 - store之间显式依赖
	 - 因为store用户唯一，使用session维护成本巨大，难以服务端渲染
	 - store状态和逻辑混杂（数据和注册函数在一起）

## 3.2 Redux
 - 单一数据源
	 - 树形对象
 - 保持状态只读
	 - 创造新的对象返回给Redux
 - 数据改变只能通过纯函数完成
	 - reducer(state, action)=>new state
	 - reducer只负责计算状态,不负责存储状态

``` js
function reducer(state,action){
    const {type,counterCaption} = action
    switch (type){
        case ActionTypes.increment:
            return {...state, [counterCaption]:state[counterCaption]+1};
        case ActionTypes.decrement:
            return {...state, [counterCaption]:state[counterCaption]-1};
        default:
            return state
    }
}
```

### 3.2.2 Redux实例
 - ActionTypes
 - Actions
	 - pureFunc
	 - @return action:{type,...}
 - Store
	 - createStore
		 - @param reducer
		 - @param initValues
		 - @param store Enhancer
		 - @return store
	 - getState
		 - @return storeState
 - Reducer
	 - pureFunc
	 - @param state
	 - @param action
	 - @return new state
 - View
	 - 实现接口处理store.getState()提供的数据
	 - 通过Actions生成action,然后通过store.dispatch(action)派发action
	 - 订阅store同步数据
		 - construct或mount时调用

store设计原则：避免冗余数据  
使用扩展操作符简化代码

### 3.2.3 容器组件和傻瓜组件
容器组件:负责和Redux Store交互
傻瓜组件：无状态展示组件，只负责展示  

容器组件通过prop传递状态给傻瓜组件

分离出的容器组件有类似的逻辑

### 3.2.4 组件context
一个应用只在一个地方导入store，其他地方通过context访问store

#### context
provide实现:
 - getChildContext
 - static childContextTypes

需要context的组件实现
 - constructor
	 - super(props,context)
 - static contextTypes
 - 通过this.context调用store

context类似全局变量 谨慎使用
