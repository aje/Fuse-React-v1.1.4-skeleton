import React, {Component} from 'react';
import Au from "../../../../hoc/Au";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Grid from "@material-ui/core/es/Grid/Grid";
import Form from "react-jsonschema-form";
import TextField from "@material-ui/core/es/TextField/TextField";
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";
import Paper from "@material-ui/core/es/Paper/Paper";
import {withStyles} from "@material-ui/core/styles/index";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Icon from "@material-ui/core/es/Icon/Icon";
import Button from "@material-ui/core/es/Button/Button";
import FieldWrapper from "./FieldWrapper";


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
        right: "-20px"
    }
});
class ViewWrapper extends Component{


    render () {
        const {classes} = this.props;
        const CustomInput = (e) => {
            console.log(e.uiSchema["ui:widget"]);
            return (
                <FieldWrapper field={e} changeEditor={this.props.changeEditor} remove={this.props.remove}>
                        <TextField fullWidth
                                   multiline={(e.uiSchema["ui:widget"] === "textarea")}
                                   rows="4"
                                   disabled
                                   label={e.schema.title}
                        />
                </FieldWrapper>
            );
        };

        const CustomFieldTemplate = (e) => {
            const {id, className, label, help, required, description, errors, children} = e;
            return <div >{children}</div>;
        };

        return (
            <Au>
                <Form schema={this.props.schema}
                      //fields={fields}
                      //widgets={widgets}
                      FieldTemplate={CustomFieldTemplate}
                      uiSchema={this.props.uiSchema}
                >
                    <div>
                    </div>
                </Form>
            </Au>
        );
    }
};

ViewWrapper.propTypes = {};
ViewWrapper.defaultProps = {};

export default withStyles(styles, {withTheme: true})(ViewWrapper);
