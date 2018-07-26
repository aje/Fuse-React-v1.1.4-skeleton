import Au from "../../../../hoc/Au";
import Grid from "@material-ui/core/es/Grid/Grid";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import Paper from "@material-ui/core/es/Paper/Paper";
import React from "react";

export const CustomFieldTemplate = (e) => {
    const {id, className, label, help, required, description, errors, children} = e;
    return <Au>{children}</Au>;
};


export const ObjectFieldTemplate = (e) => {
    const elements = e.properties.map((element, i) => {
        return <Grid item key={i}
                     xs={element.content.props.schema.grid ? element.content.props.schema.grid : 12}>{element.content}</Grid>;
    });

    return (
        <Paper>
            <CardHeader
                classes={{root: "cardHeader", title: "cardTitle", subheader: "text-lighter"}}
                title={e.title}
                subheader={e.description}
            />
            <Grid container>
                {elements}
            </Grid>
        </Paper>
    );
};