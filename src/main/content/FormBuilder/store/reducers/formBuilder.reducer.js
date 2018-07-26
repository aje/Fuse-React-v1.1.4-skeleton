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
    console.log(action.field);
    const schema = {...state.schema};
    schema.properties = {...state.schema.properties};

    const uiSchema = {...state.uiSchema};

    // create a random name
    const itemp = state.currentIndex + 1;

    const name = `field_${itemp}`;
    // t.;
    // add field to schema and ui to uiSchema
    schema.properties[name] = {...action.field.schema, title:name};
    uiSchema[name] = action.field.uiSchema;

    //const tUi = {};
    //console.log(schema);



    // this.state.uiSchema[_slug] = field.uiSchema;
    // this.state.uiSchema["ui:order"] = (state.uiSchema["ui:order"] || []).concat(_slug);

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
    // t.uiSchema["ui:order"] = state.uiSchema["ui:order"].filter(
    //     (field) => field !== name);
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
    //console.log(action);
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
        maximum: action.data.maximum
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
    const currentIndex= 0;
    return {
        ...state,
        schema,
        currentIndex
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
        default:
        {
            return state;
        }
    }
};

export default formBuilder;