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
import Au from "../../../hoc/Au";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Button from "@material-ui/core/es/Button/Button";
import Typography from "@material-ui/core/es/Typography/Typography";
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/es/FormControlLabel"

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
    }, hover: {
        position: "relative",
        border: "1px solid transparent",
        transition: "all .2s",
        cursor: "pointer",
        "&:hover" : {
            border: "1px dashed #aaa"
        }
    },
    closeBtn: {
        position: "absolute",
        top: "-20px",
        right: "-20px"
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

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };




    addField = (field) => {
        // create temp for schema properties and uiSchema
        const t = {...this.state.schema};
        t.properties = {...this.state.schema.properties};
        const tUi = {...this.state.uiSchema};

        // create a random name
        const itemp = this.state.currentIndex + 1;
        const name = `filed_${itemp}`;
        this.setState({currentIndex: itemp});

        // add field to schema and ui to uiSchema
        t.properties[name] = {...field.schema, title:name};
        tUi[name] = field.uiSchema;

        //console.log(t);
        // console.log(tUi);

        // this.state.uiSchema[_slug] = field.uiSchema;
        // this.state.uiSchema["ui:order"] = (state.uiSchema["ui:order"] || []).concat(_slug);

        // set states
        this.setState({uiSchema: tUi});
        this.setState({schema: t});
    };

    removeField = (name) => {
        //const requiredFields = state.schema.required || [];
        const t = {...this.state.schema};
        delete t.properties[name];
        //delete t.uiSchema[name];
        // t.uiSchema["ui:order"] = state.uiSchema["ui:order"].filter(
        //     (field) => field !== name);
        // state.schema.required = requiredFields
        //     .filter(requiredFieldName => name !== requiredFieldName);


        // if (t.schema.required.length === 0) {
        //     this.setState({schema: {}})
        // }
        this.setState({schema: t})
    };

    onChangeEditor = (item) => {
        this.setState({currentItem: item});
        // console.log(item);item
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
                                    <FieldList add={this.addField}  remove={this.removeField} changeEditor={this.onChangeEditor} />
                                </Grid>
                            </FuseAnimate>

                            <FuseAnimate animation="transition.slideUpIn" delay={200}>
                                <Grid item xs={7}>
                                    <ViewWrapper remove={this.removeField} changeEditor={this.onChangeEditor} schema={this.state.schema} uiSchema={this.state.uiSchema}/>
                                </Grid>
                            </FuseAnimate>

                            <FuseAnimate animation="transition.slideRightIn" delay={200}>
                                <Grid item xs={3}>
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