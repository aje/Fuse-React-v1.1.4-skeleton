import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import Form from "react-jsonschema-form";
import Button from '@material-ui/core/Button';

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
}
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
        }
    };

    addTextField = () => {
        const t = {...this.state.schema};
        t['properties'] = {
            title: {type: "string", title: "Title", default: "A new task"},
            newTitle: {type: "string", title: "Title", default: "A new form field"},
            done: {type: "boolean", title: "Done?", default: false}
        };
        this.setState({schema: t})
    };

    render(){
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
                              uiSchema={uiSchema}/>
                    </div>
                }
            />
        )
    }
}

export default withStyles(styles, {withTheme: true})(FormBuilder);