import React, {Component} from 'react';
import FuseNavHorizontalGroup from './FuseNavHorizontalGroup';
import FuseNavHorizontalItem from './FuseNavHorizontalItem';
import {Icon, IconButton, ListItem, ListItemText} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles/index';
import {withRouter} from 'react-router-dom';
import classNames from 'classnames';
import FuseNavBadge from './../FuseNavBadge';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Manager, Target, Popper} from 'react-popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import _ from 'lodash';

const propTypes = {
    item: PropTypes.shape(
        {
            id      : PropTypes.string.isRequired,
            title   : PropTypes.string,
            icon    : PropTypes.string,
            children: PropTypes.array
        })
};

const defaultProps = {};

const styles = theme => ({
    root       : {},
    button     : {
        minHeight: 48,
        '&.open' : {
            backgroundColor: 'rgba(0,0,0,.08)'
        }
    },
    popper     : {
        zIndex: 999
    },
    popperClose: {
        pointerEvents: 'none'
    }
});

class FuseNavHorizontalCollapse extends Component {
    state = {
        open: false
    };

    handleToggle = _.debounce((open) => {
        if ( this.state.open === open )
        {
            return;
        }
        this.setState({open});
    }, 150);

    render()
    {
        const {item, nestedLevel, classes, userRole} = this.props;
        const {open} = this.state;

        if ( item.auth && (!item.auth.includes(userRole) || (userRole !== 'guest' && item.auth.length === 1 && item.auth.includes('guest'))) )
        {
            return null;
        }

        return (
            <ul className={classNames(classes.root, "relative pl-0")}>
                <Manager>
                    <Target>
                        <ListItem
                            button
                            onClick={this.handleClick}
                            className={classNames(classes.button, this.state.open && "open")}
                            onMouseEnter={() => this.handleToggle(true)}
                            onMouseLeave={() => this.handleToggle(false)}
                            aria-owns={open ? 'menu-list-grow' : null}
                            aria-haspopup="true"
                        >
                            {item.icon && (
                                <Icon color="action" className="text-16 flex-no-shrink">{item.icon}</Icon>
                            )}
                            <ListItemText className="list-item-text pr-0" primary={item.title} classes={{primary: 'text-14'}}/>
                            {item.badge && (
                                <FuseNavBadge className="ml-8 mr-4" badge={item.badge}/>
                            )}
                            <IconButton disableRipple className="w-16 h-16 ml-4">
                                <Icon className="text-16 arrow-icon">keyboard_arrow_right</Icon>
                            </IconButton>
                        </ListItem>
                    </Target>
                    <Popper
                        placement="right"
                        eventsEnabled={open}
                        positionFixed
                        className={classNames(classes.popper, {[classes.popperClose]: !open})}
                    >
                        <Grow in={open} id="menu-list-grow" style={{transformOrigin: '0 0 0'}}>
                            <Paper
                                onMouseEnter={() => this.handleToggle(true)}
                                onMouseLeave={() => this.handleToggle(false)}
                            >
                                {item.children && (
                                    <ul className={classNames(classes.children, "pl-0")}>
                                        {
                                            item.children.map((item) => (

                                                <React.Fragment key={item.id}>

                                                    {item.type === 'group' && (
                                                        <FuseNavHorizontalGroup item={item} nestedLevel={nestedLevel + 1}/>
                                                    )}

                                                    {item.type === 'collapse' && (
                                                        <NavHorizontalCollapse item={item} nestedLevel={nestedLevel + 1}/>
                                                    )}

                                                    {item.type === 'item' && (
                                                        <FuseNavHorizontalItem item={item} nestedLevel={nestedLevel + 1}/>
                                                    )}

                                                </React.Fragment>
                                            ))
                                        }
                                    </ul>
                                )}
                            </Paper>
                        </Grow>
                    </Popper>
                </Manager>
            </ul>
        );
    };
}

function mapStateToProps({auth})
{
    return {
        userRole: auth.user.role
    }
}

FuseNavHorizontalCollapse.propTypes = propTypes;
FuseNavHorizontalCollapse.defaultProps = defaultProps;

const NavHorizontalCollapse = withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(FuseNavHorizontalCollapse)));

export default NavHorizontalCollapse;
