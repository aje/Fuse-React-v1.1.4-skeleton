import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config'
import {withStyles} from '@material-ui/core/styles';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from 'store/actions';
import {AppBar, Hidden, Icon, IconButton, Toolbar, Drawer, MuiThemeProvider} from '@material-ui/core';
import {FuseScrollbars, FuseMessage, FuseThemes} from '@fuse';
import classNames from 'classnames';
import _ from 'lodash';

const defaultProps = {};

const navbarWidth = 256;

const styles = theme => ({
    root               : {
        display                     : 'flex',
        flexDirection               : 'column',
        width                       : '100%',
        height                      : '100%',
        overflow                    : 'hidden',
        backgroundColor             : theme.palette.background.default,
        color                       : theme.palette.text.primary,
        '&.boxed'                   : {
            maxWidth : 1280,
            margin   : '0 auto',
            boxShadow: theme.shadows[3]
        },
        '& table.simple tbody tr td': {
            borderColor: theme.palette.divider
        },
        '& table.simple thead tr th': {
            borderColor: theme.palette.divider
        },
        '& a:not([role=button])'    : {
            color         : theme.palette.secondary.main,
            textDecoration: 'none',
            '&:hover'     : {
                textDecoration: 'underline'
            }
        },
        '& [class^="border-"]'      : {
            borderColor: theme.palette.divider
        },
        '& [class*="border-"]'      : {
            borderColor: theme.palette.divider
        },
        '&.scroll-body'             : {
            '& $wrapper'       : {
                height  : 'auto',
                flex    : '0 0 auto',
                overflow: 'auto'
            },
            '& $contentWrapper': {},
            '& $content'       : {}
        },
        '&.scroll-content'          : {
            '& $wrapper'       : {},
            '& $contentWrapper': {},
            '& $content'       : {}
        }
    },
    wrapper            : {
        display : 'flex',
        position: 'relative',
        width   : '100%',
        height  : '100%'
    },
    contentWrapper     : {
        display      : 'flex',
        flexDirection: 'column',
        zIndex       : 3,
        overflow     : 'hidden',
        flex         : '1 1 auto'
    },
    content            : {
        display                     : 'flex',
        overflow                    : 'auto',
        flex                        : '1 1 auto',
        flexDirection               : 'column',
        width                       : '100%',
        '-webkit-overflow-scrolling': 'touch'
    },
    navbarWrapper      : {
        boxShadow: theme.shadows[3],
        zIndex   : 4
    },
    navbarPaperWrapper : {},
    navbar             : {
        display      : 'flex',
        overflow     : 'hidden',
        flexDirection: 'column',
        width        : navbarWidth,
        minWidth     : navbarWidth,
        height       : '100%',
        zIndex       : 4,
        transition   : theme.transitions.create(['width', 'min-width'], {
            easing  : theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter
        })
    },
    navbarButton       : {
        '&.right': {
            borderLeft: '1px solid ' + theme.palette.divider
        },
        '&.left' : {
            borderRight: '1px solid ' + theme.palette.divider
        }
    },
    navbarLeft         : {
        left: 0
    },
    navbarRight        : {
        right: 0
    },
    navbarFolded       : {
        position: 'absolute',
        width   : 64,
        minWidth: 64,
        top     : 0,
        bottom  : 0
    },
    navbarFoldedOpen   : {
        width   : navbarWidth,
        minWidth: navbarWidth
    },
    navbarFoldedClose  : {
        '& $navbarHeader'                       : {
            padding         : '0 8px 0 13px',
            '& .logo-text'  : {
                opacity: 0
            },
            '& .react-badge': {
                opacity: 0
            }
        },
        '& .list-item-text, & .arrow-icon'      : {
            opacity: 0
        },
        '& .list-subheader .list-subheader-text': {
            opacity: 0
        },
        '& .list-subheader:before'              : {
            content  : '""',
            display  : 'block',
            position : 'absolute',
            minWidth : 16,
            borderTop: '2px solid',
            opacity  : .2
        },
        '& .collapse-children'                  : {
            display: 'none'
        }
    },
    navbarHeaderWrapper: {
        display        : 'flex',
        alignItems     : 'center',
        flex           : '0 1 auto',
        ...theme.mixins.toolbar,
        backgroundColor: 'rgba(255, 255, 255, .05)',
        boxShadow      : theme.shadows[1]
    },
    navbarHeader       : {
        display: 'flex',
        flex   : '1 1 auto',
        padding: '0 8px 0 16px'
    },
    navbarContent      : {
        overflowX                   : 'hidden',
        overflowY                   : 'auto',
        '-webkit-overflow-scrolling': 'touch'
    },
    toolbarWrapper     : {
        display : 'flex',
        position: 'relative',
        zIndex  : 5
    },
    toolbar            : {
        display: 'flex',
        flex   : '1 0 auto'
    },
    footerWrapper      : {
        position: 'relative',
        zIndex  : 5
    },
    footer             : {
        display: 'flex',
        flex   : '1 0 auto'
    }

});

