# 1. react思维
## 1.2 react事件
React使用事件委托处理事件,无论多少个onClick,最后都之添加一个事件处理函数,
挂在最顶层节点

# 2. react组件
## 2.2 数据
### 2.2.1 prop
使用babel-react-optimize在生产环境移除propTypes

### 2.2.2 state
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

## 2.4 向外传递
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
	- 自动订阅store
2. 提供Provider提供store的context
	- 自动实现context
	- props自动传递

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

# 5. 组件性能优化
## 5.1 单组件优化
### 5.1.1 渲染时间
优化计算virtual dom的时间,防止不必要的render调用

### 5.1.3 react-redux shouldComponentUpdate
默认shouldComponentUpdate返回true

react-redux connect生成的容器组件定制了shouldComponentUpdate，自动比较props
> === 全等比较（shallow compare）

即使傻瓜组件不从store获取数据也可以自动创建shouldComponentUpdate
```
connect()(SomeDumpComponent)
```

1. 注意props传递的对象尽量保持不变
	- 在render中新建的对象，包括匿名函数，对象字面量(如style)等每次都与上次的不全等
2. 底层的组件尽量通过mapDispatchToProps处理事件，而不是通过父组件传递回掉函数处理,达到高内聚的目的

## 5.2 多个react组件的性能优化
关注更新过程

### 5.2.1 React调和
局部更新
UI -> render -> virtual DOM -> Reconciliation

>diff树时间复杂度为O(N<sup>3</sup>)

React diff树时间复杂度为O(N)，为了性能而妥协

#### diff过程
I.比较根节点类型是否相同:
1.节点类型不同
卸载原来的组件 componentWillUnmount—>componentWillMount->render->componentDidMount
>提供稳定的根节点

2.节点类型相同
DOM元素:保留DOM元素,对比根节点属性和类型,更新修改的部分(如className,style)
React组件:props update -> componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate->render->componentDidUpdate
>重视shouldComponentUpdate

然后递归处理节点

3.多个子组件的情况
>diff数组时间复杂度为O(N<sup>2</sup>)

