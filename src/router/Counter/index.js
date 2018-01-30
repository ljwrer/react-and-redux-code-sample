import * as actions from './actions.js';
import reducer from './reducer.js';
import view, {stateKey} from './view.js';
import axios from 'axios'
const END_POINT = process.env.HOST_NAME || 'localhost:9000';
const initState = () => {
    return axios.get(`http://${END_POINT}/api/count`).then(({data}) => data.count)
}
export {actions, reducer, view, stateKey, initState};
