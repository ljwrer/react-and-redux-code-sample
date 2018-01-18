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

与Flux差别
	1. Actions只生成action而不派发
	2. Dispatcher对象简化为store的dispatch函数
	3. 注册reducer不再修改状态,而是返回新的状态
	4. 全局唯一数据源
	5. 统一的数据获取接口getState()
	6. 统一的pub/sub接口

### 3.2.3 容器组件和傻瓜组件
容器组件:负责和Redux Store交互
傻瓜组件：无状态展示组件，只负责展示  

容器组件通过prop传递状态给傻瓜组件

分离出的容器组件有类似的逻辑

### 3.2.4 组件context
一个应用只在一个地方导入store，其他地方通过context访问store

#### context
provider实现:
 - getChildContext
 - static childContextTypes

需要context的组件实现
 - constructor
	 - super(props,context)
 - static contextTypes
 - 通过this.context调用store

context类似全局变量 谨慎使用

### 3.2.5 React-redux
1. 提供connect连接容器组件和傻瓜组件
2. 提供Provider提供store的context

#### connect
1. 把store上的状态转化为内层傻瓜组件的prop
2. 把内层傻瓜组件的用户动作转化为派送的store动作

```js
const containerComponent = connect(mapStateToProps,mapDispatchToProps)(DumpComponent)
const mapStateToProps = function(state, ownProps){
	return {
		// value from store
		value:state[ownProps.tag] 	
	}
}
const mapDispatchToProps = function(dispatch, ownProps){
	return {
		// dispatch action  	
		onClick: ()=>{
			dispatch(Actions.add(ownProps.tag))		
		}	
	}
}
```

#### Provider
提供统一的store访问接口，无需手动注入

componentWillReceiveProps:检查代表store的prop是否一致

# 4. 模块化
### 4.2.2 按功能组织
```

│  index.js
│  Store.js
│
├─filter
│  │  actions.js
│  │  actionTypes.js
│  │  filterType.js
│  │  index.js
│  │  reducer.js
│  │
│  └─view
│          Filter.js
│          Link.js
│
└─todos
    │  actions.js
    │  actionTypes.js
    │  index.js
    │  reducer.js
    │
    └─view
            TodoAdd.js
            TodoItem.js
            TodoList.js
```
统一模块导出接口
```js
import view from './view/TodoList'
import reducer from './reducer'
import * as actions from './actions'
export {
    view,
    reducer,
    actions
}
```

## 4.4 状态树的设计
 - 一个模块控制一个状态节点
	 - 拥有修改权
 - 避免冗余数据
	 - reselect提升性能
 - 树形结构扁平

### 4.5.1 状态设计
避免用数字取代枚举类型，应该使用具体的字符串或Symbol，方便调试

### 4.5.2 action
action type需要共同的前缀提供命名空间

### 4.5.3 组合
combineReducers会将state对象拆分交给指定的reducer处理，处理完后会合并

mapStateToProps能拿到完整的state
```
const store = createStore(combineReducers({
    todos:todosReducers,
    filter:filterReducers
}))
```

### 4.5.4 视图
#### ref
将dom绑定到组件

 - @type func
	- @parma node

```
refInput(node){
	this.input = node
}
```
谨慎使用ref,不应该让ref跨越组件边界

#### jsx
jsx能插入表达式,但是不能插入语句

#### bindActionCreators
参数一致时简化代码
```
const mapDispatcherToProps = dispatch => (
    bindActionCreators({
        onRemove: deleteTodo,
        onToggle: toggleTodo
    },dispatch)
)
```
```
const mapDispatcherToProps = {
    onRemove: deleteTodo,
    onToggle: toggleTodo
}
```

### 4.5.6 不使用ref
监听change事件并使用state保存表单状态

## 4.6 devtool
 - react devtools
 - redux devtools
 - react perf(过期)
 - redux-immutable-state-invariant
	 - 监控state修改
	 - dev only

#### compose,applyMiddleware
 - compose
	 - 组合多个store Enhance
 - applyMiddleware
	 - 组合多个middleware

```js
const win = window
const middlewares = []
let composeEnhancers = compose
if(win && win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__){
    composeEnhancers =  win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
}
if(process.env.NODE_ENV!=='production'){
    middlewares.push(require('redux-immutable-state-invariant').default())
}
const storeEnhancers = composeEnhancers(applyMiddleware(...middlewares))
const store = createStore(reducer,{},storeEnhancers)
```
