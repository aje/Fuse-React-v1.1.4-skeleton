import * as aC from '../actions/actionTypes';

const initialState = {
    formTitle: "",
    formAction: "",
    formDescription: "",
    currentIndex: 0,
    schema : {
        title: "Untitled form",
        description: "Enter some description for your form here",
        "type": "object",
        "properties": {},
        "required": [],
    },
    uiSchema: {},
    currentItem: {}
};

const addField = (state, action) => {
    // create a temp for schema and uiSchema
    const schema = {...state.schema};
    schema.properties = {...state.schema.properties};

    const uiSchema = {...state.uiSchema};

    // create a random name
    const itemp = state.currentIndex + 1;

    //console.log(action.field.title);

    const name = `field_${itemp}`;
    // t.;
    // add field to schema and ui to uiSchema
    schema.properties[name] = {...action.field.schema, title:itemp + ". "+action.field.title };
    uiSchema[name] = action.field.uiSchema;

    //const tUi = {};



    // this.state.uiSchema[_slug] = field.uiSchema;
    uiSchema["ui:order"] = (state.uiSchema["ui:order"] || []).concat(name);

    return {
        ...state,
        currentIndex : itemp,
        schema,
        uiSchema
    };
};

const removeField = (state, action) => {
    //const requiredFields = state.schema.required || [];
    const schema = {...state.schema};
    delete schema.properties[action.field];
    const uiSchema = {...state.uiSchema};
    delete uiSchema[action.field];
    uiSchema["ui:order"] = state.uiSchema["ui:order"].filter(
        (field) => field !== action.field);
    // state.schema.required = requiredFields
    //     .filter(requiredFieldName => name !== requiredFieldName);

    // if (t.schema.required.length === 0) {
    //     this.setState({schema: {}})
    // }
    return {
        ...state,
        schema,
        uiSchema
    };
};

const editField = (state, action) => {
    const fieldName = action.field.id.replace('root_', '');
    const schema = {...state.schema};
    schema.properties = {...state.schema.properties};

    schema.properties[fieldName] = {...state.schema.properties[fieldName],
        title:action.data.label,
        helper: action.data.helper,
        default: action.data.default,
        placeholder: action.data.placeholder,
        require: action.data.require,
        inputType: action.data.inputType,
        rows: action.data.rows,
        src: action.data.src,
        maximum: action.data.maximum,
        accept: action.data.accept,
    };

    if (action.data.options !== undefined) {
        schema.properties[fieldName].items = {
            enum: [...action.data.options],
            type: "string"
        }
    }

    if (action.data.require) {
        schema.required = schema.required.concat(fieldName);
    } else {
        schema.required = schema.required
            .filter(requiredFieldName => fieldName !== requiredFieldName);
    }

    //const uiSchema = {...state.uiSchema, type: (action.data.uiSchema.type !== undefined) ? action.data.uiSchema.type : ''};
    // uiSchema.type = action.data.placeholder;
    //schema.properties[name] = {...action.field.schema, title:name};
    return {
        ...state,
        schema,
        //uiSchema
    };
};

const editFormDetails = (state, action) => {
    const schema = {...state.schema};
    schema.title = action.data.title;
    schema.description = action.data.desc;
    return {
        ...state,
        schema
    }
};

const clearForm = (state) => {
    const schema = {...initialState.schema};
    const uiSchema = {};
    const currentIndex= 0;
    return {
        ...state,
        schema,
        currentIndex,
        uiSchema
    }
};

const changeGrid = (state, action) => {
    const schema = {...state.schema};
    schema.properties = {...state.schema.properties};
    schema.properties[action.field] = {...state.schema.properties[action.field], grid : action.grid};
    return {
        ...state,
        schema
    }
};

const editForm = (state, action) => {
    const schema = {...action.schema};
    const uiSchema = {...action.uiSchema};
    //schema.properties = {...state.schema.properties};
    // schema.properties[action.field] = {...state.schema.properties[action.field], grid : action.grid};
    return {
        ...state,
        schema,
        uiSchema
    }
};

const reorder =  (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const changeOrder = (state, action) => {
    const uiSchemaTemp = {...state.uiSchema};
    let uiSchemaTempOrder = [];

    if (action.end === "up" || action.end === "down") {
        const index = uiSchemaTemp["ui:order"].indexOf(action.start);

        if (action.end === "up") {
            uiSchemaTempOrder = reorder(state.uiSchema["ui:order"], index, index - 1);
        } else if (action.end === "down") {
            uiSchemaTempOrder = reorder(state.uiSchema["ui:order"], index, index + 1);
        }
    } else {
        uiSchemaTempOrder = reorder(state.uiSchema["ui:order"], action.start,action.end);
    }


    const uiSchema = {...uiSchemaTemp, "ui:order" : [...uiSchemaTempOrder]};
    return {
        ...state,
        uiSchema
    }
};

const formBuilder = (state = initialState, action) => {
    switch ( action.type )
    {
        case aC.ADD_FIELD: {return addField(state, action)}
        case aC.REMOVE_FIELD: {return removeField(state, action)}
        case aC.EDIT_FIELD: {return editField(state, action)}
        case aC.EDIT_FORM_DETAIL: {return editFormDetails(state, action)}
        case aC.CLEAR_FORM: {return clearForm(state)}
        case aC.CHANGE_GRID: {return changeGrid(state, action)}
        case aC.EDIT_FORM: {return editForm(state, action)}
        case aC.CHANGE_ORDER: {return changeOrder(state, action)}
        default:
        {
            return state;
        }
    }
};

export default formBuilder;