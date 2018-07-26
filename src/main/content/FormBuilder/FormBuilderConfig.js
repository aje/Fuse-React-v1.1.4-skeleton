import FormBuilder from './FormBuilder';
import AllForms from "./Forms/AllForms";
import {authRoles} from 'auth/auth';

export const FormBuilderConfig = {
    settings: {
        layout: {
            config: {
                navbar : {
                    display : true,
                    folded  : true,
                },
            }
        }
    },
   //auth    : authRoles.admin,//['admin']
    routes  : [
        {
            path     : '/form-builder/add-form',
            component: FormBuilder
        },
        {
            path     : '/form-builder/edit-form',
            component: FormBuilder
        },
        {
            path     : '/form-builder/forms',
            component: AllForms
        }
    ]
};
