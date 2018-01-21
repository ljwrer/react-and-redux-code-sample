import {FETCH_FAIL, FETCH_LOADING, FETCH_SUC} from "./actionTypes";
import Status from './Status'
const reducer = function (state={}, action) {
    const {type} = action
    switch (type){
        case FETCH_LOADING:
            return {
                ...state,
                status:Status.LOADING
            }
        case FETCH_SUC:
            return {
                ...state,
                status:Status.SUCCESS,
                ...action.weather.weatherinfo
            }
        case FETCH_FAIL:
            return {
                ...state,
                status:Status.ERROR,
                error:action.error
            }
        default:
            return state
    }
}
export default reducer