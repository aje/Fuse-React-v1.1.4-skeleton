import history from 'history.js';
import {auth, db} from 'firebase-db';
import {setDefaultSettings} from 'store/actions/fuse';
import {FuseDefaultSettings} from '@fuse';
import _ from 'lodash';
import store from 'store';
import * as Actions from 'store/actions';
import firebase from 'firebase/app';

export const SET_USER_DATA = '[USER] SET DATA';
export const REMOVE_USER_DATA = '[USER] REMOVE DATA';
export const USER_LOGGED_OUT = '[USER] LOGGED OUT';

export function setUserData(user, doNotUpdate)
{
    return (dispatch) => {

        !doNotUpdate && user.role !== 'guest' && updateUserData(user);

        dispatch(setDefaultSettings(user.data.settings));

        dispatch({
            type   : SET_USER_DATA,
            payload: user
        })
    }
}

export function updateUserSettings(settings)
{
    return (dispatch, getState) => {
        const oldUser = getState().auth.user;
        const user = _.merge({}, oldUser, {data: {settings}});
        return dispatch(setUserData(user));
    }
}


export function createUserSettings(authUser)
{
    return (dispatch, getState) => {
        const guestUser = getState().auth.user;
        const fuseDefaultSettings = getState().fuse.settings.defaults;
        const currentUser = firebase.auth().currentUser;

        /**
         * Merge with current Settings
         */
        const user = _.merge({}, guestUser,
            {
                uid : authUser.uid,
                from: 'firebase',
                role: "admin",
                data: {
                    displayName: authUser.displayName,
                    email      : authUser.email,
                    settings   : {...fuseDefaultSettings}
                }
            }
        );
        currentUser.updateProfile(user.data);
        return dispatch(setUserData(user));
    }
}


export function toggleInShortcuts(id)
{
    return (dispatch, getState) => {
        let user = getState().auth.user;
        let shortcuts = user.data.shortcuts;
        shortcuts = shortcuts.includes(id) ? shortcuts.filter(_id => id !== _id) : [...shortcuts, id];
        return dispatch(setUserData(
            {
                ...user,
                data: {
                    ...user.data,
                    shortcuts
                }
            }
        ));
    }
}

export function removeUserData()
{
    return {
        type: REMOVE_USER_DATA
    }
}

export function logoutUser()
{
    history.push({
        pathname: '/'
    });

    return (dispatch, getState) => {

        const user = getState().auth.user;

        user.role !== 'guest' && user.from === 'firebase' && auth.signOut();

        dispatch(setDefaultSettings(FuseDefaultSettings));

        dispatch({
            type: USER_LOGGED_OUT
        })
    }
}

function updateUserData(user)
{
    switch ( user.from )
    {
        case 'firebase':
        {
            fireBaseUpdateUserData(user);
            break;
        }
        default:
        {

        }
    }
}

function fireBaseUpdateUserData(user)
{
    db.ref(`users/${user.uid}`)
        .set(user)
        .then(() => {
            store.dispatch(Actions.showMessage({message: "User data saved to firebase"}));
        })
        .catch(error => {
            store.dispatch(Actions.showMessage({message: error.message}));
        });
}
