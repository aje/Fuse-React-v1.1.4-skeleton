import {combineReducers} from 'redux';
import fuse from './fuse';
import auth from 'auth/store/reducers/index';
import quickPanel from 'main/quickPanel/store/reducers';

const rootReducer = combineReducers({
    auth,
    fuse,
    quickPanel
});

export default rootReducer;