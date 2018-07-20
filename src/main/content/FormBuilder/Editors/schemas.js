export const shortTextSchema =  {
    instruction: {type: "string", title: "Instructions for user"},
    require: {type: "boolean", title: "Require", default: false},
        default: {type: "string", title: "Default Value"},
        placeholder: {type: "string", title: "Place Holder"},
        type: {type: "string", title: "type",
            "enum": [
                "Number",
                "Phone",
                "Email"
            ]
        },
    };

export const longTextSchema =  {
    instruction: {type: "string", title: "Instructions for user"},
    require: {type: "boolean", title: "Require", default: false},
    default: {type: "string", title: "Default Value"},
    placeholder: {type: "string", title: "Place Holder"},
    rows: {type: "number", title: "rows"}
};

export const checkboxSchema =  {
    instruction: {type: "string", title: "Instructions for user"},
    require: {type: "boolean", title: "Require", default: false},
    options: {
        type: "array",
        "items": {
            "type": "string",
            "default": "bazinga"
        }
    }
};
export const radioGroupSchema =  {
    instruction: {type: "string", title: "Instructions for user"},
    require: {type: "boolean", title: "Require", default: false},
    options: {
        type: "array",
        "items": {
            "type": "string",
            "default": "bazinga"
        }
    }
};

export const titleSchema = {
    instruction: {type: "string", title: "Instructions for user"},
    type: {type: "string", title: "Type",
        "enum": [
            "Header 1",
            "Header 2",
            "Header 3",
            "Paragraph",
            "Subheading",
            "Small"
        ]},
};