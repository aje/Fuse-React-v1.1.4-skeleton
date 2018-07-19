import React, {Component}  from "react";
import Au from "../../../../hoc/Au";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import {withStyles} from "@material-ui/core/styles/index";
import Card from "@material-ui/core/es/Card/Card";
import Form from "react-jsonschema-form";
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";
import TextField from "@material-ui/core/es/TextField/TextField";
import Input from "@material-ui/core/es/Input/Input";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";


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
        schema : {
            "type": "object",
            properties: {
                label: {type: "string", title: "Label"},
                default: {type: "string", title: "Default Value"},
                placeholder: {type: "string", title: "Place Holder"},
                // type: {type: "string", title: "type",
                //     "enum": [
                //         "Number",
                //         "Phone",
                //         "Email"
                //     ]
                // },
                require: {type: "boolean", title: "Require", default: false}
            }
        },
        formData:{
            label: "titleee"
        },
        t : 1

    };

    componentDidUpdate = () => {
        if(this.props.item.schema !== undefined ) {
            if (this.state.schema.properties.label.default !== this.props.item.schema.title) {
                // console.log(this.props.item.schema);
                //console.log(this.state.schema.properties.label.default !== this.props.item.schema.title);
                const t = {...this.state.schema};
                t.properties = {
                    ...this.state.schema.properties,
                    label: {type: "string", title: "Label", default: this.props.item.schema.title}
                };
                const tdata = {
                    ...this.state.formData,
                    label: this.props.item.schema.title
                };
                this.setState({formData: tdata});
                this.setState({schema: t});

            }
        }
    };

    onSubmit = ({formData}) => console.log("Data submitted: ",  formData);

    render() {

        const CustomFieldTemplate = (e) => {
            const {id, className, label, help, required, description, errors, children} = e;
            return (
                <Au>
                    {children}
                </Au>
            );
        };
        const CustomInput = (prop) => {
            console.log(prop)
            return (
                <TextField fullWidth
                           select={prop.schema.enum !== undefined}
                       defaultValue={prop.schema.default}
                       onChange={(event) => prop.onChange(event.target.value)}
                       label={prop.schema.title}
                >
                    {(prop.schema.enum !== undefined)? prop.schema.enum.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    )): ''}
                </TextField>
            );
        };

        const CustomCheckbox = (prop) =>{
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

        const {classes} = this.props;
        const fields = {
            //TitleField: this.CustomTitleField,
            StringField: CustomInput

        };

        const widgets = {
            CheckboxWidget: CustomCheckbox,
        };


        const uiSchema = {
            // uiSchematype: {
            //     "ui:widget": "select"
            // }
        };

        const switchEdit = (item) => {
            console.log(item)
            // switch (item.type) {
            //     case ""
            // }
        };


        return (
            <Card>
                <CardHeader
                    classes={{root: classes.cardHeader, title: classes.cardTitle}}
                    title={"Edit " + (this.props.item.schema !== undefined ? this.props.item.schema.title : "Choose one")}
                />

                <CardContent>

                    {/*<Form schema={(this.state.schema)}*/}
                          {/*widgets={widgets}*/}
                          {/*fields={fields}*/}
                          {/*formData={this.state.formData}*/}
                          {/*uiSchema={uiSchema}*/}
                          {/*FieldTemplate={CustomFieldTemplate}*/}
                          {/*onSubmit={this.onSubmit}*/}
                    {/*/>*/}
                    <form>
                        {switchEdit(this.props.item.schema)}
                    </form>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Editor);