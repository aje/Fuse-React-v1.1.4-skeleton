import React, {Component}  from "react";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import {withStyles} from "@material-ui/core/styles/index";
import Card from "@material-ui/core/es/Card/Card";
import Form from "react-jsonschema-form";
import * as schemas from "./schemas"
import {connect} from "react-redux";
import * as aC from "../store/actions";

const styles = theme => ({
    cardHeader: {
        backgroundColor: theme.palette.primary[500]
    },
    cardTitle: {
        color: "white"
    }
});

class Editor  extends Component{
    state = {
        schema : {
            "type": "object",
            properties: {
                label: {type: "string", title: "Label"}
            }
        },
        formData:{
            label: "title"
        },
        t : 1
    };

    componentDidUpdate = () => {
        if(this.props.item.schema !== undefined ) {
            if (this.state.schema.properties.label.default !== this.props.item.schema.title) {
                const t = {...this.state.schema};
                const label = {
                    label: {type: "string", title: "Label", default: this.props.item.schema.title}
                };
                t.properties = {...label, ...schemas[this.props.item.schema["editType"]]};

                const tdata = {
                    ...this.state.formData,
                    label: this.props.item.schema.title,
                    helper: this.props.item.schema.helper,
                    default: this.props.item.schema.default,
                    placeholder: this.props.item.schema.placeholder,
                    require: this.props.item.required || this.props.item.schema.require
                };

                // set all form types to radio
                const tUiSchema = {
                    inputType: {
                        "ui:widget": "radio",
                        "ui:options": {
                            "inline": true
                        }
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

    render() {
        const {classes} = this.props;
        return (
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
                    />
                </CardContent>
            </Card>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editField: (field,data) => dispatch(aC.editField(field,data)),
    };
};

const mapStateToProps = (state) => {
    return {
        formSchema: state.formBuilderRedux.schema,
        uiSchema:  state.formBuilderRedux.uiSchema
    }
};

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Editor));