class FuseLayout1 extends Component {

    handleToggleFolded = () => {
        this.props.setDefaultSettings(_.set({}, 'layout.config.navbar.folded', !this.props.settings.layout.config.navbar.folded));
    };

    render()
    {
        const {classes, toolbar, footer, navbarHeader, navbarContent, settings, navbar, navbarOpenMobile, navbarCloseMobile, navbarOpenFolded, navbarCloseFolded} = this.props;
        // console.warn('FuseLayout:: rendered');
        const layoutConfig = settings.layout.config;

        const navbarHeaderTemplate = (
            <div className={classes.navbarHeaderWrapper}>
                <div className={classes.navbarHeader}>
                    {navbarHeader}
                </div>
                <Hidden mdDown>
                    <IconButton onClick={this.handleToggleFolded}>
                        <Icon>menu</Icon>
                    </IconButton>
                </Hidden>
                <Hidden lgUp>
                    <IconButton onClick={navbarCloseMobile}>
                        <Icon>menu</Icon>
                    </IconButton>
                </Hidden>
            </div>
        );

        const navbarContentTemplate = (
            <FuseScrollbars className={classes.navbarContent}>
                {navbarContent}
            </FuseScrollbars>
        );

        const navBarTemplate = (
            <MuiThemeProvider theme={FuseThemes[settings.theme.navbar]}>
                <div id="fuse-navbar" className={classes.navbarWrapper}>
                    <Hidden mdDown>
                        <div
                            className={classNames(
                                classes.navbar,
                                classes['navbar' + _.upperFirst(layoutConfig.navbar.position)],
                                layoutConfig.navbar.folded && classes.navbarFolded,
                                layoutConfig.navbar.folded && navbar.foldedOpen && classes.navbarFoldedOpen,
                                layoutConfig.navbar.folded && !navbar.foldedOpen && classes.navbarFoldedClose)}
                            onMouseEnter={navbarOpenFolded}
                            onMouseLeave={navbarCloseFolded}
                            style={{backgroundColor: FuseThemes[settings.theme.navbar].palette.background.default}}
                        >
                            {navbarHeaderTemplate}
                            {navbarContentTemplate}
                        </div>
                    </Hidden>

                    <Hidden lgUp>
                        <Drawer
                            anchor={layoutConfig.navbar.position}
                            variant="temporary"
                            open={navbar.mobileOpen}
                            classes={{
                                paper: classes.navbar
                            }}
                            onClose={navbarCloseMobile}
                            ModalProps={{
                                keepMounted: true // Better open performance on mobile.
                            }}
                        >
                            {navbarHeaderTemplate}
                            {navbarContentTemplate}
                        </Drawer>
                    </Hidden>
                </div>
            </MuiThemeProvider>
        );

        const toolbarTemplate = (
            <MuiThemeProvider theme={FuseThemes[settings.theme.toolbar]}>
                <AppBar id="fuse-toolbar" className={classNames(classes.toolbarWrapper)} color="default">
                    <Toolbar className="p-0">
                        {layoutConfig.navbar.position === 'left' && (
                            <Hidden lgUp>
                                <IconButton
                                    className={classNames(classes.navbarButton, 'w-64 h-64 rounded-none', layoutConfig.navbar.position)}
                                    aria-label="open drawer"
                                    onClick={navbarOpenMobile}
                                >
                                    <Icon>menu</Icon>
                                </IconButton>
                            </Hidden>
                        )}
                        <div className={classes.toolbar}>
                            {toolbar}
                        </div>
                        {layoutConfig.navbar.position === 'right' && (
                            <Hidden lgUp>
                                <IconButton
                                    className={classNames(classes.navbarButton, 'w-64 h-64 rounded-none', layoutConfig.navbar.position)}
                                    aria-label="open drawer"
                                    onClick={navbarOpenMobile}
                                >
                                    <Icon>menu</Icon>
                                </IconButton>
                            </Hidden>
                        )}
                    </Toolbar>
                </AppBar>
            </MuiThemeProvider>
        );

        const footerTemplate = (
            <MuiThemeProvider theme={FuseThemes[settings.theme.footer]}>
                <AppBar id="fuse-footer" className={classNames(classes.footerWrapper)} color="default">
                    <Toolbar className="p-0">
                        <div className={classNames(classes.footer)}>
                            {footer}
                        </div>
                    </Toolbar>
                </AppBar>
            </MuiThemeProvider>
        );
        switch ( layoutConfig.scroll )
        {
            case 'body':
            {
                return (
                    <div id="fuse-layout" className={classNames(classes.root, layoutConfig.mode, 'scroll-' + layoutConfig.scroll)}>

                        {layoutConfig.toolbar.display && layoutConfig.toolbar.style === 'fixed' && layoutConfig.toolbar.position === 'above' && (
                            toolbarTemplate
                        )}

                        <FuseScrollbars className="overflow-auto">

                            {layoutConfig.toolbar.display && layoutConfig.toolbar.style !== 'fixed' && layoutConfig.toolbar.position === 'above' && (
                                toolbarTemplate
                            )}

                            <div className={classes.wrapper}>

                                {layoutConfig.navbar.display && layoutConfig.navbar.position === 'left' && (
                                    navBarTemplate
                                )}

                                <div
                                    className={classNames(
                                        classes.contentWrapper,
                                        layoutConfig.navbar.display && layoutConfig.navbar.folded && layoutConfig.navbar.position === 'left' && 'md:ml-64',
                                        layoutConfig.navbar.display && layoutConfig.navbar.folded && layoutConfig.navbar.position === 'right' && 'md:mr-64'
                                    )}
                                >

                                    {layoutConfig.toolbar.display && layoutConfig.toolbar.position === 'below' && (
                                        toolbarTemplate
                                    )}

                                    <div className={classes.content}>
                                        <FuseMessage/>
                                        {renderRoutes(this.props.routes)}
                                    </div>

                                    {layoutConfig.footer.display && layoutConfig.footer.position === 'below' && (
                                        footerTemplate
                                    )}
                                </div>

                                {layoutConfig.navbar.display && layoutConfig.navbar.position === 'right' && (
                                    navBarTemplate
                                )}
                            </div>

                            {layoutConfig.footer.display && layoutConfig.footer.style !== 'fixed' && layoutConfig.footer.position === 'above' && (
                                footerTemplate
                            )}

                        </FuseScrollbars>

                        {layoutConfig.footer.display && layoutConfig.footer.style === 'fixed' && layoutConfig.footer.position === 'above' && (
                            footerTemplate
                        )}
                    </div>
                );
            }
            case 'content':
            default:
            {
                return (
                    <div id="fuse-layout" className={classNames(classes.root, layoutConfig.mode, 'scroll-' + layoutConfig.scroll)}>

                        {layoutConfig.toolbar.display && layoutConfig.toolbar.position === 'above' && (
                            toolbarTemplate
                        )}

                        <div className={classes.wrapper}>

                            {layoutConfig.navbar.display && layoutConfig.navbar.position === 'left' && (
                                navBarTemplate
                            )}

                            <div
                                className={classNames(
                                    classes.contentWrapper,
                                    layoutConfig.navbar.display && layoutConfig.navbar.folded && layoutConfig.navbar.position === 'left' && 'lg:ml-64',
                                    layoutConfig.navbar.display && layoutConfig.navbar.folded && layoutConfig.navbar.position === 'right' && 'lg:mr-64'
                                )}
                            >
                                {layoutConfig.toolbar.display && layoutConfig.toolbar.position === 'below' && layoutConfig.toolbar.style === 'fixed' && (
                                    toolbarTemplate
                                )}

                                <FuseScrollbars className={classes.content}>
                                    {layoutConfig.toolbar.display && layoutConfig.toolbar.position === 'below' && layoutConfig.toolbar.style !== 'fixed' && (
                                        toolbarTemplate
                                    )}

                                    <FuseMessage/>

                                    {renderRoutes(this.props.routes)}

                                    {layoutConfig.footer.display && layoutConfig.footer.position === 'below' && layoutConfig.footer.style !== 'fixed' && (
                                        footerTemplate
                                    )}
                                </FuseScrollbars>

                                {layoutConfig.footer.display && layoutConfig.footer.position === 'below' && layoutConfig.footer.style === 'fixed' && (
                                    footerTemplate
                                )}
                            </div>

                            {layoutConfig.navbar.display && layoutConfig.navbar.position === 'right' && (
                                navBarTemplate
                            )}
                        </div>

                        {layoutConfig.footer.display && layoutConfig.footer.position === 'above' && (
                            footerTemplate
                        )}
                    </div>
                );
            }
        }
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        setSettings       : Actions.setSettings,
        setDefaultSettings: Actions.setDefaultSettings,
        resetSettings     : Actions.resetSettings,
        navbarOpenFolded  : Actions.navbarOpenFolded,
        navbarCloseFolded : Actions.navbarCloseFolded,
        navbarOpenMobile  : Actions.navbarOpenMobile,
        navbarCloseMobile : Actions.navbarCloseMobile
    }, dispatch);
}

function mapStateToProps({fuse})
{
    return {
        defaultSettings: fuse.settings.defaults,
        settings       : fuse.settings.current,
        navbar         : fuse.navbar
    }
}

FuseLayout1.defaultProps = defaultProps;

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(FuseLayout1)));
