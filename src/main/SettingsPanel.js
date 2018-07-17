import React, {Component} from 'react';
import {Button, Typography, Dialog, Icon, IconButton, Slide, withStyles} from '@material-ui/core';
import {FuseScrollbars, FuseSettings} from '@fuse';

function Transition(props)
{
    return <Slide direction="left" {...props} />;
}

const styles = theme => ({
    button               : {
        position               : 'fixed',
        right                  : 0,
        top                    : 160,
        minWidth               : 48,
        width                  : 48,
        height                 : 48,
        opacity                : .75,
        padding                : 0,
        borderBottomRightRadius: 0,
        borderTopRightRadius   : 0,
        zIndex                 : 999
    },
    '@keyframes rotating': {
        from: {
            transform: 'rotate(0deg)'
        },
        to  : {
            transform: 'rotate(360deg)'
        }
    },
    buttonIcon           : {
        animation: 'rotating 3s linear infinite'
    },
    dialogPaper          : {
        position       : 'fixed',
        width          : 380,
        maxWidth       : '90vw',
        backgroundColor: theme.palette.background.paper,
        boxShadow      : theme.shadows[5],
        top            : 0,
        height         : '100%',
        minHeight      : '100%',
        bottom         : 0,
        right          : 0,
        margin         : 0,
        zIndex         : 1000
    }
});

class SettingsPanel extends Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render()
    {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <Button className={classes.button} variant="raised" color="secondary" onClick={this.handleOpen}>
                    <Icon className={classes.buttonIcon}>settings</Icon>
                </Button>

                <Dialog
                    TransitionComponent={Transition}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    keepMounted
                    onClose={this.handleClose}
                    BackdropProps={{invisible: true}}
                    classes={{
                        paper: classes.dialogPaper
                    }}
                >
                    <FuseScrollbars className="p-24 sm:p-32">
                        <IconButton className="fixed pin-t pin-r z-10" onClick={this.handleClose}>
                            <Icon>close</Icon>
                        </IconButton>

                        <Typography className="mb-32" variant="title">Theme Settings</Typography>

                        <FuseSettings/>

                    </FuseScrollbars>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(SettingsPanel);
