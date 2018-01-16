import EventEmitter from 'events'
import * as ActionTypes from './ActionTypes'
import AppDispatcher from './AppDispatcher'
export const COUNT_CHANGE = 'COUNT_CHANGE'
const counterValues = {
    'First': 0,
    'Second': 10,
    'Third': 30
}
export const CounterStore = Object.assign({}, EventEmitter.prototype, {
    getCounterValues() {
        return counterValues
    },
    emitChange() {
        this.emit(COUNT_CHANGE)
    },
    addChangeListener(cb) {
        this.addListener(COUNT_CHANGE, cb)
    },
    removeChangeListener(cb) {
        this.removeListener(COUNT_CHANGE, cb)
    }
})
CounterStore.dispatchToken = AppDispatcher.register(({type,counterCaption}) => {
    if(type===ActionTypes.increment){
        counterValues[counterCaption]++
        CounterStore.emitChange()
    }else if(type ===ActionTypes.decrement){
        counterValues[counterCaption]--
        CounterStore.emitChange()
    }
})
