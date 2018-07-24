import React from 'react';
import {withStyles} from "@material-ui/core/styles/index";
import Paper from "@material-ui/core/es/Paper/Paper";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Button from "@material-ui/core/es/Button/Button";
import Icon from "@material-ui/core/es/Icon/Icon";

const styles = theme => ({
    hover: {
        position: "relative",
        border: "1px solid transparent",
        transition: "all .2s",
        cursor: "pointer",
        "&:hover" : {
            border: "1px dashed #aaa"
        }
    },
    closeBtn: {
        position: "absolute",
        top: "-20px",
        right: "-20px",
        width: 36,
        height: 36
    }
});

const fieldWrapper = (props) => {
    return (
        <Paper square elevation={1} className={props.classes.hover}>
            <CardContent onClick={() => props.changeEditor(props.field)}>
                {props.children}
            </CardContent>
            <Button variant="fab" onClick={()=> props.remove(props.field.id.replace('root_', ''))} mini color="secondary"  className={props.classes.closeBtn}>
                <Icon>close</Icon>
            </Button>
        </Paper>
    );
};





export default withStyles(styles, {withTheme: true})(fieldWrapper);
