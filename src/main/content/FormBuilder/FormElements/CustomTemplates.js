import Au from "../../../../hoc/Au";
import Grid from "@material-ui/core/es/Grid/Grid";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import Paper from "@material-ui/core/es/Paper/Paper";
import React from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export const CustomFieldTemplate = (e) => {
    const {id, className, label, help, required, description, errors, children} = e;
    return <Au>{children}</Au>;
};


export const ObjectFieldTemplate = (e) => {
    //console.log(e)
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
const grid = 0;

const getItemStyle = (draggableStyle, isDragging) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    boxShadow: isDragging ? '0 2px 2px rgba(0,0,0,.4)' : 'none',
    // change background colour if dragging
    opacity: isDragging ? 0.7 : 1,

    // styles we need to apply on draggables
    ...draggableStyle,
    //top: 100,
    //left: 0
});

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
});

export const DropFieldTemplate = (e) => {
    //console.log(e)
    const elements = e.properties.map((element, i) => {
        return <Grid item key={i}
                     xs={element.content.props.schema.grid ? element.content.props.schema.grid : 12}>
                    <Draggable
                        draggableId={element.name}
                        index={i}
                    >
                        {(provided, snapshot) => (
                            <div>
                                <div
                                    ref={provided.innerRef}
                                    {...provided.dragHandleProps}
                                    {...provided.draggableProps}
                                    style={getItemStyle(
                                        provided.draggableProps.style,
                                        snapshot.isDragging
                                    )}
                                >
                                    {element.content}
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Draggable>



            </Grid>;
    });

    return (
        <Paper>
            <CardHeader
                classes={{root: "cardHeader", title: "cardTitle", subheader: "text-lighter"}}
                title={e.title}
                subheader={e.description}
            />

            <Grid container>
                {/*<DragDropContext onDragEnd={this.onDragEnd}>*/}
                    {/*<Droppable droppableId="droppable">*/}
                        {/*{(provided, snapshot) => (*/}
                            {/*<div*/}
                                {/*ref={provided.innerRef}*/}
                                {/*//style={getListStyle(snapshot.isDraggingOver)}*/}
                                {/*{...provided.droppableProps}*/}
                            {/*>*/}
                            {elements}
                            {/*</div>*/}
                        {/*)}*/}
                    {/*</Droppable>*/}
                {/*</DragDropContext>*/}
            </Grid>
        </Paper>
    );
};

