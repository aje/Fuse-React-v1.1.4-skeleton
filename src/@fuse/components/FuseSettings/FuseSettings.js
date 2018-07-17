import React, {Component} from 'react';
import {Typography, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, Switch, withStyles} from '@material-ui/core';
import * as Actions from 'store/actions';
import * as AuthActions from 'auth/store/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {FuseThemes, FuseLayouts} from '@fuse';
import classNames from 'classnames';
import _ from 'lodash';

const styles = theme => ({
    root          : {},
    formControl   : {
        margin        : '6px 0',
        width         : '100%',
        '&:last-child': {
            marginBottom: 0
        }
    },
    group         : {},
    formGroupTitle: {
        position       : 'absolute',
        top            : -10,
        left           : 8,
        fontWeight     : 500,
        padding        : '0 4px',
        backgroundColor: theme.palette.background.paper
    },
    formGroup     : {
        position         : 'relative',
        border           : '1px solid ' + theme.palette.divider,
        borderRadius     : 2,
        padding          : '12px 12px 0 12px',
        margin           : '24px 0 16px 0',
        '&:first-of-type': {
            marginTop: 16
        }
    }
});

class FuseSettings extends Component {

    handleChange = (event) => {

        const newSettings = _.set(_.merge({}, this.props.settings), event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);

        /**
         * If layout style changes,
         * Reset Layout Configuration
         */
        if ( event.target.name === 'layout.style' && event.target.value !== this.props.settings.layout.style )
        {
            newSettings.layout.config = {};
        }

        if ( this.props.user.role === 'guest' )
        {
            this.props.setDefaultSettings(newSettings);
        }
        else
        {
            this.props.updateUserSettings(newSettings);
        }
    };

    render()
    {
        const {classes, settings} = this.props;

        function ThemeSelect({value, name, handleChange})
        {
            return (
                <Select
                    className="w-full"
                    value={value}
                    onChange={handleChange}
                    name={name}
                >
                    {Object.entries(FuseThemes).map(([key, val]) => (
                        <MenuItem
                            key={key} value={key}
                            className="m-8 mt-0 rounded-lg"
                            style={{
                                backgroundColor: val.palette.background.default,
                                color          : val.palette.text.primary,
                                border         : '1px solid ' + val.palette.divider
                            }}
                        >
                            {_.startCase(key)}
                            <div
                                className="flex w-full h-8 block absolute pin-b pin-l pin-r"
                                style={{
                                    borderTop: '1px solid ' + val.palette.divider
                                }}
                            >
                                <div className="w-1/4 h-8" style={{backgroundColor: val.palette.primary.main}}/>
                                <div className="w-1/4 h-8" style={{backgroundColor: val.palette.secondary.main}}/>
                                <div className="w-1/4 h-8" style={{backgroundColor: val.palette.error.main}}/>
                                <div className="w-1/4 h-8" style={{backgroundColor: val.palette.background.paper}}/>
                            </div>
                        </MenuItem>
                    ))}
                </Select>
            );
        }

        const LayoutSelect = () => {
            return (
                <FormControl component="fieldset" className={classes.formControl}>

                    <FormLabel component="legend" className="text-14">Style</FormLabel>

                    <RadioGroup
                        aria-label="Layout Style"
                        name="layout.style"
                        className={classes.group}
                        value={settings.layout.style}
                        onChange={this.handleChange}
                    >
                        {Object.entries(FuseLayouts).map(([key, layout]) => (
                                <FormControlLabel key={key} value={key} control={<Radio/>} label={layout.title}/>
                            )
                        )}
                    </RadioGroup>
                </FormControl>
            );
        };

        const getForm = (form, prefix) => {
            return Object.entries(form).map(([key, formControl]) => {
                const target = prefix ? prefix + '.' + key : key;
                switch ( formControl.type )
                {
                    case 'radio':
                    {
                        return (
                            <FormControl key={target} component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend" className="text-14">{formControl.title}</FormLabel>
                                <RadioGroup
                                    aria-label={formControl.title}
                                    name={`layout.config.${target}`}
                                    className={classes.group}
                                    value={_.get(settings.layout.config, target)}
                                    onChange={this.handleChange}
                                    row={formControl.options.length < 4}
                                >
                                    {formControl.options.map((opt) => (
                                        <FormControlLabel key={opt.value} value={opt.value} control={<Radio/>} label={opt.name}/>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        );
                    }
                    case 'switch':
                    {
                        return (
                            <FormControl key={target} component="fieldset" className={classes.formControl}>
                                <FormControlLabel
                                    classes={{
                                        // root: "flex-row-reverse justify-end pl-16"
                                    }}
                                    control={
                                        <Switch
                                            name={`layout.config.${target}`}
                                            checked={_.get(settings.layout.config, target)}
                                            onChange={this.handleChange}
                                            aria-label={formControl.title}
                                        />
                                    }
                                    label={<FormLabel component="legend" className="text-14">{formControl.title}</FormLabel>}
                                />
                            </FormControl>
                        )
                    }
                    case 'group':
                    {
                        return (
                            <div key={target} className={classes.formGroup}>

                                <Typography className={classes.formGroupTitle} color="textSecondary">
                                    {formControl.title}
                                </Typography>

                                {
                                    getForm(formControl.children, key)
                                }
                            </div>
                        );
                    }
                    default:
                    {
                        return ''
                    }
                }
            });
        };

        const LayoutConfig = () => {
            const form = FuseLayouts[settings.layout.style].form;
            return getForm(form);
        };

        return (
            <div className={classes.root}>

                <div className={classes.formGroup}>

                    <Typography className={classes.formGroupTitle} color="textSecondary">
                        Layout
                    </Typography>

                    <LayoutSelect/>

                    <LayoutConfig/>

                    <Typography className="my-16 text-12 italic" color="textSecondary">
                        *Not all option combinations are available
                    </Typography>

                </div>

                <div className={classNames(classes.formGroup, "pb-16")}>

                    <Typography className={classes.formGroupTitle} color="textSecondary">
                        Theme
                    </Typography>

                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend" className="text-14">Main</FormLabel>
                        <ThemeSelect value={settings.theme.main} name="theme.main" handleChange={this.handleChange}/>
                    </FormControl>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend" className="text-14">Navbar</FormLabel>
                        <ThemeSelect value={settings.theme.navbar} name="theme.navbar" handleChange={this.handleChange}/>
                    </FormControl>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend" className="text-14">Toolbar</FormLabel>
                        <ThemeSelect value={settings.theme.toolbar} name="theme.toolbar" handleChange={this.handleChange}/>
                    </FormControl>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend" className="text-14">Footer</FormLabel>
                        <ThemeSelect value={settings.theme.footer} name="theme.footer" handleChange={this.handleChange}/>
                    </FormControl>
                </div>

                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend" className="text-14">Custom Scrollbars</FormLabel>
                    <Switch
                        checked={settings.customScrollbars}
                        onChange={this.handleChange}
                        aria-label="Custom Scrollbars"
                        name="customScrollbars"
                    />
                </FormControl>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        setDefaultSettings: Actions.setDefaultSettings,
        updateUserSettings: AuthActions.updateUserSettings
    }, dispatch);
}

function mapStateToProps({fuse, auth})
{
    return {
        settings: fuse.settings.current,
        user    : auth.user
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FuseSettings));
