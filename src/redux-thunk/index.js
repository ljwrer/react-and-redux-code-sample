import React from 'react'
import {view as CitySelector} from "./citySelector";
import {view as Weather} from "./weather";
import store from "./store";
import {Provider} from "react-redux";

const ReduxThunkApp = function () {
    return (<Provider store={store}>
        <div>
            <CitySelector/>
            <Weather/>
        </div>
    </Provider>)
}
export default ReduxThunkApp