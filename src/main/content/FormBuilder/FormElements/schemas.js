import React from "react";

export const schemas = {
    "BASIC WIDGETS" : {
        shortText: {
            icon: "short_text",
            title: "Short text",
            schema: {
                type: "string",
                "editType": "shortTextSchema",
                "inputType": "text"
            },
            uiSchema: {
                "type": "myText"
            }
        },
        longText: {
            icon: "notes",
            title: "Long text",
            schema: {
                "type": "string",
                "editType": "longTextSchema",
                "rows": 3,
                "textarea": true
            },
            uiSchema: {
                "type": "myText"
            }
        },
        checkbox: {
            icon: "playlist_add_check",
            title: "Checkbox group",
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
                "type": "myCheckboxes"
            },

        },
        radioGroup: {
            icon: "format_list_bulleted",
            title: "Radio group",
            schema: {
                type: "string",
                "items": {
                    "type": "string",
                    "enum": [
                        "foo",
                        "bar",
                        "fuzz"
                    ]
                },
                //"uniqueItems": true,
                "editType": "radioGroupSchema"
            },
            uiSchema: {
                "type": "myRadio"
            }
        },
        date: {
            icon: "date_range",
            title: "Date & Time",
            schema: {
                "type": "string",
                //"format": "date",
                "editType": "dateTime",
                inputType: "datetime-local"
            },
            uiSchema: {
                "type": "myDate"
            }
        },
        select: {
            icon: "arrow_drop_down_circle",
            title: "Select list",
            schema: {
                "type": "string",
                "editType": "radioGroupSchema"
            },
            uiSchema: {
                "type": "mySelect"
            }
        },
        fileUpload: {
            icon: "cloud_upload",
            title: "File upload",
            schema: {
                "type": "string",
                "format": "data-url",
                "editType": "fileUploadSchema",
                "maximum": 0,
            },
            uiSchema: {
                "type": "fileUpload"
            }
        }
    },
    "AUXILIARY WIDGETS" : {
        staticText: {
            icon: "notes",
            title: "Static text",
            schema: {
                "type": "string",
                "editType": "titleSchema"
            },
            uiSchema: {
                "type": "staticText"
            }
        },
        selectionBreak: {
            icon: "border_horizontal",
            title: "Selection Break",
            schema: {
                "type": "string",
            },
            uiSchema: {
                "type": "staticBreak"
            }
        },
        staticImage: {
            icon: "add_photo_alternate",
            title: "Static Image",
            schema: {
                "type": "string",
                "editType": "imgSchema"
            },
            uiSchema: {
                "type": "staticImg"
            },
            type: "staticImage"
        }
    }
};