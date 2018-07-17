import React from 'react';
import {Icon, ListItem, ListItemText} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles/index';
import {NavLink, withRouter} from 'react-router-dom';
import classNames from 'classnames';
import FuseNavBadge from './../FuseNavBadge';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';

const propTypes = {
    item: PropTypes.shape(
        {
            id   : PropTypes.string.isRequired,
            title: PropTypes.string,
            icon : PropTypes.string,
            url  : PropTypes.string
        })
};

const defaultProps = {};

const styles = theme => ({
    root: {
        minHeight          : 48,
        '&.active'         : {
            backgroundColor            : theme.palette.secondary.main,
            color                      : theme.palette.secondary.contrastText + '!important',
            pointerEvents              : 'none',
            '& .list-item-text-primary': {
                color: 'inherit'
            },
            '& .list-item-icon'        : {
                color: 'inherit'
            }
        },
        '& .list-item-icon': {},
        '& .list-item-text': {},
        color              : 'inherit!important',
        textDecoration     : 'none!important'
    }
});

function FuseNavVerticalItem({item, classes, nestedLevel, userRole, navbarCloseMobile})
{
    if ( item.auth && (!item.auth.includes(userRole) || (userRole !== 'guest' && item.auth.length === 1 && item.auth.includes('guest'))) )
    {
        return null;
    }

    let paddingValue = 40 + (nestedLevel * 16);
    const listItemPadding = nestedLevel > 0 ? 'pl-' + (paddingValue > 80 ? 80 : paddingValue) : 'pl-24';

    return (
        <ListItem
            button
            component={NavLink}
            to={item.url}
            activeClassName="active"
            className={classNames(classes.root, listItemPadding)}
            onClick={navbarCloseMobile}
            exact={item.exact}
        >
            {item.icon && (
                <Icon className="list-item-icon text-16 flex-no-shrink" color="action">{item.icon}</Icon>
            )}
            <ListItemText className="list-item-text" primary={item.title} classes={{primary: 'text-14 list-item-text-primary'}}/>
            {item.badge && (
                <FuseNavBadge badge={item.badge}/>
            )}
        </ListItem>
    );
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        navbarCloseMobile: Actions.navbarCloseMobile
    }, dispatch);
}

function mapStateToProps({auth, fuse})
{
    return {
        userRole: auth.user.role
    }
}

FuseNavVerticalItem.propTypes = propTypes;
FuseNavVerticalItem.defaultProps = defaultProps;

const NavVerticalItem = withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(FuseNavVerticalItem)));

export default NavVerticalItem;
