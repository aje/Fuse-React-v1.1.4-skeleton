import React from "react";
import Card from "@material-ui/core/es/Card/Card";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/es/ListItemIcon/ListItemIcon";
import Icon from "@material-ui/core/es/Icon/Icon";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/es/ListItemSecondaryAction/ListItemSecondaryAction";
import Divider from "@material-ui/core/es/Divider/Divider";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import ListSubheader from "@material-ui/core/es/ListSubheader/ListSubheader";
import Typography from "@material-ui/core/es/Typography/Typography";
import FieldWrapper from "./Editors/FieldWrapper";

import * as mtd from "./FormElements/FormElements"
import * as aC from "./store/actions/index";
import {connect} from "react-redux";

const FieldList = (props) => {

    const fieldHelper = (field, el) => {
        return (
            <FieldWrapper field={field} changeEditor={props.changeEditor} remove={props.removeField}>
                {el(field)}
            </FieldWrapper>
        )
    };

    const checkbox = {
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

    const shortText = {
        schema: {
            type: "string",
            "editType": "shortTextSchema"
        },
        uiSchema: {
            "ui:widget": (field) => fieldHelper(field, mtd.myText)
        }
    };

    const password = {
        schema: {
            type: "string",
            "editType": "shortTextSchema"
        },
        uiSchema: {
            "ui:widget": (field) => fieldHelper(field, mtd.myText()),
            "type": "password"
        }
    };

    const longText = {
        schema: {
            "type": "string",
            "editType": "longTextSchema"
        },
        uiSchema: {
            "ui:widget": (field) => fieldHelper(field, mtd.myText),
        }
    };

    const date = {
        schema: {
            "type": "string",
            "format": "date-time"
        },
        uiSchema: {
            "ui:widget": (field) => fieldHelper(field, mtd.myDate),
        }
    };

    const radioGroup = {
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

    const select = {
        schema: {
            "type": "string",
            "editType": "radioGroupSchema"
        },
        uiSchema: {
            "ui:widget": (field) => fieldHelper(field, mtd.mySelect)
        }
    };

    const staticText = {
        schema: {
            "type": "string",
            "editType": "titleSchema"
        },
        uiSchema: {
            "ui:widget": (e) => {
                return (
                    <FieldWrapper field={e} changeEditor={props.changeEditor} remove={props.remove}>
                        <Typography>{e.schema.title}</Typography>
                    </FieldWrapper>
                );
            }
        }
    };

    const selectionBreak = {
        schema: {
            "type": "string",
        },
        uiSchema: {
            "ui:widget": (e) => {
                return (
                    <FieldWrapper field={e} changeEditor={props.changeEditor} remove={props.remove}>
                        <Divider/>
                    </FieldWrapper>
                );
            }
        }
    };

    const pageBreack = {
        schema: {
            "type": "string",
        },
        uiSchema: {
            "ui:widget": (e) => {
                return (
                    <FieldWrapper field={e} changeEditor={props.changeEditor} remove={props.remove}>
                        <Divider style={{marginBottom: 10}} />
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
                    <FieldWrapper field={e} changeEditor={props.changeEditor} remove={props.remove}>
                        <img src=""/>
                    </FieldWrapper>
                );
            }
        },
        type: "staticImage"
    };

    return (
        <Card>
            <List dense subheader={<ListSubheader>BASIC WIDGETS</ListSubheader>}>
                <ListItem>
                    <ListItemIcon>
                        <Icon>short_text</Icon>
                    </ListItemIcon>
                    <ListItemText
                        primary="Short text"
                    />
                    <ListItemSecondaryAction>
                        <IconButton  onClick={() => props.addField(shortText)} aria-label="Add">
                            <Icon>add</Icon>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider component={'li'} />

                <ListItem>
                    <ListItemIcon>
                        <Icon>notes</Icon>
                    </ListItemIcon>
                    <ListItemText
                        primary="Long text"
                    />
                    <ListItemSecondaryAction>
                        <IconButton  onClick={() => props.addField(longText)} aria-label="Add">
                            <Icon>add</Icon>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider component={'li'} />

                <ListItem>
                    <ListItemIcon>
                        <Icon>playlist_add_check</Icon>
                    </ListItemIcon>
                    <ListItemText
                        primary="Checkbox group"
                    />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Add" onClick={() => props.addField(checkbox)} >
                            <Icon>add</Icon>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider component={'li'} />

                <ListItem>
                    <ListItemIcon>
                        <Icon>format_list_bulleted</Icon>
                    </ListItemIcon>
                    <ListItemText
                        primary="Radio group"
                    />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Add" onClick={() => props.addField(radioGroup)}>
                            <Icon>add</Icon>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider component={'li'} />

                <ListItem>
                    <ListItemIcon>
                        <Icon>date_range</Icon>
                    </ListItemIcon>
                    <ListItemText
                        primary="Date & Time"
                    />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Add"  onClick={() => props.addField(date)}>
                            <Icon>add</Icon>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider component={'li'} />

                <ListItem>
                    <ListItemIcon>
                        <Icon>arrow_drop_down_circle</Icon>
                    </ListItemIcon>
                    <ListItemText
                        primary="Select list"
                    />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Add"   onClick={() => props.addField(select)}>
                            <Icon>add</Icon>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>


            <List dense subheader={<ListSubheader>AUXILIARY WIDGETS</ListSubheader>}>
                <ListItem>
                    <ListItemIcon>
                        <Icon>notes</Icon>
                    </ListItemIcon>
                    <ListItemText
                        primary="Static text"
                    />
                    <ListItemSecondaryAction>
                        <IconButton  onClick={() => props.addField(staticText)} aria-label="Add">
                            <Icon>add</Icon>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider component={'li'} />

                <ListItem>
                    <ListItemIcon>
                        <Icon>border_horizontal</Icon>
                    </ListItemIcon>
                    <ListItemText
                        primary="Selection Break"
                    />
                    <ListItemSecondaryAction>
                        <IconButton  onClick={() => props.addField(selectionBreak)} aria-label="Add">
                            <Icon>add</Icon>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider component={'li'} />

                <ListItem>
                    <ListItemIcon>
                        <Icon>border_top</Icon>
                    </ListItemIcon>
                    <ListItemText
                        primary="Page break"
                    />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Add" onClick={() => props.addField(pageBreack)} >
                            <Icon>add</Icon>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider component={'li'} />

                <ListItem>
                    <ListItemIcon>
                        <Icon>add_photo_alternate</Icon>
                    </ListItemIcon>
                    <ListItemText
                        primary="Static Image"
                    />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Add" onClick={() => props.addField(staticImage)}>
                            <Icon>add</Icon>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider component={'li'} />

            </List>
        </Card>
    )
};

//
// function mapDispatchToProps(dispatch)
// {
//     return bindActionCreators({
//         add: Actions.ADD_FIELD,
//         removeField: Actions.REMOVE_FIELD
//     }, dispatch);
// }


const mapDispatchToProps = dispatch => {
    return {
        addField: (field) => dispatch(aC.addField(field)),
        removeField: (field) => dispatch(aC.removeField(field)),
    };
};
//
// function mapStateToProps({formBuilderRedux})
// {
//     return {
//         state: formBuilderRedux.state
//     }
// }
export default connect(null, mapDispatchToProps)(FieldList);