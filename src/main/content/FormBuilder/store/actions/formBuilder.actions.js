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