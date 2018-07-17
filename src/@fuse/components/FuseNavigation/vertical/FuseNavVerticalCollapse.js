import React, {Component} from 'react';
import FuseNavVerticalGroup from './FuseNavVerticalGroup';
import FuseNavVerticalItem from './FuseNavVerticalItem';
import {Collapse, Icon, IconButton, ListItem, ListItemText} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles/index';
import {withRouter} from 'react-router-dom';
import classNames from 'classnames';
import FuseNavBadge from './../FuseNavBadge';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

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
    root: {
        padding : 0,
        '&.open': {
            backgroundColor: 'rgba(0,0,0,.08)'
        }
    }
});

function needsToBeOpened(props)
{
    return props.location && isUrlInChildren(props.item, props.location.pathname)
}

function isUrlInChildren(parent, url)
{
    if ( !parent.children )
    {
        return false;
    }

    for ( let i = 0; i < parent.children.length; i++ )
    {
        if ( parent.children[i].children )
        {
            if ( isUrlInChildren(parent.children[i], url) )
            {
                return true;
            }
        }

        if ( parent.children[i].url === url || (!parent.children[i].exact && url.includes(parent.children[i].url)) )
        {
            return true;
        }
    }

    return false;
}

class FuseNavVerticalCollapse extends Component {

    constructor(props)
    {
        super(props);

        this.state = {open: needsToBeOpened(this.props)};
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( needsToBeOpened(this.props) )
        {
            !prevState.open && this.setState({open: true});
        }
        else
        {
            prevState.open && this.setState({open: false});
        }
    }

    handleClick = () => {
        this.setState({open: !this.state.open});
    };

    render()
    {
        const {item, nestedLevel, classes, userRole} = this.props;
        if ( item.auth && (!item.auth.includes(userRole) || (userRole !== 'guest' && item.auth.length === 1 && item.auth.includes('guest'))) )
        {
            return null;
        }
        let paddingValue = 40 + (nestedLevel * 16);
        const listItemPadding = nestedLevel > 0 ? 'pl-' + (paddingValue > 80 ? 80 : paddingValue) : 'pl-24';
        return (
            <ul className={classNames(classes.root, this.state.open && "open")}>

                <ListItem
                    button
                    className={listItemPadding}
                    onClick={this.handleClick}
                >
                    {item.icon && (
                        <Icon color="action" className="text-16 flex-no-shrink">{item.icon}</Icon>
                    )}
                    <ListItemText className="list-item-text" primary={item.title} classes={{primary: 'text-14'}}/>
                    {item.badge && (
                        <FuseNavBadge className="mr-4" badge={item.badge}/>
                    )}
                    <IconButton disableRipple className="w-16 h-16">
                        <Icon className="text-16 arrow-icon">
                            {this.state.open ? 'expand_less' : 'expand_more'}
                        </Icon>
                    </IconButton>
                </ListItem>

                {item.children && (
                    <Collapse in={this.state.open} className="collapse-children">
                        {
                            item.children.map((item) => (

                                <React.Fragment key={item.id}>

                                    {item.type === 'group' && (
                                        <FuseNavVerticalGroup item={item} nestedLevel={nestedLevel + 1}/>
                                    )}

                                    {item.type === 'collapse' && (
                                        <NavVerticalCollapse item={item} nestedLevel={nestedLevel + 1}/>
                                    )}

                                    {item.type === 'item' && (
                                        <FuseNavVerticalItem item={item} nestedLevel={nestedLevel + 1}/>
                                    )}

                                </React.Fragment>
                            ))
                        }
                    </Collapse>
                )}
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

FuseNavVerticalCollapse.propTypes = propTypes;
FuseNavVerticalCollapse.defaultProps = defaultProps;

const NavVerticalCollapse = withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(FuseNavVerticalCollapse)));

export default NavVerticalCollapse;
