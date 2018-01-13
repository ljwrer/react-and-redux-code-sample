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
 - 绑定成员函数的this

3.render
返回一个jsx描述的结构，由React来操作渲染过程
render应该是一个state和props的纯函数

4.componentWillMount和componentDidMount
componentWillMount修改状态不会引发重新绘制?
componentWillMount可以用来生成日志

componentDidMount不是紧跟render调用,要等到react更新DOM后
componentDidMount用来ajax或调用第三方库

### 2.3.2 更新过程

