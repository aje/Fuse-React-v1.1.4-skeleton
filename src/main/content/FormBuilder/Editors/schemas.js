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
    rows: {type: "integer", title: "rows", "maximum": 20, minimum: 3}
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
    inputType: {type: "string", title: "Type",
        "enum": [
            "display4",
            "display3",
            "display2",
            "display1",
            "headline",
            "title",
            "subheading",
            "body2",
            "body1",
            "caption"
        ]},
};

export const imgSchema = {
    //helper: {type: "string", title: "Instructions for user"},
    src: {type: "string", title: "Image src","format": "data-url"},
};

export const fileUploadSchema = {
    helper: {type: "string", title: "Instructions for user"},
    require: {type: "boolean", title: "Require", default: false},
    accept: {type: "array", title: "Accept" ,
        "items": {
            "type": "string",
            "enum": [
                ".jpeg",
                ".png",
                ".gif",
                ".mp4",
                ".jar",
                ".zip",
                "audio/*",
                "video/*",
                "image/*",

            ]
        },
        "uniqueItems": true},
    maximum: {type: "integer", title: "Max file size (MB)", "maximum": 200, minimum: 0}
};

export const dateTime = {
    helper: {type: "string", title: "Instructions for user"},
    require: {type: "boolean", title: "Require", default: false},
    inputType: {type: "string", title: "Type",
        "enum": [
            "date",
            "time",
            "datetime-local",
        ]},
};