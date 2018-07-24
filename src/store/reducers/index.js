import {combineReducers} from 'redux';
import fuse from './fuse';
import auth from 'auth/store/reducers/index';
import quickPanel from '../../main/quickPanel/store/reducers';
import formBuilderRedux from '../../main/content/FormBuilder/store/reducers/formBuilder.reducer';

const rootReducer = combineReducers({
    auth,
    fuse,
    quickPanel,
    formBuilderRedux
});

export default rootReducer;