import React, {Component} from 'react';
import {connect} from 'react-redux';
import {auth, db} from 'firebase-db';
import * as userActions from 'auth/store/actions';
import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import firebase from 'firebase/app';

class FirebaseAuth extends Component {
    componentDidMount()
    {
        const {setUserData, createUserSettings} = this.props;

        if ( !firebase.apps.length )
        {
            return;
        }

        auth.onAuthStateChanged(authUser => {
            if ( authUser )
            {
                this.props.showMessage({message: 'Logging in with Firebase'});
                /**
                 * Retrieve user data from Firebase
                 */
                db.ref(`users/${authUser.uid}`)
                    .once('value')
                    .then((snapshot) => {
                        const user = snapshot.val();
                        if ( user && user.data &&
                            user.data.settings &&
                            user.data.settings.theme &&
                            user.data.settings.layout &&
                            user.data.settings.layout.style )
                        {
                            // Set user data but do not update
                            setUserData(user, true);
                        }
                        else
                        {
                            // Create missing user settings
                            createUserSettings(authUser);
                        }
                        this.props.hideMessage();
                    });
            }
        });
    }

    render()
    {
        const {children} = this.props;

        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
            setUserData       : userActions.setUserData,
            createUserSettings: userActions.createUserSettings,
            showMessage       : Actions.showMessage,
            hideMessage       : Actions.hideMessage
        },
        dispatch);
}


function mapStateToProps({fuse, auth})
{
    return {
        user: auth.user
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FirebaseAuth);
