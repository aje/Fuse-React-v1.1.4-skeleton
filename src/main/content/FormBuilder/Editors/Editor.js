import React, {Component}  from "react";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Au from "../../../../hoc/Au";
import Icon from "@material-ui/core/es/Icon/Icon";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import {withStyles} from "@material-ui/core/styles/index";
import Card from "@material-ui/core/es/Card/Card";
import Form from "react-jsonschema-form";
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";
import Grid from "@material-ui/core/es/Grid/Grid";
import TextField from "@material-ui/core/es/TextField/TextField";
import Typography from "@material-ui/core/es/Typography/Typography";


const styles = theme => ({
    cardHeader: {
        backgroundColor: theme.palette.primary[500]
    },
    cardTitle: {
        color: "white"
    }
});

class Editor  extends Component{
    state = {
        textSchema : {
            "type": "object",
            properties: {
                label: {type: "string", title: "Label"}
            }
        }
    };

    CustomInput = (prop) => {
        return (
            <Grid item xs={6}>
                <TextField fullWidth
                           id="custom"
                           onChange={(event) => prop.onChange(event.target.value)}
                           value={prop.value}
                           label={prop.schema.title}
                />
            </Grid>
        );
    };

    CustomCheckbox = (prop) =>{
        return (
            <div>
                {prop.title}
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={prop.value}
                            onChange={() => prop.onChange(!prop.value)}
                            value={prop.title}
                        />
                    }
                    label={prop.schema.title}
                />
            </div>
        );
    };

    CustomTitleField = ({title, required}) => {
        const legend = required ? title + '*' : title;
        return <h3 id="custom">{legend}</h3>;
    };

    CustomFieldTemplate = (e) => {
        const {id, className, label, help, required, description, errors, children} = e;
        return (
            <Au>
                {children}
            </Au>
        );
    };

    render() {

        const {classes} = this.props;
        const fields = {
            TitleField: this.CustomTitleField,
            StringField: this.CustomInput

        };

        const widgets = {
            CheckboxWidget: this.CustomCheckbox
        };


        return (
            <Card>
                <CardHeader
                    classes={{root: classes.cardHeader, title: classes.cardTitle}}
                    title={"Edit " + (this.props.item.schema !== undefined ? this.props.item.schema.title : "Choose one")}
                />

                <CardContent>

                    <Form schema={(this.props.item.schema !== undefined ? this.props.item.schema: this.state.textSchema)}
                          fields={fields}
                          widgets={widgets}
                          FieldTemplate={this.CustomFieldTemplate}
                    >
                        <div>
                        </div>
                    </Form>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Editor);