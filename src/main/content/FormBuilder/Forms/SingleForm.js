import React, {Component} from 'react';
import ReactTable from "react-table";
import axios from "axios";
import Form from "react-jsonschema-form";
import classNames from 'classnames';
import FusePageSimple from "../../../../@fuse/components/FusePageLayouts/FusePageSimple";
import FuseAnimate from "../../../../@fuse/components/FuseAnimate/FuseAnimate";
import {withStyles} from "@material-ui/core/styles/index";
import Icon from "@material-ui/core/es/Icon/Icon";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import Button from "@material-ui/core/es/Button/Button";
import Au from "../../../../hoc/Au";
import * as mtd from "../FormElements/FormElements";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import Grid from "@material-ui/core/es/Grid/Grid";
import * as aC from "../store/actions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as CT from "../FormElements/CustomTemplates";
import Paper from "@material-ui/core/es/Paper/Paper";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";

const styles = theme => ({
    root         : {
        display: 'flex',
        flex   : '1'
    },
    logoIcon         : {
        fontSize: '32px!important'
    },
    logoText         : {
        fontSize: 24
    },
    addButton               : {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
    }
});
class SingleForm extends Component {
    state = {
        form: {},
        loaded: false,
    };

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get("https://valued-mediator-138113.firebaseio.com/forms/"+this.props.match.params.id+".json")
            .then((response)=>{
                this.setState({form: response.data, loaded: true});
            }).catch((error)=>{
                this.setState({loaded:true});
                console.log(error);
            });
    };

    removeForm = (id) => {
        this.setState({loaded: true});
        axios.delete("https://valued-mediator-138113.firebaseio.com/forms/"+id+".json")
            .then((res)=>{
                this.setState({loaded: false});
                this.getDate();
            })
            .catch((error)=>{
                this.setState({loaded: false});
                console.log(error)
            })
    };

    editFormHandle = (schema, uiSchema, id) => {
        this.props.editForm(schema, uiSchema);
        this.props.history.push('/form-builder/edit-form')
    };

    render() {
        const {classes} = this.props;

        let uiSchema = {};
        let schema = {};
        if(this.state.form.schema !== undefined) {
            Object.keys(this.state.form.uiSchema).map((key)=>{
                if (key !== "ui:order") {
                    uiSchema[key] = {
                        ...this.state.form.uiSchema[key],
                        "ui:widget": mtd[this.state.form.uiSchema[key].type]
                    }
                }
            });
            uiSchema["ui:order"] = this.state.form.uiSchema["ui:order"];
            schema = {...this.state.form.schema};
            // Object.keys(schema.properties).map(key => {
            //     delete schema.properties[key].editType;
            // });
        }


        const ObjectFieldTemplate = (e) =>{
            const elements = e.properties.map((element, i) => {
                return <Grid item key={i} xs={element.content.props.schema.grid ? element.content.props.schema.grid : 12}>{element.content}</Grid>;
            });

            return (
                <Au>
                    <CardHeader
                        classes={{root: classes.cardHeader, title: classes.cardTitle,subheader: classes.white}}
                        title={e.title}
                        subheader={e.description}
                    />
                    <CardContent>
                    <Grid container spacing={24}>

                        {elements}

                    </Grid>
                    </CardContent>
                </Au>
            );
        };

        console.log(uiSchema)

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
                            <span className={classNames(classes.logoText)}></span>
                        </FuseAnimate>
                    </div>
                }
                content={
                    <div className="p-24">
                        <FuseAnimate animation="transition.slideLeftIn" delay={200}>
                            <div>
                                {this.state.loaded ?
                                    <Card>
                                    <Form schema={schema}
                                          FieldTemplate={CT.CustomFieldTemplate}
                                          uiSchema={uiSchema}
                                          onSubmit={({formData})=>(console.log(formData))}
                                          ObjectFieldTemplate={ObjectFieldTemplate}
                                    ></Form>
                                    </Card>
                                    : <Paper style={{height: 200}} className={"loading"}></Paper>}
                            </div>
                        </FuseAnimate>

                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Button
                                variant="fab"
                                color="primary"
                                aria-label="add"
                                className={classes.addButton}
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.props.history.push('/form-builder/add-form')
                                }}
                            >
                                <Icon>note_add</Icon>
                            </Button>
                        </FuseAnimate>
                    </div>
                }>
            </FusePageSimple>
        );
    }

}

const mapDispatchToProps = dispatch => {
    return {
        editForm: (schema,uiSchema) => dispatch(aC.editForm(schema,uiSchema))
    }
};

export default withRouter(withStyles(styles, {withTheme: true})(connect(null, mapDispatchToProps)(SingleForm)));
