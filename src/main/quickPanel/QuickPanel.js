import React, {Component} from 'react';
import {Drawer, Typography} from '@material-ui/core/';
import {withStyles} from '@material-ui/core/styles/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './store/actions/index'

const styles = theme => ({
    root: {
        width  : 280,
        padding: 24
    }
});

class QuickPanel extends Component {

    render()
    {
        const {classes, state, toggleQuickPanel} = this.props;
        return (
            <Drawer
                classes={{paper: classes.root}}
                open={state}
                anchor="right"
                onClose={() => toggleQuickPanel(false)}
            >
                <Typography>Quick Panel</Typography>
            </Drawer>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        toggleQuickPanel: Actions.toggleQuickPanel
    }, dispatch);
}

function mapStateToProps({quickPanel})
{
    return {
        state: quickPanel.state
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(QuickPanel));
