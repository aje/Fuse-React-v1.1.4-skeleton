import React, {Component} from 'react';
import Au from "../../../../hoc/Au";
import Form from "react-jsonschema-form";
import {connect} from "react-redux";
import Button from "@material-ui/core/es/Button/Button";
import axios from "axios";
import Paper from "@material-ui/core/es/Paper/Paper";
import * as Actions from "../store/actions";
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import * as mtd from "../FormElements/FormElements";
import * as CT from "../FormElements/CustomTemplates";
import * as fuseActions from "store/actions";
import FieldWrapper from "./FieldWrapper";
import withRouter from "react-router-dom/es/withRouter";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const getItems = (count) => Array.from({length: count}, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
}));

const reorder =  (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};


const grid = 0;

function processFile(files) {
    const f = files[0];
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.readAsDataURL(f);
    });
}


const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
});

class ViewWrapper extends Component{

    state = {
        loading: false,
        items: getItems(10)
    };



    onDragEnd = (result) => {
        // dropped outside the list
        if(!result.destination) {
            return;
        }

        // const items = reorder(
        //     this.state.items,
        //     result.source.index,
        //     result.destination.index
        // );

        this.props.changeOrder(result.source.index,result.destination.index);

        // this.setState({
        //     items:items
        // });
    }


    saveForm = () => {
        this.setState({loading:true})
        axios.post("https://valued-mediator-138113.firebaseio.com/forms.json", {
                schema: this.props.formSchema,
                uiSchema: this.props.uiSchema
            })
            .then((res) => {
                this.setState({loading: false});
                this.props.showMessage({
                    message     : 'Form Saved!',
                    anchorOrigin: {
                        vertical  : 'bottom',
                        horizontal: 'right'
                    }
                });
                this.props.history.push('/form-builder/forms')
            }).catch((error) => {
                this.setState({loading: false})
            })


    };


    render() {

        const fieldHelper = (field, el) => {
            return (
                <FieldWrapper
                    field={field}
                    changeGrid={this.props.changeGrid}
                    changeEditor={this.props.changeEditor}
                    changeOrder={this.props.changeOrder}
                    remove={this.props.removeField}>
                    {el(field)}


                </FieldWrapper>
            )
        };

        let uiSchema = {};
        if (this.props.uiSchema !== undefined) {
            Object.keys(this.props.uiSchema).map((key) => {
                if (key !== "ui:order") {
                    uiSchema[key] = {
                        ...this.props.uiSchema[key],
                        "ui:widget": (field) => fieldHelper(field, mtd[this.props.uiSchema[key].type])
                    }
                }
            });
        }
        uiSchema["ui:order"] = this.props.uiSchema["ui:order"];

        return (
            <Au>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable" >

                        {/*style={getListStyle(snapshot.isDraggingOver)}*/}
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >
                            <Form schema={this.props.formSchema}
                                  FieldTemplate={CT.CustomFieldTemplate}
                                  uiSchema={uiSchema}
                                  ObjectFieldTemplate={CT.DropFieldTemplate}
                                  className={this.state.loading ? "loading" : ""}
                            >
                                <Paper square elevation={1}>
                                    <CardActions>


                                            <Button variant="contained" disabled={Object.keys(this.props.formSchema.properties).length === 0} color={"primary"} onClick={this.saveForm}>Save form</Button>


                                            <Button variant="contained" color={"secondary"}
                                                onClick={this.props.clearForm}>Clear</Button>

                                    </CardActions>
                                </Paper>
                            </Form>


                        {/*<Droppable droppableId="droppable">*/}
                            {/*{(provided, snapshot) => (*/}
                                {/*<div*/}
                                    {/*ref={provided.innerRef}*/}
                                    {/*//style={getListStyle(snapshot.isDraggingOver)}*/}
                                    {/*{...provided.droppableProps}*/}
                                {/*>*/}
                                    {/*{this.state.items.map((item, index) => (*/}
                                        {/*<Draggable*/}
                                            {/*key={item.id}*/}
                                            {/*draggableId={item.id}*/}
                                            {/*index={index}*/}
                                        {/*>*/}
                                            {/*{(provided, snapshot) => (*/}
                                                {/*<div>*/}
                                                    {/*<div*/}
                                                        {/*ref={provided.innerRef}*/}
                                                        {/*{...provided.dragHandleProps}*/}
                                                        {/*{...provided.draggableProps}*/}
                                                        {/*style={getItemStyle(*/}
                                                            {/*provided.draggableProps.style,*/}
                                                            {/*snapshot.isDragging*/}
                                                        {/*)}*/}
                                                    {/*>*/}
                                                        {/*{item.content}*/}
                                                    {/*</div>*/}
                                                    {/*{provided.placeholder}*/}
                                                {/*</div>*/}
                                            {/*)}*/}
                                        {/*</Draggable>*/}
                                    {/*))}*/}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                </DragDropContext>
            </Au>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addField: (field) => dispatch(Actions.addField(field)),
        removeField: (field) => dispatch(Actions.removeField(field)),
        clearForm: () => dispatch(Actions.clearForm()),
        changeGrid: (field, grid)  => dispatch(Actions.changeGrid(field, grid)),
        changeOrder: (start, end)  => dispatch(Actions.changeOrder(start, end)),
        showMessage: (options)  => dispatch(fuseActions.showMessage(options)),
    };
};


const mapStateToProps = (state) => {
    return {
        formSchema: state.formBuilderRedux.schema,
        uiSchema:  state.formBuilderRedux.uiSchema
    }
};

export default withRouter((connect(mapStateToProps,mapDispatchToProps)(ViewWrapper)));