import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import Grid from "@material-ui/core/es/Grid/Grid";
import Icon from "@material-ui/core/es/Icon/Icon";
import Paper from "@material-ui/core/es/Paper/Paper";
import Input from "@material-ui/core/es/Input/Input";
import FuseAnimate from "../../../@fuse/components/FuseAnimate/FuseAnimate";

import classNames from 'classnames';
import FieldList from "./FieldList";
import ViewWrapper from "./Editors/ViewWrapper";
import Editor from "./Editors/Editor";

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
    },
});
class FormBuilder extends Component {
    state = {
        formTitle: "",
        formAction: "",
        formDescription: "",
        currentIndex: 0,
        schema : {
            "type": "object",
            title: "",
            description: "",
            properties: {
                title: {type: "string", title: "Placeholder"},
                name: {type: "string", title: "Your name", description:"name"}
            }
        },
        uiSchema: {
            "title": {
                "ui:widget": "password",
                "ui:disabled": "true"
            },
            "name": {
                "ui:disabled": "true"
            }
        },
        currentItem: {
            }
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    addTextField = () => {
        const t = {...this.state.schema};
        t.properties = {
            ...this.state.schema.properties,
        };

        const itemp = this.state.currentIndex + 1;
        const name = `question_${itemp}`;
        this.setState({currentIndex: itemp});
        t.properties[name] = {type:'string', title: name};
        // this.state.uiSchema[_slug] = field.uiSchema;
        // this.state.uiSchema["ui:order"] = (state.uiSchema["ui:order"] || []).concat(_slug);
        this.setState({schema: t})
    };

    addLongText = () => {

    };
    onChangeEditor = (item) => {
        this.setState({currentItem: item});
        console.log(item);
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
                            <Icon className={classNames(classes.logoIcon, "mr-16")}>note_add</Icon>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <span className={classNames(classes.logoText)}>Create new form</span>
                        </FuseAnimate>
                    </div>
                }

                content={
                    <div className="p-24">
                        <Grid container spacing={24}>
                            <FuseAnimate animation="transition.slideLeftIn" delay={200}>
                                <Grid item xs={2}>
                                    <FieldList addShortText={this.addTextField} addLongText={this.addLongText}/>
                                </Grid>
                            </FuseAnimate>

                            <FuseAnimate animation="transition.slideUpIn" delay={200}>
                                <Grid item xs={6}>
                                    <ViewWrapper changeEditor={this.onChangeEditor} schema={this.state.schema} uiSchema={this.state.uiSchema}/>
                                </Grid>
                            </FuseAnimate>

                            <FuseAnimate animation="transition.slideRightIn" delay={200}>
                                <Grid item xs={4}>
                                    <Editor item={this.state.currentItem}/>
                                </Grid>
                            </FuseAnimate>
                        </Grid>
                    </div>
                }
            />
        )
    }
}

export default withStyles(styles, {withTheme: true})(FormBuilder);