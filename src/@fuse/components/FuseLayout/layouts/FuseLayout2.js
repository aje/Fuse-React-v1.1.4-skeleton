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

const defaultProps = {};

const navbarWidth = 256;

const styles = theme => ({
    root               : {
        display      : 'flex',
        flexDirection: 'column',
        width        : '100%',
        height       : '100%',
        overflow     : 'hidden',
        '&.boxed'    : {
            maxWidth : 1280,
            margin   : '0 auto',
            boxShadow: theme.shadows[3]
        }
    },
    content            : {
        display                     : 'flex',
        overflow                    : 'auto',
        flex                        : '1 1 auto',
        flexDirection               : 'column',
        width                       : '100%',
        '-webkit-overflow-scrolling': 'touch',
        zIndex                      : 4
    },
    navbarWrapper      : {
        boxShadow: theme.shadows[3],
        zIndex   : 6
    },
    navbarPaperWrapper : {},
    navbar             : {
        display : 'flex',
        overflow: 'hidden',
        height  : 56,
        zIndex  : 6
    },
    navbarMobile       : {
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
    navbarHeaderWrapper: {
        display                       : 'flex',
        alignItems                    : 'center',
        flex                          : '0 0 auto',
        [theme.breakpoints.down('md')]: {
            flex           : '0 1 auto',
            ...theme.mixins.toolbar,
            backgroundColor: 'rgba(255, 255, 255, .05)',
            boxShadow      : theme.shadows[1]
        }
    },
    navbarHeader       : {
        display: 'flex',
        flex   : '1 0 auto',
        padding: '0 8px 0 16px'

    },
    navbarContent      : {
        [theme.breakpoints.down('md')]: {
            overflowX: 'hidden',
            overflowY: 'auto'
        },
        '-webkit-overflow-scrolling'  : 'touch'
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

class FuseLayout2 extends Component {

    render()
    {
        const {classes, toolbar, footer, navbarHeader, navbarContent, settings, navbar, navbarOpenMobile, navbarCloseMobile} = this.props;
        // console.warn('FuseLayout:: rendered');
        const layoutConfig = settings.layout.config;

        const navbarHeaderTemplate = (
            <div className={classes.navbarHeaderWrapper}>
                <div className={classes.navbarHeader}>
                    {navbarHeader}
                </div>
                <Hidden lgUp>
                    <IconButton onClick={navbarCloseMobile}>
                        <Icon>menu</Icon>
                    </IconButton>
                </Hidden>
            </div>
        );

        const navbarContentTemplate = (
            <div className={classes.navbarContent}>
                {navbarContent}
            </div>
        );

        const navBarTemplate = (
            <MuiThemeProvider theme={FuseThemes[settings.theme.navbar]}>
                <div id="fuse-navbar" className={classes.navbarWrapper}>
                    <Hidden mdDown>
                        <div
                            className={classNames(classes.navbar)}
                            style={{backgroundColor: FuseThemes[settings.theme.navbar].palette.background.default}}
                        >
                            {navbarHeaderTemplate}
                            {navbarContentTemplate}
                        </div>
                    </Hidden>

                    <Hidden lgUp>
                        <Drawer
                            anchor="left"
                            variant="temporary"
                            open={navbar.mobileOpen}
                            classes={{
                                paper: classes.navbarMobile
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

        return (
            <div id="fuse-layout" className={classNames(classes.root, layoutConfig.mode)}>

                {layoutConfig.toolbar.display && layoutConfig.toolbar.position === 'above' && (
                    toolbarTemplate
                )}

                {layoutConfig.navbar.display && (
                    navBarTemplate
                )}

                {layoutConfig.toolbar.display && layoutConfig.toolbar.position === 'below' && (
                    toolbarTemplate
                )}

                <FuseScrollbars className={classes.content}>
                    <FuseMessage/>
                    {renderRoutes(this.props.routes)}

                    {layoutConfig.footer.display && layoutConfig.footer.style === 'static' && (
                        footerTemplate
                    )}
                </FuseScrollbars>

                {layoutConfig.footer.display && layoutConfig.footer.style === 'fixed' && (
                    footerTemplate
                )}
            </div>
        );
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

FuseLayout2.defaultProps = defaultProps;

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(FuseLayout2)));
