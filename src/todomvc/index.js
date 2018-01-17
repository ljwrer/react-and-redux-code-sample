import React from 'react'
import {view as TodoList} from "./todos";
import {view as Filter} from "./filter";
import store from "./Store";
import {Provider} from "react-redux";

const TodoMVC = function () {
    return (<Provider store={store}>
        <div>
            <TodoList/>
            <Filter/>
        </div>
    </Provider>)
}
export default TodoMVC