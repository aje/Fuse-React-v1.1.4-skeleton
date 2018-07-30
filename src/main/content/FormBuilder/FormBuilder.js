import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import Grid from "@material-ui/core/es/Grid/Grid";
import Icon from "@material-ui/core/es/Icon/Icon";
import FuseAnimate from "../../../@fuse/components/FuseAnimate/FuseAnimate";

import classNames from 'classnames';

import ViewWrapper from "./Editors/ViewWrapper";
import Editor from "./Editors/Editor";

import {connect} from 'react-redux';
import * as Actions from './store/actions/index'
import FieldList from "./FieldList";
import withRouter from "react-router-dom/es/withRouter";
const styles = theme => ({
    root         : {
        display: 'flex',
        flex   : '1'
    },
    searchWrapper: {
        width                         : '100%',
        height                        : 56,
        padding                       : 18,
        [theme.breakpoints.down('md')]: {
            paddingLeft: 8
        },
        display                       : 'flex',
        alignItems                    : 'center'
    },
    logoIcon         : {
        fontSize: '32px!important'
    },
    logoText         : {
        fontSize: 24
    },
    search       : {
        paddingLeft: 16
    }
});

class FormBuilder extends Component {
    state = {
        formTitle: "",
        formAction: "",
        formDescription: "",
        currentIndex: 0,
        schema : {
            "type": "object",
            "properties": {}
        },
        uiSchema: {},
        currentItem: {}
    };

    onChangeEditor = (item) => {
        this.setState({currentItem: item});
    };

    componentDidMount = () => {
        if(this.props.history.location.pathname === '/form-builder/add-form')
        this.props.clearForm();
    };

    render(){
        const {classes} = this.props;
        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <div className={classNames(classes.root, "p-24")}>
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Icon className={classNames(classes.logoIcon, "mr-16")}>
                                {this.props.history.location.pathname === '/form-builder/add-form' ?
                                "note_add" : "edit"}
                            </Icon>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <span className={classNames(classes.logoText)}>
                                {this.props.history.location.pathname === '/form-builder/add-form' ?
                                    "Create new form" : "Edit form"}
                            </span>
                        </FuseAnimate>
                    </div>
                }

                content={
                    <div className="p-24">
                        <Grid container spacing={24}>
                                <Grid item xs={2}>
                                    <FieldList  changeEditor={this.onChangeEditor} />
                                </Grid>

                                <Grid item xs={7}>
                                    <ViewWrapper  changeEditor={this.onChangeEditor}/>
                                </Grid>

                                <Grid item xs={3}>
                                    <Editor item={this.state.currentItem}/>
                                </Grid>
                        </Grid>
                    </div>
                }
            />
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addField: ( field) => dispatch(Actions.addField(field)),
        removeField: (field) => dispatch(Actions.removeField(field)),
        clearForm: () => dispatch(Actions.clearForm()),
    };
};

export default withRouter(withStyles(styles, {withTheme: true})(connect(null, mapDispatchToProps)(FormBuilder)));