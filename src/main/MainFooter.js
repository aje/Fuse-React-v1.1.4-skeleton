import React from 'react';
import {Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles/index';
import classNames from 'classnames';

const styles = theme => ({
    root: {}
});

function MainFooter({classes})
{
    return (
        <div className={classNames(classes.root, "flex flex-1 items-center px-24")}>
            <Typography>Footer</Typography>
        </div>
    );
}

export default withStyles(styles, {withTheme: true})(MainFooter);