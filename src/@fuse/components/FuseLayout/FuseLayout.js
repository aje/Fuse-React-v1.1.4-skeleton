import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import {matchRoutes} from 'react-router-config'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from 'store/actions';
import _ from 'lodash';
import FuseLayouts from './FuseLayouts';

const styles = theme => ({
    root:{
        backgroundColor             : theme.palette.background.default,
        color                       : theme.palette.text.primary,

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
    }
});

class FuseLayout extends Component {

    constructor(props)
    {
        super(props);
        this.routeSettingsCheck();
    }

    componentDidUpdate(prevProps)
    {
        if ( !_.isEqual(this.props.location.pathname, prevProps.location.pathname) )
        {
            this.routeSettingsCheck();
        }
    }

    routeSettingsCheck = () => {
        const matched = matchRoutes(this.props.routes, this.props.location.pathname)[0];

        if ( matched && matched.route.settings )
        {
            const routeSettings = _.merge({}, this.props.defaultSettings, matched.route.settings);
            if ( !_.isEqual(this.props.settings, routeSettings) )
            {
                this.props.setSettings(_.merge({}, routeSettings));
            }
        }
        else
        {
            if ( !_.isEqual(this.props.settings, this.props.defaultSettings) )
            {
                this.props.resetSettings();
            }
        }
    };

    render()
    {
        const {settings, classes} = this.props;
        // console.warn('FuseLayout:: rendered');
        const Layout = FuseLayouts[settings.layout.style].component;
        return (
            <Layout className={classes.root} {...this.props}/>
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

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(FuseLayout)));
