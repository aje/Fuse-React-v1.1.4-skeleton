import React, {Component} from 'react';
import Au from "../../../../hoc/Au";
import Form from "react-jsonschema-form";
import {connect} from "react-redux";
import Button from "@material-ui/core/es/Button/Button";
import axios from "axios";
import Paper from "@material-ui/core/es/Paper/Paper";
import {withStyles} from "@material-ui/core/styles/index";
import * as Actions from "../store/actions";
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import Grid from "@material-ui/core/es/Grid/Grid";
import * as mtd from "../FormElements/FormElements";
import FieldWrapper from "./FieldWrapper";

const styles = theme => ({
    cardHeader: {
        backgroundColor: theme.palette.primary[500],
        //padding: 10
    },
    cardTitle: {
        //fontSize: 16,
        color: "white"
    },
    white: {
        color: "#ccc"
    }
});


const  ViewWrapper = (props) => {

    const {classes} = props;

    //delete schema.editType;
    const saveForm = () => {
        const schema = {...props.formSchema};
        // Object.keys(schema.properties).map(key => {
        //     delete schema.properties[key].editType;
        // });
        // console.log(schema);
        axios.post("https://valued-mediator-138113.firebaseio.com/forms.json",
            {
                    //title: props.formSchema.title,
                    //description: props.formSchema.description,
                    schema: schema,
                    uiSchema: props.uiSchema
            }
            )
            .then((res) =>{
                console.log(res)
        }).catch((error)=>{console.log(error)})


    };

    const CustomFieldTemplate = (e) => {
        const {id, className, label, help, required, description, errors, children} = e;
        return <Au>{children}</Au>;
    };

    const ObjectFieldTemplate = (e) =>{
        const elements = e.properties.map((element, i) => {
            return <Grid item key={i} xs={element.content.props.schema.grid ? element.content.props.schema.grid : 12}>{element.content}</Grid>;
        });

        return (
            <Paper>
                <CardHeader
                    classes={{root: classes.cardHeader, title: classes.cardTitle,subheader: classes.white}}
                    title={e.title}
                    subheader={e.description}
                />
                <Grid container>
                {elements}
                </Grid>
            </Paper>
        );
    };

    const fieldHelper = (field, el) => {
        return (
            <FieldWrapper field={field} changeGrid={props.changeGrid} changeEditor={props.changeEditor} remove={props.removeField}>
                {el(field)}
            </FieldWrapper>
        )
    };

    let uiSchema = {};
    if(props.uiSchema !== undefined) {
        Object.keys(props.uiSchema).map((key)=>{
            uiSchema[key] = {...props.uiSchema[key],
                "ui:widget": (field) => fieldHelper(field, mtd[props.uiSchema[key].type])
            }
        });
    }

    return (
        <Au>
            <Form schema={props.formSchema}
                  FieldTemplate={CustomFieldTemplate}
                  uiSchema={uiSchema}
                  ObjectFieldTemplate={ObjectFieldTemplate}
            >
                <Paper square  elevation={1}>
                    <CardActions>
                        <Button variant="contained" color={"primary"} onClick={saveForm}>Save form</Button>
                        <Button variant="contained" color={"secondary"} onClick={props.clearForm}>Clear</Button>
                    </CardActions>
                </Paper>
            </Form>
        </Au>
    );

};

const mapDispatchToProps = dispatch => {
    return {
        addField: (field) => dispatch(Actions.addField(field)),
        removeField: (field) => dispatch(Actions.removeField(field)),
        clearForm: () => dispatch(Actions.clearForm()),
        changeGrid: (field, grid)  => dispatch(Actions.changeGrid(field, grid)),
    };
};


const mapStateToProps = (state) => {
    return {
        formSchema: state.formBuilderRedux.schema,
        uiSchema:  state.formBuilderRedux.uiSchema
    }
};

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps,mapDispatchToProps)(ViewWrapper));