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
    cardHeader: {
        padding: 0
    }
});
class AllForms extends Component {
    state = {
        forms: {},
        loaded: false,
        modal: false,
        currentForm: {},
    };

    handleModal = () => {
        const t = this.state.modal;
        this.setState({ modal: !t });
    };

    openForm = (schema) => {
        this.handleModal();
        this.setState({currentForm: schema})
    };
    componentDidMount() {
        axios.get('https://valued-mediator-138113.firebaseio.com/forms.json')
            .then((response)=>{
                //console.log(response.data);
                this.setState({forms: response.data, loaded: true});

            }).catch((error)=>{
                console.log(error);
            });
    }
    removeForm = (id) => {
        console.log(id)
    };

    editFormHandle = (schema, uiSchema) => {
        this.props.editForm(schema, uiSchema);
        this.props.history.push('/form-builder/edit-form')
    };

    render() {
        const {classes} = this.props;
        let dataTable = null;
        if(this.state.loaded &&  this.state.forms !== null) {
            let data = Object.keys(this.state.forms).map((key)=>{
                return this.state.forms[key]
            });
            //console.log(data)
            dataTable = <ReactTable
                data={data}
                autoGenerateColumns={ false }
                getTrProps={(state, rowInfo, column) => {
                    return {
                        className: "cursor-pointer",
                        onClick  : (e, handleOriginal) => {
                            if ( rowInfo )
                            {
                                this.openForm(rowInfo.original);
                            }
                        }
                    }
                }}
                columns={[

                    {
                        Header  : "Title",
                        Cell: row => row.original.schema.title
                    },
                    {
                        Header  : "Description",
                        id      : "description",
                        Cell: row => row.original.schema.description
                    },
                    {
                        Header: "",
                        width : 128,
                        Cell  : row => (
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
                                        this.removeForm(row.original.id);
                                    }}
                                >
                                    <Icon>delete</Icon>
                                </IconButton>
                            </div>
                        )
                    }

                ]}
                defaultPageSize={10}
                className="-striped -highlight"
            />
        }
        let uiSchema = {};
        if(this.state.currentForm.schema !== undefined) {

             Object.keys(this.state.currentForm.uiSchema).map((key)=>{
                 uiSchema[key] = {...this.state.currentForm.uiSchema[key],"ui:widget": mtd[this.state.currentForm.uiSchema[key].type]}
            });
            //console.log(uiSchema)
        }

        const ObjectFieldTemplate = (e) =>{
            // console.log(e.properties);
            const elements = e.properties.map((element, i) => {
                //console.log(element.content.props.schema.grid)
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

        const CustomFieldTemplate = (e) => {
            const {id, className, label, help, required, description, errors, children} = e;
            return <div >{children}</div>;
        };

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
                            <span className={classNames(classes.logoText)}>All Forms</span>
                        </FuseAnimate>
                    </div>
                }
                content={
                    <div className="p-24">
                        <FuseAnimate animation="transition.slideLeftIn" delay={200}>
                            <div>{dataTable}</div>
                        </FuseAnimate>
                        <Dialog
                            open={this.state.modal}
                            onClose={this.handleModal}
                        >
                            {this.state.currentForm.schema !== undefined ? <Au>
                                    {/*<DialogTitle id="alert-dialog-title">{this.state.currentFormSchema.schema.title}</DialogTitle>*/}
                                    <DialogContent>
                                        <Form schema={this.state.currentForm.schema}
                                              FieldTemplate={CustomFieldTemplate}
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
                                <Button onClick={this.handleModal} color="secondary" autoFocus>
                                    See in page
                                </Button>
                            </DialogActions>

                        </Dialog>
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
