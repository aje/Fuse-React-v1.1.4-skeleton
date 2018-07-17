import axios from 'axios/index';
import {auth} from 'firebase-db';
import * as UserActions from 'auth/store/actions';
import {LOGIN_ERROR} from 'auth/store/actions/login.actions';
import * as Actions from 'store/actions';

export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export function submitLogin({username, password})
{
    const request = axios.get('/api/auth', {
        data: {
            username,
            password
        }
    });

    return (dispatch) =>
        request.then((response) => {
            if ( !response.data.error )
            {
                dispatch(UserActions.setUserData(response.data));
                return dispatch({
                    type: REGISTER_SUCCESS
                });
            }
            else
            {
                return dispatch({
                    type   : REGISTER_ERROR,
                    payload: response.data.error
                });
            }
        });
}


export function registerWithFirebase(model)
{
    const {email, password, displayName} = model;
    return (dispatch) =>
        auth.createUserWithEmailAndPassword(email, password)
            .then(response => {

                dispatch(UserActions.createUserSettings({
                    ...response.user,
                    displayName,
                    email
                }));

                return dispatch({
                    type: REGISTER_SUCCESS
                });
            })
            .catch(error => {
                const usernameErrorCodes = [
                    'auth/operation-not-allowed',
                    'auth/user-not-found',
                    'auth/user-disabled'
                ];

                const emailErrorCodes = [
                    'auth/email-already-in-use',
                    'auth/invalid-email',
                ];

                const passwordErrorCodes = [
                    'auth/weak-password',
                    'auth/wrong-password'
                ];

                const response = {
                    email: emailErrorCodes.includes(error.code) ? error.message : null,
                    displayName: usernameErrorCodes.includes(error.code) ? error.message : null,
                    password: passwordErrorCodes.includes(error.code) ? error.message : null
                };

                if ( error.code === 'auth/invalid-api-key' )
                {
                    dispatch(Actions.showMessage({message: error.message}));
                }

                return dispatch({
                    type   : LOGIN_ERROR,
                    payload: response
                });
            });
}