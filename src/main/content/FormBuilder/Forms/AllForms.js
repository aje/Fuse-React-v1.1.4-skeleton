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
import Link from "@material-ui/icons/es/Link";

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
    cardHeader: {
        padding: 0
    },
    addButton               : {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
    }
});
class AllForms extends Component {
    state = {
        forms: {},
        loaded: false,
        modal: false,
        currentForm: {},
        currentFormId: null
    };

    handleModal = () => {
        const t = this.state.modal;
        this.setState({ modal: !t });
    };
    openForm = (schema,id) => {
        this.handleModal();
        this.setState({currentForm: schema})
        this.setState({currentFormId: id})
    };
    componentDidMount() {
        this.getDate();
    }

    getDate = () => {
        axios.get('https://valued-mediator-138113.firebaseio.com/forms.json')
            .then((response)=>{
                this.setState({forms: response.data, loaded: true});
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
        let dataTable = null;
        if(this.state.loaded) {
            let data = [];
            let ids = [];
            if(this.state.forms !== null) {

                data = Object.keys(this.state.forms).map((key)=>{
                    ids.push(key);
                    return this.state.forms[key]
                });
            }

            dataTable = <ReactTable
                data={data}
                autoGenerateColumns={ false }
                getTrProps={(state, rowInfo, column) => {

                    return {
                        className: "cursor-pointer",
                        onClick  : (e, handleOriginal) => {
                            if ( rowInfo )
                            {
                                this.openForm(rowInfo.original,ids[rowInfo.index]);
                            }
                        }
                    }
                }}
                columns={[

                    {
                        Header  : "Title",
                        Cell: row => row.original.schema.title,
                    },
                    {
                        Header  : "Description",
                        id      : "description",
                        Cell: row => row.original.schema.description
                    },
                    {
                        Header: "",
                        width : 150,
                        Cell  : (row, index) => (
                            <div className="flex items-center">
                                <IconButton
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        // toggleStarredContact(row.original.id)
                                    }}
                                >
                                    {/*{user.starred && user.starred.includes(row.original.id) ? (*/}
                                        <Icon>star</Icon>
                                    {/*) : (*/}
                                        {/*<Icon>star_border</Icon>*/}
                                    {/*)}*/}
                                </IconButton>
                                <IconButton
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        this.editFormHandle(row.original.schema,row.original.uiSchema,ids[row.index])
                                    }}
                                >
                                    <Icon>edit</Icon>
                                </IconButton>
                                <IconButton
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        this.removeForm(ids[row.index]);
                                    }}
                                >
                                    <Icon>delete</Icon>
                                </IconButton>
                            </div>
                        )
                    }

                ]}
                noDataText="No forms found!"
                defaultPageSize={10}
                className="-striped -highlight"
            />
        }

        let uiSchema = {};
        let schema = {};
        if(this.state.currentForm.schema !== undefined) {
            Object.keys(this.state.currentForm.uiSchema).map((key)=>{
                if (key !== "ui:order") {
                    uiSchema[key] = {
                        ...this.state.currentForm.uiSchema[key],
                        "ui:widget": mtd[this.state.currentForm.uiSchema[key].type]
                    }
                }
            });
            uiSchema["ui:order"] = this.state.currentForm.uiSchema["ui:order"];
            schema = {...this.state.currentForm.schema};
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
                        <Grid container spacing={24}>

                            {elements}

                        </Grid>
                </Au>
            );
        };

        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <div className={classNames(classes.root, "p-24")}>
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Icon className={classNames(classes.logoIcon, "mr-16")}>list</Icon>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <span className={classNames(classes.logoText)}>All Forms</span>
                        </FuseAnimate>
                    </div>
                }
                content={
                    <div className="p-24">
                        <FuseAnimate animation="transition.slideLeftIn" delay={200}>
                            <div>
                                {this.state.loaded ? dataTable : <Paper style={{height: 200}} className={"loading"}></Paper>}
                                </div>
                        </FuseAnimate>

                        <Dialog
                            open={this.state.modal}
                            onClose={this.handleModal}
                        >
                            {this.state.currentForm.schema !== undefined ? <Au>
                                    {/*<DialogTitle id="alert-dialog-title">{this.state.currentFormSchema.schema.title}</DialogTitle>*/}
                                    <DialogContent>
                                        <Form schema={schema}
                                              FieldTemplate={CT.CustomFieldTemplate}
                                              uiSchema={uiSchema}
                                              ObjectFieldTemplate={ObjectFieldTemplate}
                                        ><div></div></Form>
                                    </DialogContent>
                                </Au> : ""}
                            <DialogActions>
                                <Button onClick={this.handleModal} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={()=> this.editFormHandle(this.state.currentForm.schema,uiSchema)} color="primary">
                                    Edit
                                </Button>
                                <Button onClick={() => {
                                    this.props.history.push("/form-builder/forms/"+this.state.currentFormId)
                                }} color="secondary" autoFocus>
                                    See in page
                                </Button>
                            </DialogActions>

                        </Dialog>
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

export default withRouter(withStyles(styles, {withTheme: true})(connect(null, mapDispatchToProps)(AllForms)));
