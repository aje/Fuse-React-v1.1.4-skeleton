import * as aC from '../actions/actionTypes';

const initialState = {
    formTitle: "",
    formAction: "",
    formDescription: "",
    currentIndex: 0,
    schema : {
        // title: "Untitled form",
        // description: "Enter some description for your form here",
        "type": "object",
        "properties": {},
        "required": [],
    },
    uiSchema: {},
    currentItem: {}
};

const addField = (state, action) => {
    // create a temp for schema and uiSchema
    //console.log();
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
    console.log(action);
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

const formBuilder = (state = initialState, action) => {
    switch ( action.type )
    {
        case aC.ADD_FIELD: {return addField(state, action)}
        case aC.REMOVE_FIELD: {return removeField(state, action)}
        case aC.EDIT_FIELD: {return editField(state, action)}
        default:
        {
            return state;
        }
    }
};

export default formBuilder;