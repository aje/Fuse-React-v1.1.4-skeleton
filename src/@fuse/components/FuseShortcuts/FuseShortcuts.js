import React, {Component} from 'react';
import {Divider, Icon, IconButton, Input, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography, withStyles} from '@material-ui/core';
import * as UserActions from 'auth/store/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {FuseUtils,FuseAnimateGroup} from '@fuse';
import {Link} from 'react-router-dom';
import amber from '@material-ui/core/colors/amber';
import classNames from 'classnames';
import _ from 'lodash';

const propTypes = {};

const defaultProps = {};

const styles = theme => ({
    root   : {},
    item   : {
        textDecoration: 'none!important'
    },
    addIcon: {
        color: amber[600]
    }
});

class FuseShortcuts extends Component {
    state = {
        addMenu       : null,
        searchText    : '',
        searchResults : null,
        flatNavigation: null
    };

    componentDidMount()
    {
        this.flattenNavigation(this.props.navigation);
    }

    addMenuClick = event => {
        this.setState({addMenu: event.currentTarget});
    };

    addMenuClose = () => {
        this.setState({addMenu: null});
    };

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.flattenNavigation(this.props.navigation);
        }
    }

    flattenNavigation(navigation)
    {
        this.setState({flatNavigation: FuseUtils.getFlatNavigation(navigation)})
    }

    search = (ev) => {
        const searchText = ev.target.value;
        this.setState({searchText});
        if ( searchText.length !== 0 && this.state.flatNavigation )
        {
            this.setState({
                searchResults: this.state.flatNavigation.filter(item => item.title.toLowerCase().includes(searchText))
            });
            return;
        }
        this.setState({searchResults: null});
    };

    render()
    {
        const {classes, shortcuts, navigation, toggleInShortcuts} = this.props;
        const {addMenu, searchText, searchResults} = this.state;
        const shortcutItems = shortcuts ? shortcuts.map(id => FuseUtils.findById(navigation, id)) : [];

        function ShortcutMenuItem({item, onToggle})
        {
            return (
                <Link to={item.url} className={classes.item}>
                    <MenuItem key={item.id}>
                        <ListItemIcon>
                            {item.icon ?
                                (
                                    <Icon>{item.icon}</Icon>
                                ) :
                                (
                                    <span className="text-20 font-bold uppercase text-center">{item.title[0]}</span>
                                )
                            }
                        </ListItemIcon>
                        <ListItemText className="pl-0" primary={item.title}/>
                        <IconButton
                            onClick={(ev) => {
                                ev.preventDefault();
                                ev.stopPropagation();
                                onToggle(item.id);
                            }}
                        >
                            <Icon color="action">{shortcuts.includes(item.id) ? 'star' : 'star_border'}</Icon>
                        </IconButton>
                    </MenuItem>
                </Link>
            );
        }

        return (
            <div className={classNames(classes.root, "flex flex-1 px-16")}>

                <FuseAnimateGroup
                    enter={{
                        animation: "transition.expandIn"
                    }}
                    className="hidden md:flex md-flex-1"
                >
                    {shortcutItems.map(item => item && (
                        <Link to={item.url} key={item.id} className={classes.item}>
                            <Tooltip title={item.title} placement="bottom">
                                <IconButton className="w-40 h-40">
                                    {item.icon ?
                                        (
                                            <Icon>{item.icon}</Icon>
                                        ) :
                                        (
                                            <span className="text-20 font-bold uppercase">{item.title[0]}</span>
                                        )
                                    }
                                </IconButton>
                            </Tooltip>
                        </Link>
                    ))}

                    <Tooltip title="Click to add/remove shortcut" placement="bottom">
                        <IconButton
                            className="w-40 h-40"
                            aria-owns={addMenu ? 'add-menu' : null}
                            aria-haspopup="true"
                            onClick={this.addMenuClick}
                        >
                            <Icon className={classes.addIcon}>star</Icon>
                        </IconButton>
                    </Tooltip>
                </FuseAnimateGroup>

                <Menu
                    id="add-menu"
                    anchorEl={addMenu}
                    open={Boolean(addMenu)}
                    onClose={this.addMenuClose}
                    classes={{
                        paper: 'mt-48'
                    }}
                    onEntered={() => {
                        this.searchInput.focus();
                    }}
                    onExited={() => {
                        this.setState({searchText: ''});
                    }}>
                    <div className="p-16 pt-8">
                        <Input
                            inputRef={ref => this.searchInput = ref}
                            value={searchText}
                            onChange={this.search}
                            placeholder="Search for an app or page"
                            className=""
                            fullWidth
                            inputProps={{
                                'aria-label': 'Search'
                            }}
                        />
                    </div>

                    <Divider/>

                    {searchText.length !== 0 && searchResults && searchResults.map(item => (
                        <ShortcutMenuItem
                            key={item.id}
                            item={item}
                            onToggle={() => toggleInShortcuts(item.id)}
                        />
                    ))}

                    {searchText.length !== 0 && searchResults.length === 0 && (
                        <Typography color="textSecondary" className="p-16 pb-8">No results..</Typography>
                    )}

                    {searchText.length === 0 && shortcutItems.map(item => item && (
                        <ShortcutMenuItem
                            key={item.id}
                            item={item}
                            onToggle={() => toggleInShortcuts(item.id)}
                        />
                    ))}
                </Menu>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        toggleInShortcuts: UserActions.toggleInShortcuts
    }, dispatch);
}

function mapStateToProps({fuse, auth})
{
    return {
        navigation: fuse.navigation,
        shortcuts : auth.user.data.shortcuts
    }
}

FuseShortcuts.propTypes = propTypes;
FuseShortcuts.defaultProps = defaultProps;

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FuseShortcuts));
