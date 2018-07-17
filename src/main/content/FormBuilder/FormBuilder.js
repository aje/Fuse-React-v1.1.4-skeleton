import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import Form from "react-jsonschema-form";
import Button from '@material-ui/core/Button';
import SchemaField from "react-jsonschema-form/lib/components/fields/SchemaField";
import TextField from "@material-ui/core/es/TextField/TextField";

const log = (type) => console.log.bind(console, type);

const styles = theme => ({
    layoutRoot: {}
});

class FormBuilder extends Component {
    state = {
        schema : {
            "type": "object",
            "title": "Number fields & widgets",
            properties: {
                title: {type: "string", title: "Title", default: "A new task"},
                done: {type: "boolean", title: "Done?", default: false}
            }
        },
        uiSchema: {
            "integer": {
                "ui:widget": "updown"
            },
            "numberEnumRadio": {
                "ui:widget": "radio",
                "ui:options": {
                    "inline": true
                }
            },
            "integerRange": {
                "ui:widget": "range"
            },
            "integerRangeSteps": {
                "ui:widget": "range"
            }
        }
    };



    addTextField = () => {
        const t = {...this.state.schema};
        t.properties = {
            ...this.state.schema.properties,
            newTitle: {type: "string", title: "Ne Title", default: "A new form field"},
        };
        this.setState({schema: t})
    };

    CustomInput = (prop) => {
        return (
            <TextField
                onChange={() => prop.onChange(!prop.value)}
                id="custom"
                value={prop.value}
            />
        );
    };
    render(){



        const widgets = {
            StringField: this.CustomInput
        };

        const schema = {
            "type": "object",
            "title": "Number fields & widgets",
            "properties": {
                "number": {
                    "title": "Number",
                    "type": "number"
                },
                "integer": {
                    "title": "Integer",
                    "type": "integer"
                },
                "numberEnum": {
                    "type": "number",
                    "title": "Number enum",
                    "enum": [
                        1,
                        2,
                        3
                    ]
                },
                "numberEnumRadio": {
                    "type": "number",
                    "title": "Number enum",
                    "enum": [
                        1,
                        2,
                        3
                    ]
                },
                "integerRange": {
                    "title": "Integer range",
                    "type": "integer",
                    "minimum": 42,
                    "maximum": 100
                },
                "integerRangeSteps": {
                    "title": "Integer range (by 10)",
                    "type": "integer",
                    "minimum": 50,
                    "maximum": 100,
                    "multipleOf": 10
                }
            }
        };

        const uiSchema = {
            "integer": {
                "ui:widget": "updown"
            },
            "numberEnumRadio": {
                "ui:widget": "radio",
                "ui:options": {
                    "inline": true
                }
            },
            "integerRange": {
                "ui:widget": "range"
            },
            "integerRangeSteps": {
                "ui:widget": "range"
            }
        };

        const {classes} = this.props;
        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <div className="p-24"><h4>Form Builder</h4></div>
                }
                contentToolbar={
                    <div className="px-24"><h4>Content Toolbar</h4></div>
                }
                content={
                    <div className="p-24">
                        <Button variant="contained"  color="secondary" onClick={this.addTextField}>Add Text field</Button>
                        <br/>
                        <Form schema={this.state.schema}
                              onChange={log("changed")}
                              onSubmit={log("submitted")}
                              onError={log("errors")}
                              fields={widgets}
                              uiSchema={uiSchema}/>

                        {/*<SchemaField {...this.props} registry={registry} />*/}
                    </div>
                }
            />
        )
    }
}

export default withStyles(styles, {withTheme: true})(FormBuilder);