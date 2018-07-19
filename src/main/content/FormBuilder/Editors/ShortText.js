import React, {Component}  from "react";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Au from "../../../../hoc/Au";
import Icon from "@material-ui/core/es/Icon/Icon";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import {withStyles} from "@material-ui/core/styles/index";
import Card from "@material-ui/core/es/Card/Card";
import Form from "react-jsonschema-form";
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";
import Grid from "@material-ui/core/es/Grid/Grid";
import TextField from "@material-ui/core/es/TextField/TextField";


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
    cardMargin: {
        marginTop: theme.spacing.unit
    },
    cardHeader: {
        paddingBottom: 0
    }
});

class ShortText  extends Component{
    state = {
        textSchema : {
            "type": "object",
            properties: {
                label: {type: "string", title: "Label"},
                title: {type: "string", title: "Placeholder"},
                required: {type: "boolean", title: "Required", default: false}
            }
        },
        formAction: "",
        currentIndex: 0,
        schema : {
            "type": "object",
            title: "",
            description: "",
            properties: {}
        }
    };

    CustomInput = (prop) => {
        return (
            <Grid item xs={6}>
                <TextField fullWidth
                           id="custom"
                           onChange={(event) => prop.onChange(event.target.value)}
                           value={prop.value}
                           label={prop.schema.title}
                />
            </Grid>
        );
    };

    CustomCheckbox = (prop) =>{
        return (
            <div>
                {prop.title}
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={prop.value}
                            onChange={() => prop.onChange(!prop.value)}
                            value={prop.title}
                        />
                    }
                    label={prop.schema.title}
                />
            </div>
        );
    };

    CustomTitleField = ({title, required}) => {
        const legend = required ? title + '*' : title;
        return <h3 id="custom">{legend}</h3>;
    };

    CustomFieldTemplate = (e) => {
        const {id, className, label, help, required, description, errors, children} = e;
        return (
            <Au>
                {children}
            </Au>
        );
    };

    render() {

        const {classes} = this.props;
        const fields = {
            TitleField: this.CustomTitleField,
            StringField: this.CustomInput

        };

        const widgets = {
            CheckboxWidget: this.CustomCheckbox
        };

        const uiSchema = {
            title: {
                "ui:options": {
                    label: false
                }
            }
        };

        return (
            <Card classes={{root: classes.cardMargin}}>
                <CardHeader
                    classes={{root: classes.cardHeader}}
                    action={
                        <Au>
                            <IconButton>
                                <Icon>zoom_out_map</Icon>
                            </IconButton>

                            <IconButton>
                                <Icon>delete</Icon>
                            </IconButton>

                            <IconButton>
                                <Icon>check</Icon>
                            </IconButton>
                        </Au>
                    }
                    title={`Edit short text `}
                />

                <CardContent>
                    <Form schema={this.state.textSchema}
                          fields={fields}
                          widgets={widgets}
                          uiSchema={uiSchema}
                          FieldTemplate={this.CustomFieldTemplate}
                    >
                        <div>
                        </div>
                    </Form>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles, {withTheme: true})(ShortText);