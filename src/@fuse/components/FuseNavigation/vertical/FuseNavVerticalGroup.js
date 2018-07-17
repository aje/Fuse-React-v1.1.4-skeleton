import React from 'react';
import FuseNavVerticalCollapse from './FuseNavVerticalCollapse';
import FuseNavVerticalItem from './FuseNavVerticalItem';
import {ListSubheader} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const propTypes = {
    item: PropTypes.shape(
        {
            id      : PropTypes.string.isRequired,
            title   : PropTypes.string,
            children: PropTypes.array
        })
};

const defaultProps = {};

function FuseNavVerticalGroup({item, nestedLevel, userRole})
{
    if ( item.auth && (!item.auth.includes(userRole) || (userRole !== 'guest' && item.auth.length === 1 && item.auth.includes('guest'))) )
    {
        return null;
    }

    let paddingValue = 40 + (nestedLevel * 16);
    const listItemPadding = nestedLevel > 0 ? 'pl-' + (paddingValue > 80 ? 80 : paddingValue) : 'pl-24';

    return (
        <React.Fragment>

            <ListSubheader disableSticky={true} className={classNames(listItemPadding, "list-subheader flex items-center")}>
                <span className="list-subheader-text">
                    {item.title}
                </span>
            </ListSubheader>

            {item.children && (
                <React.Fragment>
                    {
                        item.children.map((item) => (

                            <React.Fragment key={item.id}>

                                {item.type === 'group' && (
                                    <NavVerticalGroup item={item} nestedLevel={nestedLevel}/>
                                )}

                                {item.type === 'collapse' && (
                                    <FuseNavVerticalCollapse item={item} nestedLevel={nestedLevel}/>
                                )}

                                {item.type === 'item' && (
                                    <FuseNavVerticalItem item={item} nestedLevel={nestedLevel}/>
                                )}

                            </React.Fragment>
                        ))
                    }
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

function mapStateToProps({auth})
{
    return {
        userRole: auth.user.role
    }
}

FuseNavVerticalGroup.propTypes = propTypes;
FuseNavVerticalGroup.defaultProps = defaultProps;

const NavVerticalGroup = withRouter(connect(mapStateToProps)(FuseNavVerticalGroup));

export default NavVerticalGroup;
