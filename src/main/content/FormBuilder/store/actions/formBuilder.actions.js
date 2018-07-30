import * as aC from  "./actionTypes"

export const addField = (field) => {
    return {
        type   : aC.ADD_FIELD,
        field: field
    }
};

export const removeField = (field) => {
    return {
        type   : aC.REMOVE_FIELD,
        field: field
    }
};

export const editField = (field, data) => {
    return {
        type   : aC.EDIT_FIELD,
        field: field,
        data: data
    }
};

export const editFormDetails = (data) => {
    return {
        type   : aC.EDIT_FORM_DETAIL,
        data: data
    }
};

export const clearForm = () => {
    return {
        type   : aC.CLEAR_FORM,
    }
};

export const changeGrid = (field,grid) => {
    return {
        type   : aC.CHANGE_GRID,
        field: field,
        grid: grid
    }
};

export const editForm = (schema,uiSchema) => {
    return {
        type   : aC.EDIT_FORM,
        schema: schema,
        uiSchema: uiSchema,
    }
};

export const changeOrder = (start,end) => {
    return {
        type   : aC.CHANGE_ORDER,
        start: start,
        end: end,
    }
};