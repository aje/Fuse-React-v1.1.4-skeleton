import React from 'react';
import {withStyles} from "@material-ui/core/styles/index";
import Paper from "@material-ui/core/es/Paper/Paper";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Button from "@material-ui/core/es/Button/Button";
import Icon from "@material-ui/core/es/Icon/Icon";
import Card from "@material-ui/core/es/Card/Card";

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
    closeBtn: {
        position: "absolute",
        top: "-20px",
        right: "5px",
        width: 36,
        height: 36,
        zIndex: 99
    },
    changeBtn: {
        position: "absolute",
        top: "-20px",
        right: "50px",
        width: 36,
        height: 36,
        zIndex: 99
    }
});

const fieldWrapper = (props) => {
    //console.log(props.field.schema.grid);
    return (
        <div className={props.classes.hover}>
            <CardContent onClick={() => props.changeEditor(props.field)}>
                {props.children}
            </CardContent>
            <Button variant="fab" onClick={()=> props.remove(props.field.id.replace('root_', ''))} mini color="secondary"  className={props.classes.closeBtn}>
                <Icon>close</Icon>
            </Button>
            <Button variant="fab" onClick={()=> props.changeGrid(props.field.id.replace('root_', ''), (props.field.schema.grid ===6)? 12: 6)} mini color={"primary"}  className={props.classes.changeBtn}>
                <Icon>{(props.field.schema.grid ===6)? "keyboard_tab": "compare_arrows"}</Icon>
            </Button>
        </div>
    );
};

export default withStyles(styles, {withTheme: true})(fieldWrapper);
