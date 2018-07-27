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
import * as aC from "./store/actions/index";
import {connect} from "react-redux";
import * as schemas from "./FormElements/schemas"
import Au from "../../../hoc/Au";

const FieldList = (props) => {
    const listOfWidgets = Object.keys(schemas.schemas).map((key, i) => {
        return (
            <List dense key={key} subheader={<ListSubheader>{key}</ListSubheader>}>
                {Object.keys(schemas.schemas[key]).map(key1 => {
                    return (
                        <Au key={key1}>
                            <ListItem>
                                <ListItemIcon>
                                    <Icon>{schemas.schemas[key][key1].icon}</Icon>
                                </ListItemIcon>
                                <ListItemText
                                    primary={schemas.schemas[key][key1].title}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton  onClick={() => props.addField(schemas.schemas[key][key1])} aria-label="Add">
                                        <Icon>add</Icon>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider component={'li'} />
                        </Au>
                    )
                })}
            </List>
        )
    });
    return (
        <Card>
            {listOfWidgets}
        </Card>
    )
};


const mapDispatchToProps = dispatch => {
    return {
        addField: (field) => dispatch(aC.addField(field)),
        removeField: (field) => dispatch(aC.removeField(field)),
        changeGrid: (field, grid)  => dispatch(aC.changeGrid(field, grid)),
    };
};
export default connect(null, mapDispatchToProps)(FieldList);