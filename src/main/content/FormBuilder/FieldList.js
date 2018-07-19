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

const FieldList = (props) => {
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
                        <IconButton  onClick={() => props.add('shortText')} aria-label="Add">
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
                        <IconButton  onClick={() => props.add('longText')} aria-label="Add">
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
                        <IconButton aria-label="Add" onClick={() => props.add('checkbox')} >
                            <Icon>add</Icon>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider component={'li'} />

                <ListItem>
                    <ListItemIcon>
                        <Icon>radio_button_checked</Icon>
                    </ListItemIcon>
                    <ListItemText
                        primary="Radio"
                    />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Add">
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
                        <IconButton aria-label="Add">
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
                        <IconButton aria-label="Add">
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
                        <IconButton aria-label="Add"  onClick={() => props.add('select')} >
                            <Icon>add</Icon>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider component={'li'} />

                <ListItem>
                    <ListItemIcon>
                        <Icon>short_text</Icon>
                    </ListItemIcon>
                    <ListItemText
                        primary="Date & Time"
                    />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Add">
                            <Icon>add</Icon>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </Card>
    )
};

export default FieldList;