import React from 'react';
import {withStyles} from "@material-ui/core/styles/index";
import classNames from "classnames";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Button from "@material-ui/core/es/Button/Button";
import Icon from "@material-ui/core/es/Icon/Icon";
import IconButton from "@material-ui/core/es/IconButton/IconButton";

const styles = theme => ({
    hover: {
        position: "relative",
        border: "1px solid transparent",
        transition: "all .2s",
        cursor: "pointer",
        backgroundColor: "white",
        borderBottom: "1px solid #eee",
        "&:hover" : {
            border: "1px dashed #aaa"
        }
    },

    iconBtn: {
        position: "absolute",
        width: 24,
        height: 24,
        minHeight: 24,
        zIndex: 99
    },
    changeBtn: {
        top:-14,
        right: 30,
    },
    closeBtn: {
        top:-14,
        right: 3,
    },
    orderUp: {
        left: -14,
        top: 5
    },
    orderDown: {
        left: -14,
        top: 29
    }
});

const fieldWrapper = (props) => {
    const {classes} = props;
    const fieldId = props.field.id.replace('root_', '');
    return (
        <div className={props.classes.hover}>
            <CardContent onClick={() => props.changeEditor(props.field)}>
                {props.children}
            </CardContent>
            <Button variant="fab" onClick={()=> props.remove(fieldId)} mini color="secondary"   className={classNames(classes.iconBtn, classes.closeBtn)} >
                <Icon>close</Icon>
            </Button>
            <Button variant="fab" onClick={()=> props.changeGrid(fieldId, (props.field.schema.grid ===6)? 12: 6)} mini color={"primary"}   className={classNames(classes.iconBtn, classes.changeBtn)}>
                <Icon>{(props.field.schema.grid ===6)? "keyboard_tab": "compare_arrows"}</Icon>
            </Button>
            <IconButton onClick={()=> props.changeOrder(fieldId,"up")}  color={"secondary"} className={classNames(classes.iconBtn, classes.orderUp)} >
                <Icon>keyboard_arrow_up</Icon>
            </IconButton>
            <IconButton  onClick={()=> props.changeOrder(fieldId,"down")}  color={"secondary"} className={classNames(classes.iconBtn, classes.orderDown)} >
                <Icon>keyboard_arrow_down</Icon>
            </IconButton>
        </div>
    );
};

export default withStyles(styles, {withTheme: true})(fieldWrapper);
