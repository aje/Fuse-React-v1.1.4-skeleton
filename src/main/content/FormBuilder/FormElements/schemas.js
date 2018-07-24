import * as mtd from "./FormElements";
import FieldWrapper from "../Editors/FieldWrapper";
import Divider from "@material-ui/core/es/Divider/Divider";
import React from "react";

const fieldHelper = (field, el) => {
    return (
        <FieldWrapper field={field} changeEditor={props.changeEditor} remove={props.removeField}>
            {el(field)}
        </FieldWrapper>
    )
};

export const checkbox = {
    schema: {
        type: "array",
        "items": {
            "type": "string",
            "enum": [
                "foo",
                "bar",
                "fuzz"
            ]
        },
        "uniqueItems": true,
        "editType": "checkboxSchema"
    },
    uiSchema: {
        "ui:widget": (field) => fieldHelper(field, mtd.myCheckboxes)
    },

};

export const shortText = {
    schema: {
        type: "string",
        "editType": "shortTextSchema"
    },
    uiSchema: {
        "ui:widget": (field) => fieldHelper(field, mtd.myText)
    }
};

export const longText = {
    schema: {
        "type": "string",
        "editType": "longTextSchema"
    },
    uiSchema: {
        "ui:widget": (field) => fieldHelper(field, mtd.myText),
    }
};

export const date = {
    schema: {
        "type": "string",
        "format": "date-time"
    },
    uiSchema: {
        "ui:widget": (field) => fieldHelper(field, mtd.myDate),
    }
};

export const radioGroup = {
    schema: {
        type: "array",
        "items": {
            "type": "string",
            "enum": [
                "foo",
                "bar",
                "fuzz"
            ]
        },
        "uniqueItems": true,
        "editType": "radioGroupSchema"
    },
    uiSchema: {
        "ui:widget": (field) => fieldHelper(field, mtd.myRadio)
    }
};

export const select = {
    schema: {
        "type": "string",
        "editType": "radioGroupSchema"
    },
    uiSchema: {
        "ui:widget": (field) => fieldHelper(field, mtd.mySelect)
    }
};

export const staticText = {
    schema: {
        "type": "string",
        "editType": "titleSchema"
    },
    uiSchema: {
        "ui:widget": (e) => {
            return (
                <FieldWrapper field={e} changeEditor={props.changeEditor} remove={props.removeField}>
                    <Typography>{e.schema.title}</Typography>
                </FieldWrapper>
            );
        }
    }
};

export const selectionBreak = {
    schema: {
        "type": "string",
    },
    uiSchema: {
        "ui:widget": (e) => {
            return (
                <FieldWrapper field={e} changeEditor={props.changeEditor} remove={props.removeField}>
                    <Divider/>
                </FieldWrapper>
            );
        }
    }
};

const staticImage = {
    schema: {
        "type": "string",
    },
    uiSchema: {
        "ui:widget": (e) => {
            return (
                <FieldWrapper field={e} changeEditor={props.changeEditor} remove={props.removeField}>
                    <img src=""/>
                </FieldWrapper>
            );
        }
    },
    type: "staticImage"
};