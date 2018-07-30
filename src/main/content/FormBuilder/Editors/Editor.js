import React, {Component}  from "react";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import {withStyles} from "@material-ui/core/styles/index";
import Card from "@material-ui/core/es/Card/Card";
import Form from "react-jsonschema-form";
import * as schemas from "./schemas"
import {connect} from "react-redux";
import * as aC from "../store/actions";
import Au from "../../../../hoc/Au";

const styles = theme => ({
    cardHeader: {
        backgroundColor: theme.palette.primary[500],
        padding: 10
    },
    cardTitle: {
        fontSize: 16,
        color: "white"
    }
});

class Editor  extends Component{
    state = {
        schema : {
            "type": "object",
            properties: {}
        },
        formData:{
            label: "title"
        },
        formDetailData: {
            title: this.props.formSchema.title,
            desc: this.props.formSchema.description,
            action: this.props.formSchema.action
        },
    };

    componentDidUpdate = () => {
        if(this.props.item.schema !== undefined ) {
            if (this.state.schema.properties.label === undefined || this.state.schema.properties.label.default !== this.props.item.schema.title) {
                const t = {...this.state.schema};
                const label = {
                    label: {type: "string", title: "Label", default: this.props.item.schema.title}
                };
                t.properties = {...label, ...schemas[this.props.item.schema["editType"]]};

                const item = this.props.item.schema;

                const tdata = {
                    ...this.state.formData,
                    label: item.title,
                    helper: item.helper,
                    default: item.default,
                    placeholder: item.placeholder,
                    require: this.props.item.required || item.require,
                    inputType: item.inputType,
                    rows: item.rows,
                    maximum: item.maximum
                };


                if (item.items !== undefined) {
                    tdata.options = [...item.items.enum]
                }

                // set all form types to radio
                const tUiSchema = {
                    inputType: {
                        "ui:widget": "radio",
                        "ui:options": {
                            "inline": true
                        }
                    },
                    "rows": {
                        "ui:widget": "range"
                    },
                    "maximum": {
                        "ui:widget": "range"
                    },
                    "accept": {
                        "ui:widget": "checkboxes"
                    }

                };
                this.setState({uiSchema: tUiSchema});
                this.setState({formData: tdata});
                this.setState({schema: t});

            }
        }
    };

    onSubmit = ({formData}) => {
        this.props.editField(this.props.item,formData);
        this.setState({formData: formData});
    };

    onEditFormDetail = ({formData}) => {
        this.props.editFormDetails(formData);
        this.setState({formDetailData: formData});
    };

    render() {
        const {classes} = this.props;

        const formDetailSchema = {
            type: "object",
            properties: {
                title: {type: "string", title: "Title"},
                desc: {type: "string", title: "Description"},
                action: {type: "string", title: "Form Action"}
            }
        };
        return (
            <Au>

                <Card>
                    <CardHeader
                        classes={{root: classes.cardHeader, title: classes.cardTitle}}
                        title={"Edit " + (this.props.item.schema !== undefined ? this.props.item.schema.title : "Choose one")}
                    />

                    <CardContent>

                        <Form schema={(this.state.schema)}
                              formData={this.state.formData}
                              uiSchema={this.state.uiSchema}
                              onChange={this.onSubmit}
                        ><div></div></Form>
                    </CardContent>
                </Card><br/>

                <Card>
                    <CardHeader
                        classes={{root: classes.cardHeader, title: classes.cardTitle}}
                        title={"Form Detail"}
                    />

                    <CardContent>
                        <Form schema={formDetailSchema}
                              formData={this.state.formDetailData}
                            //uiSchema={this.state.uiSchema}
                              onChange={this.onEditFormDetail}
                        ><div></div></Form>
                    </CardContent>
                </Card>
            </Au>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editField: (field,data) => dispatch(aC.editField(field,data)),
        editFormDetails: (data) => dispatch(aC.editFormDetails(data)),
    };
};

const mapStateToProps = (state) => {
    return {
        formSchema: state.formBuilderRedux.schema,
        uiSchema:  state.formBuilderRedux.uiSchema
    }
};

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Editor));