import React, {Component} from 'react';
import Au from "../../../../hoc/Au";
import Form from "react-jsonschema-form";
import {connect} from "react-redux";
import Button from "@material-ui/core/es/Button/Button";
import axios from "axios";
import Paper from "@material-ui/core/es/Paper/Paper";
import * as Actions from "../store/actions";
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import * as mtd from "../FormElements/FormElements";
import * as CT from "../FormElements/CustomTemplates";
import * as fuseActions from "store/actions";
import FieldWrapper from "./FieldWrapper";
import withRouter from "react-router-dom/es/withRouter";

class ViewWrapper extends Component{

    state = {
        loading: false
    };

     saveForm = () => {
        this.setState({loading:true})
        axios.post("https://valued-mediator-138113.firebaseio.com/forms.json", {
                schema: this.props.formSchema,
                uiSchema: this.props.uiSchema
            })
            .then((res) => {
                this.setState({loading: false})
                this.props.showMessage({
                    message     : 'Form Saved!',
                    anchorOrigin: {
                        vertical  : 'bottom',
                        horizontal: 'right'
                    }
                })
                this.props.history.push('/form-builder/forms')
            }).catch((error) => {
                this.setState({loading: false})
            })


    };

    render() {

        const fieldHelper = (field, el) => {
            return (
                <FieldWrapper
                    field={field}
                    changeGrid={this.props.changeGrid}
                    changeEditor={this.props.changeEditor}
                    remove={this.props.removeField}>
                    {el(field)}
                </FieldWrapper>
            )
        };

        let uiSchema = {};
        if (this.props.uiSchema !== undefined) {
            Object.keys(this.props.uiSchema).map((key) => {
                uiSchema[key] = {
                    ...this.props.uiSchema[key],
                    "ui:widget": (field) => fieldHelper(field, mtd[this.props.uiSchema[key].type])
                }
            });
        }

        return (
            <Au>

                    <Form schema={this.props.formSchema}
                          FieldTemplate={CT.CustomFieldTemplate}
                          uiSchema={uiSchema}
                          ObjectFieldTemplate={CT.ObjectFieldTemplate}
                          className={this.state.loading ? "loading" : ""}
                    >
                        <Paper square elevation={1}>
                            <CardActions>
                                <Button variant="contained" disabled={Object.keys(this.props.formSchema.properties).length === 0} color={"primary"} onClick={this.saveForm}>Save form</Button>
                                <Button variant="contained" color={"secondary"}
                                        onClick={this.props.clearForm}>Clear</Button>
                            </CardActions>
                        </Paper>
                    </Form>
            </Au>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addField: (field) => dispatch(Actions.addField(field)),
        removeField: (field) => dispatch(Actions.removeField(field)),
        clearForm: () => dispatch(Actions.clearForm()),
        changeGrid: (field, grid)  => dispatch(Actions.changeGrid(field, grid)),
        showMessage: (options)  => dispatch(fuseActions.showMessage(options)),
    };
};


const mapStateToProps = (state) => {
    return {
        formSchema: state.formBuilderRedux.schema,
        uiSchema:  state.formBuilderRedux.uiSchema
    }
};

export default withRouter((connect(mapStateToProps,mapDispatchToProps)(ViewWrapper)));