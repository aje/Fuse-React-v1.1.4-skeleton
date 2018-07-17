import React, {Component} from 'react';
import {Snackbar, IconButton, withStyles, Icon} from '@material-ui/core';
import * as Actions from 'store/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const styles = theme => ({
    root : {
        position: 'absolute'
    },
    close: {}
});

class FuseMessage extends Component {
    render()
    {
        const {classes} = this.props;
        return (
            <Snackbar
                {...this.props.options}
                open={this.props.state}
                onClose={this.props.hideMessage}
                classes={{
                    root: classes.root
                }}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.props.hideMessage}
                    >
                        <Icon>close</Icon>
                    </IconButton>
                ]}
            />
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        hideMessage: Actions.hideMessage
    }, dispatch);
}

function mapStateToProps({fuse})
{
    return {
        state  : fuse.message.state,
        options: fuse.message.options
    }
}


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FuseMessage));
