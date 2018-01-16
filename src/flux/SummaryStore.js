import {CounterStore} from './CounterStore'
import AppDispatcher from './AppDispatcher'
import * as ActionTypes from "./ActionTypes";
import EventEmitter from "events";

export const SUMMARY_CHANGE = 'SUMMARY_CHANGE'
export const SummaryStore = Object.assign({}, EventEmitter.prototype, {
    getSummary() {
        const values = CounterStore.getCounterValues()
        return Object.keys(values).reduce((prev, key) => {
            return prev + values[key]
        }, 0)
    },
    emitChange() {
        this.emit(SUMMARY_CHANGE)
    },
    addChangeListener(cb) {
        this.addListener(SUMMARY_CHANGE, cb)
    },
    removeChangeListener(cb) {
        this.removeListener(SUMMARY_CHANGE, cb)
    }
})
SummaryStore.dispatchToken = AppDispatcher.register(({type}) => {
    if (type === ActionTypes.increment || type === ActionTypes.decrement) {
        AppDispatcher.waitFor([CounterStore.dispatchToken]);
        SummaryStore.emitChange()
    }
})
