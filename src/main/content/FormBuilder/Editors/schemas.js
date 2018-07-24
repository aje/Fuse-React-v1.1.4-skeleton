export const shortTextSchema =  {
    helper: {type: "string", title: "Instructions for user"},
    require: {type: "boolean", title: "Require", default: false},
        default: {type: "string", title: "Default Value"},
        placeholder: {type: "string", title: "Place Holder"},
        inputType: {type: "string", title: "type",
            "enum": [
                "number",
                "tell",
                "email",
                "password",
                "text"
            ]
        },
    };

export const longTextSchema =  {
    helper: {type: "string", title: "Instructions for user"},
    require: {type: "boolean", title: "Require", default: false},
    default: {type: "string", title: "Default Value"},
    placeholder: {type: "string", title: "Place Holder"},
    rows: {type: "number", title: "rows"}
};

export const checkboxSchema =  {
    helper: {type: "string", title: "Instructions for user"},
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
    helper: {type: "string", title: "Instructions for user"},
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
    helper: {type: "string", title: "Instructions for user"},
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