import {FETCH_FAIL, FETCH_LOADING, FETCH_SUC} from "./actionTypes";




import {getWeather} from "../api";
let queryID = 0
export const getWeatherByCityId = function (cityId) {
    return function (dispatch) {
        const tmpQueryId = ++queryID
        const isCurrent = function (action) {
            if(tmpQueryId === queryID){
                dispatch(action)
            }
        }
        dispatch(loadingWeather())
        getWeather(cityId).then(function (data) {
            isCurrent(weatherSuc(data))
        }).catch(function (error) {
            isCurrent(weatherFail(error))
        })
    }
}

export const loadingWeather = function () {
    return {
        type:FETCH_LOADING
    }
}
export const weatherSuc = function (weather) {
    return {
        type:FETCH_SUC,
        weather
    }
}
export const weatherFail = function (error) {
    return {
        type:FETCH_FAIL,
        error
    }
}
