import * as Actions from '../../actions/fuse/index';

const initialState = {
    state  : null,
    options: {
        anchorOrigin    : {
            vertical  : 'top',
            horizontal: 'center'
        },
        autoHideDuration: 6000,
        message         : "Hi"
    }
};

const message = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SHOW_MESSAGE:
        {
            return {
                ...state,
                state  : true,
                options: {
                    ...state.options,
                    ...action.options
                }
            };
        }
        case Actions.HIDE_MESSAGE:
        {
            return {
                ...state,
                state: null
            };
        }
        default:
        {
            return state;
        }
    }
};

export default message;