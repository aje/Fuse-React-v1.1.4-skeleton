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
    //
    // addField = (field) => {
    //     // create temp for schema properties and uiSchema
    //     const t = {...this.state.schema};
    //     t.properties = {...this.state.schema.properties};
    //     const tUi = {...this.state.uiSchema};
    //
    //     // create a random name
    //     const itemp = this.state.currentIndex + 1;
    //     const name = `filed_${itemp}`;
    //     this.setState({currentIndex: itemp});
    //
    //     // add field to schema and ui to uiSchema
    //     t.properties[name] = {...field.schema, title:name};
    //     tUi[name] = field.uiSchema;
    //
    //     // this.state.uiSchema[_slug] = field.uiSchema;
    //     // this.state.uiSchema["ui:order"] = (state.uiSchema["ui:order"] || []).concat(_slug);
    //
    //     // set states
    //     this.setState({uiSchema: tUi});
    //     this.setState({schema: t});
    // };

    // removeField = (name) => {
    //     //const requiredFields = state.schema.required || [];
    //     const t = {...this.state.schema};
    //     delete t.properties[name];
    //     //delete t.uiSchema[name];
    //     // t.uiSchema["ui:order"] = state.uiSchema["ui:order"].filter(
    //     //     (field) => field !== name);
    //     // state.schema.required = requiredFields
    //     //     .filter(requiredFieldName => name !== requiredFieldName);
    //
    //
    //     // if (t.schema.required.length === 0) {
    //     //     this.setState({schema: {}})
    //     // }
    //     this.setState({schema: t})
    // };

    onChangeEditor = (item) => {
        this.setState({currentItem: item});
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
                                    <FieldList  changeEditor={this.onChangeEditor} />
                                </Grid>
                            </FuseAnimate>

                            <FuseAnimate animation="transition.slideUpIn" delay={200}>
                                <Grid item xs={7}>
                                    <ViewWrapper  changeEditor={this.onChangeEditor}/>
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

// function mapDispatchToProps(dispatch)
// {
//     return bindActionCreators({
//         addField: Actions.ADD_FIELD,
//         removeField: Actions.REMOVE_FIELD
//     }, dispatch);
// }

const mapDispatchToProps = dispatch => {
    return {
        addField: ( field) => dispatch(Actions.addField(field)),
        removeField: (field) => dispatch(Actions.removeField(field)),
    };
};


// function mapStateToProps({formBuilder})
// {
//     return {
//         state: formBuilder.state
//     }
// }

export default withStyles(styles, {withTheme: true})(connect(null, mapDispatchToProps)(FormBuilder));