React diff树时间复杂度为O(N)，为了性能而妥协,直接挨个比较
![](https://res.infoq.com/articles/react-dom-diff/zh/resources/0909005.png)

### 5.2.2 key
通过key避免挨个比较，避免重复渲染
![](https://res.infoq.com/articles/react-dom-diff/zh/resources/0909006.png)

key和ref是react保留的特殊属性，不能读取

提供稳定不变的key

使用Array index作为key没有任何意义,如果数组元素位置替换,将造成数组中大量组件更新

## 5.3 reselect
memorize(高阶函数闭包缓存计算结果)加速mapStateToProps

### 5.3.1 选择过程
1. 对比依赖的字段有无变化
2. 没有变化则直接从缓存读取

reselect -> selector

selector:(pure)
 - @param state
 - @return mapStateToProps param

#### reselect
1. 抽取state做shallow compare决定是否使用缓存结果
2. 取第一层结果计算返回最终的结果

```
const getFilter = state => state.filter
const getTodos = state => state.todos
const getShowList = createSelector([getTodos, getFilter],function (todos,filter) {
    switch (filter){
        case filterType.all:
            return todos
        case filterType.completed:
            return todos.filter(todo=>todo.completed)
        case filterType.unCompleted:
            return todos.filter(todo=>!todo.completed)
        default:
            throw new Error('unsupported filter type')
    }
})

const mapStateToProps = function (state) {
    return {
        todos:getShowList(state)
    }
}
```

### 5.3.2 范式化状态数
保持状态数扁平

遵循关系型数据库设计原则

降低修改难度

提高读取难度（reselect加速join）

# 6. React高级组件
## 6.1 高阶组件
HOC:
 - @param component
 - @param some extra param
 - @return enhanced component

作用:
 - 重用代码
 - 修改现有组件的行为

实现方式:
 - 代理方式的高阶组件
 - 继承方式的高阶组件

### 6.1.1 代理
两个组件都要经历各自的生命周期

#### 1.操纵prop
```js
const addNewProps = function (WrappedComponent, newProps) {
    return class WrappingComponent extends Component{
        render(){
            return <WrappedComponent {...this.props} {...newProps}/>
        }
    }
}
```

#### 2.访问ref
获取顶层节点，不推荐使用
```js
const getRefHOC = function (WrappedComponent, newProps) {
    return class WrappingComponent extends Component{
        constructor(){
            super(...arguments)
            this.getRef = this.getRef.bind(this)
        }
        getRef(node){
            this._root = node
        }
        render(){
            return <WrappedComponent {...this.props} {...newProps} ref={this.getRef}/>
        }
    }
}
```

#### 3.抽取状态
```js
const connect = function (mapStateToProps, mapDispatchToProps) {
    return function (WrappedComponent) {
        return class ConnectWrappedComponent extends Component{
            render(){
                const store = this.context.store;
                const newProps = {
                    ...this.props,
                    ...mapStateToProps(state,this.props),
                    ...mapDispatchToProps(store,dispatch,this.props)
                }
                return <WrappedComponent {...newProps} />;
            }
        }
    }
}
```

#### 4.包装组件
```js
const styleHOC = function (WrappedComponent, style) {
    return class HOCComponent extends Component{
        render(){
            return <div style={style}>
                <WrappedComponent {...this.props}/>
            </div>
        }
    }
}
```

### 6.1.2 继承
#### 1.操纵props
当高阶组件需要依赖WrappedComponent渲染结果才使用
```js
const modifyPropsHOC = (WrappedComponent) => {
  return class NewComponent extends WrappedComponent {
    render() {
      const elements = super.render();
      const newStyle = {
        color: (elements && elements.type === 'div') ? 'red' : 'green'
      }
      const newProps = {...this.props, style: newStyle};
      return React.cloneElement(elements, newProps, elements.props.children);
    }
  };
};
```
#### 2.操纵生命周期函数

```js
const onlyForLoggedinHOC = (WrappedComponent) => {
    return class NewComponent extends WrappedComponent {
        render() {
            if (this.props.loggedIn) {
                return super.render();
            } else {
                return null;
            }
        }
    }
}
```

### 6.1.3 显示名
```
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
HOCComponent.displayName = `prefix${getDisplayName(WrappedComponent)}`
```

## 6.2 函数作为子组件
高阶组件对原组件prop有固化要求(只接受能用到的props)

要求原组件必须有子组件且子组件为一个返回组件的函数(也可以通过属性传递)

# 7.Redux和异步
## 7.1 React组件访问服务器
开发环境:package.json -> proxy   
componentDidMount是最佳获取初始化组件内容请求的时机

返回的结果都应该验证，不要相信任何返回结果

## 7.2 Redux访问服务器
### 7.2.1 Redux-thunk
拦截函数类型的action
```js store.js
import thunkMiddleware from 'redux-thunk'
const store = createStore(reducer,applyMiddlewares(thunkMiddleware))
```
```js actions.js
const sampleAsyncAction = () => {
	return (dispatch, getState)=>{
		//do async then dispatch action
	}
}
```

### 7.2.4 异步操作的中止
业务层中止

>乐观更新:在服务端响应前直接更新视图，等待服务器响应后再次更新视图(如有必要)

# 8. 单元测试
## 8.2 测试环境
Jest
 - .test.js
 - `__test__`

### 8.2.3 辅助工具
1.Enzyme,react-addons-test-utils
 - shadow
 - mount
 - render

2.sinon
3.redux-mock-store
action对象不需要派发到reducer中，只要检查action对象是否被派发  
store扩展getActions方法

## 8.3 单元测试实例
### 8.3.2 异步action测试
```js
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
const middlewares = [thunk];
const createMockStore = configureStore(middlewares);
```
### 8.3.4 无状态组件测试
测试是否创造了子组件以及属性传递正确即可

### 8.3.5 测试被连接的组件
调用store.dispatch action验证wrapper对象上的渲染是否符合预期  
底层组件可以直接调用store，无需依赖provider

# 9.扩展redux
## 9.1 中间件
### 9.1.1 中间件接口
action对象进入reducer之前，会经历中间件的管道
```js
const doNothingMiddleware = function ({dispatch,getState}) {
    return function (next) {
        return function (action) {
            return next(action)
        }
    }
}
const createThunkMiddleware = function(...args){
    return function ({dispatch,getState}) {
        return function (next) {
            return function (action) {
                if(typeof action === 'function'){
                    return action(dispatch,getState,...args)
                }
                return next(action)
            }
        }
    }
}
```
每个中间件最里层处理action参数的函数返回值都会影响store上dispatch函数的返回值，所以不要依赖dispatch函数的返回值

### 9.1.2 使用中间件
1.产生新的createStore
不适合多个store Enhance
```
import {createStore,applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
const configStore = applyMiddleware(thunkMiddleware)(createStore)
const store = configStore(reducer,initialState)
```
2.applyMiddleware得到store Enhance后与其他Enhance混合（compose）
一定要把applyMiddleware放在其他Enhance之前
```js
import {createStore,applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
const middlewares = [thunkMiddleware]

const storeEnhance = compose(applyMiddleware(...middlewares),...otherStoreEnhance)
const store = configStore(reducer,initialState,storeEnhance)
```

### 9.1.3 Promise中间件
```
const PromiseMiddleware = function(...args){
    return function ({dispatch,getState}) {
        return function (next) {
            return function (action) {
                const {types,promise,...rest} = action
                if(isPromise(promise)&&types.length===3){
                    const [PEND,SUC,FAIL] = types
                    dispatch({
                        ...rest,
                        type: PEND
                    })
                    return promise.then(result=>{
                        dispatch({
                            ...rest,
                            type: SUC,
                            result
                        })
                    }).catch(error=>{
                        dispatch({
                            ...rest,
                            type: FAIL,
                            error
                        })
                    })
                }
                return next(action)
            }
        }
    }
}
```

### 9.1.4 中间件开发原则
 - 考虑到其他中间件
 - 单一职责
 - 注意dispatch和next差异

## 9.2 Store Enhancer
### 9.2.1 增强器接口
createStore->store->enhance store->return store
```
const doNothingEnhance = function (createStore) {
    return function (reducer,preloadState,enhancer) {
        const  store = createStore(reducer,preloadState,enhancer)
        return store
    }
}
```
store接口:
 - dispatch
 - subscribe
 - getState
 - replaceReducer

使用Monkey patch不破坏redux默认功能
```
const logEnhance = function (createStore) {
    return function (reducer,preloadState,enhancer) {
        const  store = createStore(reducer,preloadState,enhancer)
        const originDispatch = store.dispatch
        store.dispatch = function (action) {
            console.log(`dispatch action:${action}`)
            originDispatch(action)
        }
        return store
    }
}
```