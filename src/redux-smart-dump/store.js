import {createStore} from 'redux'
import {reducer} from "./reducers";
const counterValues = {
    'First': 0,
    'Second': 10,
    'Third': 30
}
export const store = createStore(reducer,counterValues)
