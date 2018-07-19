import FormBuilder from './FormBuilder';

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
    routes  : [
        {
            path     : '/form-builder',
            component: FormBuilder
        }
    ]
};
